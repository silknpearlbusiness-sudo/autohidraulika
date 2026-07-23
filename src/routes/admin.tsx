import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  BellOff,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

import { adminLogin, deleteLeadFn, listLeadsFn, updateLeadFn } from "@/lib/api/admin.functions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Hidraulika Service TEAM Kft." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const TOKEN_STORAGE_KEY = "admin_token";
const PIE_COLORS = ["#3b82f6", "#64748b", "#22c55e", "#f59e0b", "#94a3b8"];
const POLL_INTERVAL_MS = 20 * 1000;

type LeadStatus = "new" | "in_progress" | "done";

interface Lead {
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

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Új",
  in_progress: "Folyamatban",
  done: "Lezárva",
};

const STATUS_BADGE_CLASS: Record<LeadStatus, string> = {
  new: "border-transparent bg-slate-500/15 text-slate-300",
  in_progress: "border-transparent bg-amber-500/15 text-amber-400",
  done: "border-transparent bg-emerald-500/15 text-emerald-400",
};

const STATUS_DOT_CLASS: Record<LeadStatus, string> = {
  new: "bg-slate-400",
  in_progress: "bg-amber-500",
  done: "bg-emerald-500",
};

const NOTIF_MUTE_KEY = "admin_notif_muted";

function notifyNewLeads(newLeads: Lead[], muted: boolean) {
  if (muted) return;

  new Audio("/sounds/click.mp3").play().catch(() => {});

  for (const lead of newLeads) {
    toast(`Új megkeresés: ${lead.name}`, {
      description: [lead.phone, lead.partType].filter(Boolean).join(" · "),
    });
  }

  if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
    for (const lead of newLeads) {
      new Notification("Új megkeresés érkezett", {
        body: [lead.name, lead.phone].filter(Boolean).join(" — "),
        icon: "/favicon-48.png",
      });
    }
  }
}

function formatRelativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "most";
  if (minutes < 60) return `${minutes} perce`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} órája`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} napja`;
  const months = Math.floor(days / 30);
  return `${months} hónapja`;
}

function AdminPage() {
  // undefined = "haven't checked sessionStorage yet", null = "checked, no token"
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_STORAGE_KEY));
  }, []);

  if (token === undefined) return null; // avoid a login-form flash before sessionStorage is read

  return token ? (
    <AdminShell
      token={token}
      onLogout={() => {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
      }}
    />
  ) : (
    <LoginForm
      onSuccess={(t) => {
        sessionStorage.setItem(TOKEN_STORAGE_KEY, t);
        setToken(t);
      }}
    />
  );
}

function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await adminLogin({ data: { password } });
      if (result.ok) onSuccess(result.token);
      else setError(result.error);
    } catch {
      setError("Váratlan hiba történt. Kérjük, próbálja újra.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" className="h-8 w-auto mb-4" />
          <CardTitle className="text-lg font-semibold">Admin belépés</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={loading || !password}>
              {loading ? <Loader2 className="animate-spin" /> : "Belépés"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

type View = "dashboard" | "leads";

function AdminShell({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [view, setView] = useState<View>("dashboard");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission | "unsupported">("unsupported");
  const [notifMuted, setNotifMuted] = useState(false);
  const notifMutedRef = useRef(false);
  const seenIds = useRef<Set<string> | null>(null);

  function toggleNotifMuted() {
    setNotifMuted((prev) => {
      const next = !prev;
      notifMutedRef.current = next;
      localStorage.setItem(NOTIF_MUTE_KEY, next ? "1" : "0");
      return next;
    });
  }

  async function load(opts?: { silent?: boolean }) {
    if (!opts?.silent) setLoading(true);
    setError(null);
    try {
      const data = await listLeadsFn({ data: { token } });
      if (seenIds.current) {
        const newLeads = data.filter((l) => !seenIds.current!.has(l.id));
        if (newLeads.length > 0) notifyNewLeads(newLeads, notifMutedRef.current);
      }
      seenIds.current = new Set(data.map((l) => l.id));
      setLeads(data);
    } catch {
      setError("Munkamenet lejárt, jelentkezzen be újra.");
      onLogout();
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission);
    }
    const storedMute = localStorage.getItem(NOTIF_MUTE_KEY) === "1";
    setNotifMuted(storedMute);
    notifMutedRef.current = storedMute;
    load();
    const interval = setInterval(() => load({ silent: true }), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestNotifPermission() {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    setNotifPermission(await Notification.requestPermission());
  }

  async function handleDelete(id: string) {
    try {
      await deleteLeadFn({ data: { token, id } });
      setLeads((prev) => prev?.filter((l) => l.id !== id) ?? null);
    } catch {
      setError("Törlés sikertelen.");
    }
  }

  async function handleUpdate(id: string, patch: { notes?: string; status?: LeadStatus }) {
    await updateLeadFn({ data: { token, id, ...patch } });
    setLeads((prev) => prev?.map((l) => (l.id === id ? { ...l, ...patch } : l)) ?? null);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Toaster position="top-right" />
      <Sidebar view={view} onViewChange={setView} onLogout={onLogout} />

      <main className="flex-1 px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2.5">
                {view === "dashboard" ? "Áttekintés" : "Megkeresések"}
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                  title="Automatikusan frissül 20 másodpercenként"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Élő
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {view === "dashboard"
                  ? "A weboldalról beérkezett megkeresések áttekintése"
                  : "Összes beérkezett megkeresés kezelése"}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {notifPermission === "default" && (
                <Button variant="outline" size="sm" onClick={requestNotifPermission}>
                  <Bell size={14} />
                  Értesítések engedélyezése
                </Button>
              )}
              {notifPermission === "denied" && (
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BellOff size={13} />
                  Értesítések letiltva
                </span>
              )}
              {notifPermission === "granted" && (
                <Button variant="outline" size="sm" onClick={toggleNotifMuted}>
                  {notifMuted ? <BellOff size={14} /> : <Bell size={14} className="text-emerald-500" />}
                  <span className="hidden sm:inline">
                    {notifMuted ? "Értesítések némítva" : "Értesítések aktívak"}
                  </span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => load()} disabled={loading}>
                <RefreshCw className={loading ? "animate-spin" : ""} />
                Frissítés
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive mb-6">{error}</p>}

          {leads === null ? (
            <div className="flex justify-center py-24">
              <Loader2 className="animate-spin text-muted-foreground" />
            </div>
          ) : view === "dashboard" ? (
            <DashboardView leads={leads} onViewAll={() => setView("leads")} />
          ) : (
            <LeadsTable leads={leads} onDelete={handleDelete} onUpdate={handleUpdate} />
          )}
        </div>
      </main>
    </div>
  );
}

function Sidebar({
  view,
  onViewChange,
  onLogout,
}: {
  view: View;
  onViewChange: (v: View) => void;
  onLogout: () => void;
}) {
  const navItems: { key: View; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "dashboard", label: "Áttekintés", icon: LayoutDashboard },
    { key: "leads", label: "Megkeresések", icon: Inbox },
  ];

  return (
    <aside className="md:w-64 md:h-screen md:sticky md:top-0 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border bg-card px-4 py-5 md:px-5 md:py-6">
      <div>
        <div className="px-1 mb-8">
          <img src="/images/logo-dark.png" alt="Hidraulikajavítás.com" className="h-6 w-auto mb-2" />
          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground">
            ADMIN PANEL
          </p>
        </div>

        <nav className="flex md:flex-col gap-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onViewChange(key)}
              className={`flex items-center gap-2.5 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                view === key
                  ? "border-l-foreground/60 bg-white/5 text-foreground"
                  : "border-l-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex md:flex-col gap-1 pt-4">
        <Button variant="ghost" size="sm" className="justify-start" onClick={onLogout}>
          <LogOut size={15} />
          Kijelentkezés
        </Button>
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} />
          Vissza a weboldalra
        </a>
      </div>
    </aside>
  );
}

type StatTone = "neutral" | "info" | "warning" | "success";

const STAT_TONE_CLASS: Record<StatTone, string> = {
  neutral: "bg-muted text-foreground/70",
  info: "bg-blue-500/15 text-blue-400",
  warning: "bg-amber-500/15 text-amber-400",
  success: "bg-emerald-500/15 text-emerald-400",
};

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
  delta,
}: {
  label: string;
  value: string | number;
  icon: typeof Inbox;
  tone?: StatTone;
  delta?: { value: number; goodDirection: "up" | "down" };
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${STAT_TONE_CLASS[tone]}`}>
            <Icon size={16} />
          </div>
          {delta && delta.value !== 0 && (
            <span
              className={`flex items-center gap-0.5 text-xs font-semibold ${
                (delta.value > 0) === (delta.goodDirection === "up") ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {delta.value > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {Math.abs(delta.value)}%
            </span>
          )}
        </div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}

const trendConfig = {
  count: { label: "Megkeresések", color: "#3b82f6" },
} satisfies ChartConfig;

function buildTrendData(leads: Lead[]) {
  const days: { label: string; count: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = leads.filter((l) => l.createdAt.slice(0, 10) === key).length;
    days.push({ label: d.toLocaleDateString("hu-HU", { month: "short", day: "numeric" }), count });
  }
  return days;
}

function buildPartTypeData(leads: Lead[]) {
  const counts = new Map<string, number>();
  for (const l of leads) {
    const key = l.partType?.trim() || "Egyéb";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 5);
}

function buildStatusData(leads: Lead[]) {
  const counts: Record<LeadStatus, number> = { new: 0, in_progress: 0, done: 0 };
  for (const l of leads) counts[l.status ?? "new"]++;
  return (Object.keys(STATUS_LABELS) as LeadStatus[]).map((status) => ({
    status,
    count: counts[status],
  }));
}

function DashboardView({ leads, onViewAll }: { leads: Lead[]; onViewAll: () => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const fourteenDaysAgo = new Date(today);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);

  const openCount = leads.filter((l) => (l.status ?? "new") !== "done").length;
  const doneCount = leads.filter((l) => l.status === "done").length;
  const thisWeekCount = leads.filter((l) => new Date(l.createdAt) >= sevenDaysAgo).length;
  const prevWeekCount = leads.filter((l) => {
    const d = new Date(l.createdAt);
    return d >= fourteenDaysAgo && d < sevenDaysAgo;
  }).length;

  const stats = {
    total: leads.length,
    today: leads.filter((l) => new Date(l.createdAt) >= today).length,
    week: thisWeekCount,
    weekDelta: prevWeekCount > 0 ? Math.round(((thisWeekCount - prevWeekCount) / prevWeekCount) * 100) : 0,
    open: openCount,
    doneRate: leads.length > 0 ? Math.round((doneCount / leads.length) * 100) : 0,
  };

  const trendData = useMemo(() => buildTrendData(leads), [leads]);
  const partTypeData = useMemo(() => buildPartTypeData(leads), [leads]);
  const statusData = useMemo(() => buildStatusData(leads), [leads]);
  const recent = leads.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Összes megkeresés" value={stats.total} icon={Inbox} tone="info" />
        <StatCard label="Mai megkeresések" value={stats.today} icon={LayoutDashboard} />
        <StatCard
          label="Elmúlt 7 napban"
          value={stats.week}
          icon={RefreshCw}
          delta={{ value: stats.weekDelta, goodDirection: "up" }}
        />
        <StatCard label="Nyitott ügyek" value={stats.open} icon={AlertCircle} tone="warning" />
        <StatCard label="Lezárási arány" value={`${stats.doneRate}%`} icon={CheckCircle2} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Megkeresések (14 nap)</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            {leads.length === 0 ? (
              <p className="text-sm text-muted-foreground px-6 py-10">Nincs elegendő adat a megjelenítéshez.</p>
            ) : (
              <ChartContainer config={trendConfig} className="aspect-auto h-56 w-full">
                <AreaChart data={trendData} margin={{ left: 4, right: 12, top: 8 }}>
                  <defs>
                    <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    interval={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="count"
                    type="monotone"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#leadsFill)"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Alkatrész típusok</CardTitle>
          </CardHeader>
          <CardContent>
            {partTypeData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10">Nincs elegendő adat a megjelenítéshez.</p>
            ) : (
              <div className="flex items-center gap-4">
                <ChartContainer config={{}} className="aspect-square h-36 w-36 shrink-0">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie data={partTypeData} dataKey="value" nameKey="name" innerRadius={38} outerRadius={58} strokeWidth={2}>
                      {partTypeData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <ul className="flex flex-col gap-2 min-w-0">
                  {partTypeData.map((item, i) => (
                    <li key={item.name} className="flex items-center gap-2 text-xs min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      <span className="font-semibold shrink-0">{item.value}</span>
                      <span className="text-muted-foreground truncate">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Állapot szerint</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {leads.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10">Nincs elegendő adat a megjelenítéshez.</p>
            ) : (
              statusData.map(({ status, count }) => {
                const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                return (
                  <div key={status} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className={`w-2 h-2 rounded-full ${STATUS_DOT_CLASS[status]}`} />
                        {STATUS_LABELS[status]}
                      </span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${STATUS_DOT_CLASS[status]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Legutóbbi megkeresések</CardTitle>
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              Összes
              <ChevronRight size={14} />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6">Még nem érkezett megkeresés.</p>
            ) : (
              recent.map((lead) => (
                <a
                  key={lead.id}
                  href={`tel:${lead.phone}`}
                  className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 -mx-3 hover:bg-white/5 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.partType || "Alkatrész nincs megadva"} · {formatRelativeTime(lead.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-foreground shrink-0">
                    {lead.phone}
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </div>
                </a>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LeadsTable({
  leads,
  onDelete,
  onUpdate,
}: {
  leads: Lead[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, patch: { notes?: string; status?: LeadStatus }) => Promise<void>;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  }

  if (leads.length === 0) {
    return <p className="text-muted-foreground text-sm">Még nem érkezett megkeresés.</p>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dátum</TableHead>
            <TableHead>Státusz</TableHead>
            <TableHead>Név</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Alkatrész</TableHead>
            <TableHead>Leírás</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const status = lead.status ?? "new";
            return (
              <TableRow
                key={lead.id}
                className="cursor-pointer"
                onClick={() => setSelected(lead)}
              >
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleString("hu-HU", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell>
                  <Badge className={STATUS_BADGE_CLASS[status]}>{STATUS_LABELS[status]}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {lead.name}
                  {lead.notes && (
                    <span
                      className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle"
                      title="Van hozzáfűzött megjegyzés"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={`tel:${lead.phone}`}
                    className="underline-offset-2 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {lead.phone}
                  </a>
                </TableCell>
                <TableCell>
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="underline-offset-2 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {lead.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{lead.partType || "—"}</TableCell>
                <TableCell className="max-w-xs truncate" title={lead.description}>
                  {lead.description || "—"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={deletingId === lead.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(lead.id);
                    }}
                  >
                    {deletingId === lead.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <LeadDetailDialog
        lead={selected}
        onClose={() => setSelected(null)}
        onSave={async (patch) => {
          if (!selected) return;
          await onUpdate(selected.id, patch);
          setSelected(null);
        }}
        onDelete={async () => {
          if (!selected) return;
          await handleDelete(selected.id);
          setSelected(null);
        }}
      />
    </Card>
  );
}

function LeadDetailDialog({
  lead,
  onClose,
  onSave,
  onDelete,
}: {
  lead: Lead | null;
  onClose: () => void;
  onSave: (patch: { notes: string; status: LeadStatus }) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes ?? "");
      setStatus(lead.status ?? "new");
    }
  }, [lead]);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave({ notes, status });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteClick() {
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={!!lead} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg lg:max-w-2xl">
        {lead && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2.5">
                <DialogTitle>{lead.name}</DialogTitle>
                <Badge className={STATUS_BADGE_CLASS[status]}>{STATUS_LABELS[status]}</Badge>
              </div>
            </DialogHeader>

            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-border bg-muted/30 divide-y divide-border">
                  <div className="flex items-center gap-2.5 px-3 py-2">
                    <Phone size={14} className="text-muted-foreground shrink-0" />
                    <a href={`tel:${lead.phone}`} className="font-medium underline-offset-2 hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                  {lead.email && (
                    <div className="flex items-center gap-2.5 px-3 py-2">
                      <Mail size={14} className="text-muted-foreground shrink-0" />
                      <a href={`mailto:${lead.email}`} className="underline-offset-2 hover:underline">
                        {lead.email}
                      </a>
                    </div>
                  )}
                  {lead.partType && (
                    <div className="flex items-center gap-2.5 px-3 py-2">
                      <Wrench size={14} className="text-muted-foreground shrink-0" />
                      {lead.partType}
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 px-3 py-2 text-muted-foreground">
                    <Calendar size={14} className="shrink-0" />
                    <span>
                      {new Date(lead.createdAt).toLocaleString("hu-HU", { dateStyle: "medium", timeStyle: "short" })}
                      <span className="text-xs"> · {formatRelativeTime(lead.createdAt)}</span>
                    </span>
                  </div>
                </div>

                {lead.description && (
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                      <MessageSquare size={12} />
                      Leírás
                    </label>
                    <p className="whitespace-pre-wrap rounded-lg border border-border bg-muted/20 px-3 py-2.5">
                      {lead.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Státusz
                  </label>
                  <Select value={status} onValueChange={(v) => setStatus(v as LeadStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Megjegyzés
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Pl.: visszahívva, ajánlat kiküldve, alkatrész rendelve…"
                    rows={8}
                    className="flex-1 resize-none"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
                disabled={deleting || saving}
                onClick={handleDeleteClick}
              >
                {deleting ? <Loader2 className="animate-spin" /> : <Trash2 size={15} />}
                Törlés
              </Button>
              <Button onClick={handleSave} disabled={saving || deleting}>
                {saving ? <Loader2 className="animate-spin" /> : "Mentés"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
