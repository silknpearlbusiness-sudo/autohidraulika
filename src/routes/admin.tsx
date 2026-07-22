import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Phone,
  RefreshCw,
  Trash2,
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

import { adminLogin, deleteLeadFn, listLeadsFn } from "@/lib/api/admin.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
const PIE_COLORS = ["#FDB927", "#10b981", "#f0c85c", "#3fae82", "#8a9a90"];

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  partType?: string;
  description?: string;
  createdAt: string;
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
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 bg-primary/10 border border-primary/25">
            <Wrench size={22} className="text-primary" />
          </div>
          <CardTitle>Admin belépés</CardTitle>
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

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await listLeadsFn({ data: { token } });
      setLeads(data);
    } catch {
      setError("Munkamenet lejárt, jelentkezzen be újra.");
      onLogout();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: string) {
    try {
      await deleteLeadFn({ data: { token, id } });
      setLeads((prev) => prev?.filter((l) => l.id !== id) ?? null);
    } catch {
      setError("Törlés sikertelen.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar view={view} onViewChange={setView} onLogout={onLogout} />

      <main className="flex-1 px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                {view === "dashboard" ? "Áttekintés" : "Megkeresések"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {view === "dashboard"
                  ? "A weboldalról beérkezett megkeresések áttekintése"
                  : "Összes beérkezett megkeresés kezelése"}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={loading ? "animate-spin" : ""} />
              Frissítés
            </Button>
          </div>

          {error && <p className="text-sm text-destructive mb-6">{error}</p>}

          {leads === null ? (
            <div className="flex justify-center py-24">
              <Loader2 className="animate-spin text-muted-foreground" />
            </div>
          ) : view === "dashboard" ? (
            <DashboardView leads={leads} onViewAll={() => setView("leads")} />
          ) : (
            <LeadsTable leads={leads} onDelete={handleDelete} />
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
        <div className="flex items-center gap-3 px-1 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/25 shrink-0">
            <Wrench size={18} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-black text-sm tracking-tight truncate">HIDRAULIKA SERVICE</p>
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground flex items-center gap-1.5">
              ADMIN PANEL
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            </p>
          </div>
        </div>

        <nav className="flex md:flex-col gap-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onViewChange(key)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                view === key
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
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

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: typeof Inbox }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 text-primary mb-4">
          <Icon size={16} />
        </div>
        <p className="text-2xl font-black tracking-tight">{value}</p>
        <p className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}

const trendConfig = {
  count: { label: "Megkeresések", color: "#FDB927" },
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

function DashboardView({ leads, onViewAll }: { leads: Lead[]; onViewAll: () => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const stats = {
    total: leads.length,
    today: leads.filter((l) => new Date(l.createdAt) >= today).length,
    week: leads.filter((l) => new Date(l.createdAt) >= sevenDaysAgo).length,
    withEmail: leads.filter((l) => l.email).length,
  };

  const trendData = useMemo(() => buildTrendData(leads), [leads]);
  const partTypeData = useMemo(() => buildPartTypeData(leads), [leads]);
  const recent = leads.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Összes megkeresés" value={stats.total} icon={Inbox} />
        <StatCard label="Mai megkeresések" value={stats.today} icon={LayoutDashboard} />
        <StatCard label="Elmúlt 7 napban" value={stats.week} icon={RefreshCw} />
        <StatCard label="E-mail címmel" value={stats.withEmail} icon={Phone} />
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
                      <stop offset="5%" stopColor="#FDB927" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#FDB927" stopOpacity={0} />
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
                    stroke="#FDB927"
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

      <Card>
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
                    {lead.partType || "Alkatrész nincs megadva"} ·{" "}
                    {new Date(lead.createdAt).toLocaleDateString("hu-HU", { dateStyle: "medium" })}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary shrink-0">
                  {lead.phone}
                  <ChevronRight size={14} />
                </div>
              </a>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LeadsTable({ leads, onDelete }: { leads: Lead[]; onDelete: (id: string) => Promise<void> }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
            <TableHead>Név</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Alkatrész</TableHead>
            <TableHead>Leírás</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {new Date(lead.createdAt).toLocaleString("hu-HU", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </TableCell>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>
                <a href={`tel:${lead.phone}`} className="underline-offset-2 hover:underline">
                  {lead.phone}
                </a>
              </TableCell>
              <TableCell>
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="underline-offset-2 hover:underline">
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
                  onClick={() => handleDelete(lead.id)}
                >
                  {deletingId === lead.id ? <Loader2 className="animate-spin" /> : <Trash2 />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
