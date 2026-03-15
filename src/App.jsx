import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Home,
  Server,
  Shield,
  Palette,
  Users,
  LogIn,
  Bell,
  Settings,
  ChevronRight,
  Activity,
  Ban,
  MessageSquareWarning,
  Sword,
  Menu,
  X,
} from "lucide-react";

const initialServers = [
  { id: 1, name: "7Mau Mirage #1", players: 18, max: 24, map: "de_mirage", status: "online", ping: 23, region: "SG" },
  { id: 2, name: "7Mau Dust2 #2", players: 11, max: 24, map: "de_dust2", status: "online", ping: 31, region: "VN" },
  { id: 3, name: "7Mau Retake #3", players: 22, max: 24, map: "de_inferno", status: "busy", ping: 27, region: "JP" },
  { id: 4, name: "7Mau Public #4", players: 0, max: 24, map: "de_ancient", status: "offline", ping: 0, region: "VN" },
  { id: 5, name: "7Mau DM #5", players: 16, max: 20, map: "de_nuke", status: "online", ping: 19, region: "SG" },
  { id: 6, name: "7Mau Arena #6", players: 8, max: 16, map: "aim_map", status: "maintenance", ping: 0, region: "TH" },
];

const initialBans = [
  { id: 101, player: "toxicCat", reason: "Mic spam", staff: "mod_lyra", expire: "2026-03-16 14:00" },
  { id: 102, player: "ragequit77", reason: "Griefing", staff: "admin_zed", expire: "2026-03-18 09:30" },
  { id: 103, player: "xRecoil", reason: "Wall abuse suspicion", staff: "mod_sky", expire: "Permanent" },
];

const inventory = [
  { id: 1, item: "AK-47 | Slate", type: "Rifle", rarity: "Classified" },
  { id: 2, item: "M4A1-S | Printstream", type: "Rifle", rarity: "Covert" },
  { id: 3, item: "Karambit | Doppler", type: "Knife", rarity: "Covert" },
  { id: 4, item: "Sport Gloves | Vice", type: "Gloves", rarity: "Extraordinary" },
  { id: 5, item: "AWP | Asiimov", type: "Sniper", rarity: "Covert" },
  { id: 6, item: "Desert Eagle | Blaze", type: "Pistol", rarity: "Restricted" },
];

const initialTickets = [
  { id: "T-2411", title: "Lost VIP perks after reconnect", user: "minty", status: "Open" },
  { id: "T-2412", title: "Skin not showing in loadout", user: "rei", status: "Pending" },
  { id: "T-2413", title: "Ban appeal", user: "hexa", status: "Resolved" },
];

const navItems = [
  { key: "home", label: "Home", icon: Home },
  { key: "servers", label: "Servers", icon: Server },
  { key: "dashboard", label: "Dashboard", icon: Activity },
  { key: "zmodels", label: "zModels", icon: Palette },
  { key: "sourcebans", label: "SourceBans", icon: Shield },
  { key: "support", label: "Support", icon: MessageSquareWarning },
  { key: "profile", label: "Profile", icon: Users },
  { key: "login", label: "Login", icon: LogIn },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return (
    <div className={cn("rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20", className)}>
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <div className="text-xs uppercase tracking-[0.35em] text-cyan-400/80">{eyebrow}</div>}
        <h2 className="mt-1 text-2xl font-semibold md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-neutral-400 md:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-neutral-400">{label}</div>
          <div className="mt-3 text-3xl font-semibold">{value}</div>
          <div className="mt-2 text-sm text-neutral-500">{hint}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <Icon className="h-5 w-5 text-cyan-300" />
        </div>
      </div>
    </Card>
  );
}

function StatusPill({ status }) {
  const map = {
    online: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
    busy: "bg-amber-500/15 text-amber-300 ring-amber-400/20",
    offline: "bg-rose-500/15 text-rose-300 ring-rose-400/20",
    maintenance: "bg-violet-500/15 text-violet-300 ring-violet-400/20",
    Open: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
    Pending: "bg-amber-500/15 text-amber-300 ring-amber-400/20",
    Resolved: "bg-cyan-500/15 text-cyan-300 ring-cyan-400/20",
  };
  return <span className={cn("rounded-full px-2.5 py-1 text-xs ring-1", map[status] || "bg-white/10 text-white ring-white/10")}>{status}</span>;
}

function HomePage({ setPage }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-400">zSystems Legacy</div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              Game server control panel full vibe clone, usable and polished.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-neutral-400 md:text-base">
              Multi-page mock web app for server browsing, support tickets, bans, player profiles, and skin loadout management.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setPage("dashboard")} className="rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-neutral-950 hover:opacity-90">Open Dashboard</button>
              <button onClick={() => setPage("servers")} className="rounded-2xl border border-white/10 px-5 py-3 font-medium hover:bg-white/5">Browse Servers</button>
            </div>
          </div>
          <Card className="bg-gradient-to-br from-cyan-500/10 via-white/[0.03] to-transparent p-5">
            <div className="text-sm text-neutral-400">Quick system snapshot</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Players Online", "2,481"],
                ["Servers", "16"],
                ["Open Tickets", "28"],
                ["Skins Saved", "14.2k"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-neutral-500">{label}</div>
                  <div className="mt-2 text-2xl font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Running Servers" value="16" hint="2 under maintenance" icon={Server} />
        <StatCard label="Live Players" value="75" hint="Peak hour +12%" icon={Users} />
        <StatCard label="Moderation Events" value="34" hint="Today only" icon={Ban} />
        <StatCard label="Support Queue" value="28" hint="Average reply 6m" icon={Bell} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5">
          <SectionTitle eyebrow="Featured" title="Core modules" subtitle="The whole app is split into practical admin sections." />
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              ["Server Browser", "Live regions, map, players, connect links"],
              ["SourceBans", "Ban list, reasons, expiry, mod names"],
              ["zModels", "Weapons, knives, gloves, saved loadouts"],
              ["Support Desk", "Ticket board for player issues and appeals"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-medium">{title}</div>
                <div className="mt-2 text-sm text-neutral-400">{desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle eyebrow="Identity" title="Connect platforms" subtitle="Common buttons found in gaming dashboards." />
          <div className="mt-5 space-y-3">
            <button className="w-full rounded-2xl bg-[#171a21] px-4 py-4 text-left hover:opacity-90">
              <div className="font-medium">Connect Steam</div>
              <div className="text-sm text-neutral-400">Sync profile, perks, playtime and cosmetics</div>
            </button>
            <button className="w-full rounded-2xl bg-[#5865F2] px-4 py-4 text-left text-white hover:opacity-90">
              <div className="font-medium">Connect Discord</div>
              <div className="text-sm text-white/80">Role sync, ticket lookup, community status</div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ServersPage({ servers, serverFilter, setServerFilter }) {
  const filtered = useMemo(() => {
    const q = serverFilter.toLowerCase();
    return servers.filter((s) => [s.name, s.map, s.region, s.status].join(" ").toLowerCase().includes(q));
  }, [servers, serverFilter]);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Server Browser"
        title="Live community servers"
        subtitle="Filter by name, map, region, or status."
        action={
          <input
            value={serverFilter}
            onChange={(e) => setServerFilter(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 md:w-80"
            placeholder="Search de_mirage, SG, online..."
          />
        }
      />
      <Card className="overflow-hidden">
        <div className="grid grid-cols-7 gap-2 bg-white/5 px-4 py-3 text-sm text-neutral-400">
          <div className="col-span-2">Server</div>
          <div>Status</div>
          <div>Players</div>
          <div>Map</div>
          <div>Region</div>
          <div>Ping</div>
        </div>
        {filtered.map((server) => (
          <div key={server.id} className="grid grid-cols-7 gap-2 border-t border-white/10 px-4 py-4 text-sm hover:bg-white/[0.03]">
            <div className="col-span-2">
              <div className="font-medium text-white">{server.name}</div>
              <div className="text-neutral-500">connect://{server.name.toLowerCase().replace(/\s+/g, "-")}</div>
            </div>
            <div><StatusPill status={server.status} /></div>
            <div>{server.players}/{server.max}</div>
            <div>{server.map}</div>
            <div>{server.region}</div>
            <div>{server.ping || "-"}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function DashboardPage({ servers, tickets, bans }) {
  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="Control Center" title="Dashboard overview" subtitle="Everything important in one place." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Online Servers" value={String(servers.filter((s) => s.status === "online").length)} hint="Healthy network" icon={Server} />
        <StatCard label="Busy Lobbies" value={String(servers.filter((s) => s.status === "busy").length)} hint="Peak activity" icon={Sword} />
        <StatCard label="Active Tickets" value={String(tickets.filter((t) => t.status !== "Resolved").length)} hint="Need review" icon={MessageSquareWarning} />
        <StatCard label="Current Bans" value={String(bans.length)} hint="Recent moderation" icon={Shield} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Recent server activity</div>
              <div className="text-sm text-neutral-400">Mock timeline for dashboard realism.</div>
            </div>
            <button className="rounded-2xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5">Refresh</button>
          </div>
          <div className="mt-5 space-y-3">
            {[
              "Mirage #1 reached 18/24 players",
              "Retake #3 changed map to de_inferno",
              "DM #5 latency normalized under 20ms",
              "Arena #6 moved into maintenance mode",
            ].map((item, i) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                <div>
                  <div className="font-medium">{item}</div>
                  <div className="mt-1 text-sm text-neutral-500">{6 + i * 5} minutes ago</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-lg font-semibold">Quick actions</div>
          <div className="mt-2 text-sm text-neutral-400">Admin-style shortcuts.</div>
          <div className="mt-5 grid gap-3">
            {[
              "Add maintenance notice",
              "Open ban appeal queue",
              "Export player list",
              "Generate status report",
            ].map((action) => (
              <button key={action} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left hover:bg-white/[0.05]">
                <span>{action}</span>
                <ChevronRight className="h-4 w-4 text-neutral-500" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ZModelsPage({ inventory, selectedLoadout, setSelectedLoadout }) {
  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="zModels" title="Skin changer & loadouts" subtitle="Cosmetic inventory preview with a saved loadout selector." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card className="p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {inventory.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.type}</div>
                <div className="mt-2 font-medium">{item.item}</div>
                <div className="mt-3 inline-flex rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300 ring-1 ring-cyan-400/20">{item.rarity}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-lg font-semibold">Saved loadout</div>
          <div className="mt-2 text-sm text-neutral-400">Choose a preset look for your account.</div>
          <div className="mt-5 grid gap-3">
            {[
              "Competitive Neon",
              "Minimal Blackout",
              "Vice Collection",
              "Budget Flex",
            ].map((name) => (
              <button
                key={name}
                onClick={() => setSelectedLoadout(name)}
                className={cn(
                  "rounded-2xl border px-4 py-4 text-left transition",
                  selectedLoadout === name ? "border-cyan-400/30 bg-cyan-500/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                )}
              >
                <div className="font-medium">{name}</div>
                <div className="mt-1 text-sm text-neutral-400">Preset cosmetics, gloves, knife and agents</div>
              </button>
            ))}
          </div>
          <button className="mt-5 w-full rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-neutral-950 hover:opacity-90">Apply loadout</button>
        </Card>
      </div>
    </div>
  );
}

function SourceBansPage({ bans }) {
  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="Moderation" title="SourceBans panel" subtitle="Compact list of active punishments." />
      <Card className="overflow-hidden">
        <div className="grid grid-cols-4 gap-2 bg-white/5 px-4 py-3 text-sm text-neutral-400">
          <div>Player</div>
          <div>Reason</div>
          <div>Staff</div>
          <div>Expires</div>
        </div>
        {bans.map((ban) => (
          <div key={ban.id} className="grid grid-cols-4 gap-2 border-t border-white/10 px-4 py-4 text-sm hover:bg-white/[0.03]">
            <div className="font-medium">{ban.player}</div>
            <div>{ban.reason}</div>
            <div className="text-neutral-400">{ban.staff}</div>
            <div>{ban.expire}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function SupportPage({ tickets, setTickets }) {
  const addTicket = () => {
    const next = {
      id: `T-${2414 + tickets.length}`,
      title: "New support request",
      user: "guest_user",
      status: "Open",
    };
    setTickets([next, ...tickets]);
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Support Desk"
        title="Tickets & player issues"
        subtitle="Useful for admin and community helper flows."
        action={<button onClick={addTicket} className="rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-neutral-950">New Ticket</button>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-neutral-500">{ticket.id}</div>
                <div className="mt-2 font-medium">{ticket.title}</div>
              </div>
              <StatusPill status={ticket.status} />
            </div>
            <div className="mt-4 text-sm text-neutral-400">Opened by {ticket.user}</div>
            <button className="mt-4 rounded-2xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">View details</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProfilePage({ selectedLoadout }) {
  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="User Profile" title="Player account summary" subtitle="Simple profile layout with linked platforms and cosmetic preset." />
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/15 text-2xl font-semibold text-cyan-300">H</div>
            <div>
              <div className="text-xl font-semibold">hiu</div>
              <div className="text-sm text-neutral-400">hvqy225 • Premium Member</div>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-neutral-400">
            <div>Steam: linked</div>
            <div>Discord: linked</div>
            <div>Role: Community QA / Admin demo</div>
            <div>Selected loadout: {selectedLoadout}</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-lg font-semibold">Recent activity</div>
          <div className="mt-4 space-y-3">
            {[
              "Joined Mirage #1",
              "Applied Vice Collection loadout",
              "Opened ticket about VIP sync",
              "Reviewed support status",
            ].map((item, i) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-medium">{item}</div>
                <div className="mt-1 text-sm text-neutral-500">{i + 1} hour ago</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Card className="p-6 md:p-8">
        <div className="text-xs uppercase tracking-[0.35em] text-cyan-400">Authentication</div>
        <h2 className="mt-2 text-3xl font-semibold">Sign in to zSystems</h2>
        <p className="mt-2 text-sm text-neutral-400">Mock login page for the completed demo web.</p>
        <div className="mt-6 space-y-3">
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-neutral-500" placeholder="Email or username" />
          <input type="password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-neutral-500" placeholder="Password" />
          <button className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-neutral-950">Sign in</button>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <button className="rounded-2xl bg-[#171a21] px-4 py-3 hover:opacity-90">Login with Steam</button>
          <button className="rounded-2xl bg-[#5865F2] px-4 py-3 hover:opacity-90">Login with Discord</button>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [serverFilter, setServerFilter] = useState("");
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedLoadout, setSelectedLoadout] = useState("Vice Collection");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalPlayers = initialServers.reduce((sum, s) => sum + s.players, 0);

  const renderPage = () => {
    switch (page) {
      case "servers":
        return <ServersPage servers={initialServers} serverFilter={serverFilter} setServerFilter={setServerFilter} />;
      case "dashboard":
        return <DashboardPage servers={initialServers} tickets={tickets} bans={initialBans} />;
      case "zmodels":
        return <ZModelsPage inventory={inventory} selectedLoadout={selectedLoadout} setSelectedLoadout={setSelectedLoadout} />;
      case "sourcebans":
        return <SourceBansPage bans={initialBans} />;
      case "support":
        return <SupportPage tickets={tickets} setTickets={setTickets} />;
      case "profile":
        return <ProfilePage selectedLoadout={selectedLoadout} />;
      case "login":
        return <LoginPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="flex min-h-screen">
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : 0 }}
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-neutral-900/90 backdrop-blur-xl transition-transform md:static md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-cyan-400">zSystems</div>
              <div className="mt-2 text-2xl font-semibold">Legacy Panel</div>
              <div className="mt-1 text-sm text-neutral-400">Complete demo web app</div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="rounded-xl border border-white/10 p-2 md:hidden"><X className="h-4 w-4" /></button>
          </div>

          <div className="px-4 py-5">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-4 ring-1 ring-white/10">
              <div className="text-sm text-neutral-300">Signed in as</div>
              <div className="mt-1 font-semibold">hvqy225</div>
              <div className="mt-3 text-sm text-neutral-400">Live players across visible servers: {totalPlayers}</div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 px-4 pb-6">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setPage(key);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full rounded-2xl px-4 py-3 text-left transition",
                  page === key ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30" : "text-neutral-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-xs text-neutral-500">Open {label.toLowerCase()} module</div>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </motion.aside>

        <main className="flex-1">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 px-5 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="rounded-2xl border border-white/10 p-2 md:hidden"><Menu className="h-5 w-5" /></button>
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-neutral-500">Game Control Center</div>
                  <h1 className="mt-1 text-2xl font-semibold md:text-3xl">Welcome back, hiu ✨</h1>
                </div>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input className="w-72 rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 outline-none placeholder:text-neutral-500" placeholder="Search modules, users, maps..." />
                </div>
                <button className="rounded-2xl border border-white/10 p-2.5 hover:bg-white/5"><Bell className="h-4 w-4" /></button>
                <button className="rounded-2xl border border-white/10 p-2.5 hover:bg-white/5"><Settings className="h-4 w-4" /></button>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 md:px-8">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}