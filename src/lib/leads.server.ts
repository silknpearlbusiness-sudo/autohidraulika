import process from "node:process";
import { randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";

export type LeadStatus = "new" | "in_progress" | "done";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  partType?: string;
  description?: string;
  createdAt: string;
  status?: LeadStatus;
  notes?: string;
}

const LEADS_KEY = "leads";

// Dev-only fallback so `/admin` has something to show when KV isn't configured
// locally. Never used in production — there KV_REST_API_URL is always set.
let devLeads: Lead[] = [];

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function appendLead(payload: Omit<Lead, "id" | "createdAt">): Promise<void> {
  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload,
  };

  const redis = getRedis();
  if (!redis) {
    console.warn("[leads] Missing KV_REST_API_URL/KV_REST_API_TOKEN — using in-memory dev fallback.");
    devLeads.unshift(lead);
    return;
  }
  const leads = await readLeads();
  leads.unshift(lead);
  await redis.set(LEADS_KEY, leads);
}

export async function listLeads(): Promise<Lead[]> {
  return readLeads();
}

export async function deleteLead(id: string): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    devLeads = devLeads.filter((l) => l.id !== id);
    return;
  }
  const leads = await readLeads();
  await redis.set(LEADS_KEY, leads.filter((l) => l.id !== id));
}

export async function updateLead(
  id: string,
  patch: { notes?: string; status?: LeadStatus },
): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    devLeads = devLeads.map((l) => (l.id === id ? { ...l, ...patch } : l));
    return;
  }
  const leads = await readLeads();
  const updated = leads.map((l) => (l.id === id ? { ...l, ...patch } : l));
  await redis.set(LEADS_KEY, updated);
}

async function readLeads(): Promise<Lead[]> {
  const redis = getRedis();
  if (!redis) return devLeads;
  const data = await redis.get<Lead[]>(LEADS_KEY);
  return data ?? [];
}
