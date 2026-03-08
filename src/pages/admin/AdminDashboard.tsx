import { motion } from "framer-motion";
import {
  Users, Eye, FileText, MessageSquare, HelpCircle, Clock,
  ArrowUpRight, Loader2, AlertCircle, CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminStats } from "@/hooks/use-admin";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const ERA_COLORS = [
  "hsl(36, 80%, 50%)",
  "hsl(150, 30%, 35%)",
  "hsl(15, 60%, 45%)",
  "hsl(25, 50%, 50%)",
  "hsl(0, 65%, 48%)",
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AdminDashboard() {
  const { data, isLoading, isError } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-body">Memuat statistik...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <AlertCircle className="w-10 h-10 text-destructive" />
        <p className="text-muted-foreground font-body">Gagal memuat data. Pastikan API berjalan.</p>
      </div>
    );
  }

  const stats = data.stats ?? {};
  const topArticles: any[] = data.topArticles ?? [];
  const articlesPerEra: any[] = data.articlesPerEra ?? [];
  const recentComments: any[] = data.recentComments ?? [];

  const statCards = [
    { label: "Total Tampilan", value: (stats.totalViews ?? 0).toLocaleString(), icon: Eye, color: "text-primary" },
    { label: "Total Artikel", value: (stats.totalArticles ?? 0).toString(), icon: FileText, color: "text-secondary" },
    { label: "Pengguna Terdaftar", value: (stats.totalUsers ?? 0).toString(), icon: Users, color: "text-accent" },
    { label: "Total Komentar", value: (stats.totalComments ?? 0).toString(), icon: MessageSquare, color: "text-primary" },
    { label: "Kuis Dikerjakan", value: (stats.totalQuizAttempts ?? 0).toString(), icon: HelpCircle, color: "text-secondary" },
    { label: "Menunggu Moderasi", value: (stats.pendingComments ?? 0).toString(), icon: Clock, color: "text-destructive" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Title */}
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Data real-time dari database SejarahKita</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart — views per era */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Tampilan per Era (dari database)</CardTitle>
            </CardHeader>
            <CardContent>
              {articlesPerEra.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  Belum ada data tampilan
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={articlesPerEra} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(35,20%,88%)" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        stroke="hsl(25,10%,50%)"
                        tickFormatter={(v: string) => v.split(" ").pop() ?? v}
                      />
                      <YAxis tick={{ fontSize: 11 }} stroke="hsl(25,10%,50%)" />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid hsl(35,20%,85%)" }}
                        formatter={(v: number, name: string) => [
                          v.toLocaleString(),
                          name === "views" ? "Tampilan" : "Artikel",
                        ]}
                      />
                      <Bar dataKey="views" name="views" radius={[4, 4, 0, 0]} barSize={32}>
                        {articlesPerEra.map((_: any, i: number) => (
                          <Cell key={i} fill={ERA_COLORS[i % ERA_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie chart — article count per era */}
        <motion.div variants={item}>
          <Card className="border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Distribusi Artikel per Era</CardTitle>
            </CardHeader>
            <CardContent>
              {articlesPerEra.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                  Belum ada data
                </div>
              ) : (
                <>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={articlesPerEra}
                          dataKey="articles"
                          nameKey="name"
                          cx="50%" cy="50%"
                          innerRadius={38} outerRadius={64}
                          paddingAngle={4}
                        >
                          {articlesPerEra.map((_: any, i: number) => (
                            <Cell key={i} fill={ERA_COLORS[i % ERA_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v: number) => [`${v} artikel`]}
                          contentStyle={{ borderRadius: 8, fontSize: 12 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {articlesPerEra.map((e: any, i: number) => (
                      <div key={e.slug ?? i} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ERA_COLORS[i % ERA_COLORS.length] }} />
                        {(e.name as string).split(" ").pop()} ({e.articles})
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top articles */}
        <motion.div variants={item}>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Artikel Terpopuler</CardTitle>
            </CardHeader>
            <CardContent>
              {topArticles.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">Belum ada data tampilan artikel</p>
              ) : (
                <div className="space-y-3">
                  {topArticles.map((a: any, i: number) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0"
                        style={{ backgroundColor: ERA_COLORS[i % ERA_COLORS.length] + "20", color: ERA_COLORS[i % ERA_COLORS.length] }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                        <p className="text-[10px] text-muted-foreground">{a.era}</p>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium shrink-0">
                        {(a.views ?? 0).toLocaleString()} views
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent comments */}
        <motion.div variants={item}>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Diskusi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              {recentComments.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">Belum ada diskusi</p>
              ) : (
                <div className="space-y-3">
                  {recentComments.map((c: any) => (
                    <div key={c.id} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {(c.user as string)?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                          <span className="text-xs font-semibold text-foreground">{c.user}</span>
                          {c.is_approved ? (
                            <CheckCircle className="w-3 h-3 text-secondary" />
                          ) : (
                            <Badge variant="outline" className="text-[9px] h-4 bg-amber-50 text-amber-600 border-amber-200 px-1">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">"{c.message}"</p>
                        <p className="text-[10px] text-muted-foreground/50 mt-0.5">{c.article} · {c.created_at}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
