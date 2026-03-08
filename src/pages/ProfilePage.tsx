import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Shield, BookOpen, HelpCircle, Bookmark,
  Clock, CheckCircle, Trophy, ArrowRight, Loader2, LogOut, Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth, useDeleteAccount } from "@/hooks/use-auth";
import { useUserBookmarks, useUserStats, useQuizHistory } from "@/hooks/use-user-actions";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

function formatSeconds(s: number) {
  if (!s) return "—";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

function scoreColor(pct: number) {
  if (pct >= 80) return "text-green-600";
  if (pct >= 60) return "text-amber-600";
  return "text-destructive";
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();
  const { mutateAsync: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: bookmarks, isLoading: bookmarksLoading } = useUserBookmarks();
  const { data: stats, isLoading: statsLoading } = useUserStats();
  const { data: quizHistory, isLoading: quizLoading } = useQuizHistory();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
    navigate("/");
  };

  const avgQuizScore =
    quizHistory && quizHistory.length > 0
      ? Math.round(
          quizHistory.reduce((s: number, a: any) => s + (a.total > 0 ? (a.score / a.total) * 100 : 0), 0) /
            quizHistory.length
        )
      : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container max-w-4xl mx-auto px-4 pt-24 pb-10">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          {/* Header */}
          <motion.div variants={item} className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Profil Saya</h1>
              <p className="text-sm text-muted-foreground mt-1">Kelola akun dan lihat aktivitasmu</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5">
                <LogOut className="w-4 h-4" /> Keluar
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(true)} className="gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5">
                <Trash2 className="w-4 h-4" /> Hapus Akun
              </Button>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus akun?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Akun kamu akan dihapus permanen. Data seperti bookmark dan riwayat kuis tidak bisa dikembalikan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Ya, Hapus Akun
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>

          {/* Profile card */}
          <motion.div variants={item}>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-2xl shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-foreground leading-tight">{user?.name}</h2>
                    <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <Badge variant="outline" className="text-[10px] h-5 bg-primary/10 text-primary border-primary/20 px-2 capitalize">
                        {user?.role ?? "user"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: BookOpen,
                  label: "Artikel Dibaca",
                  value: statsLoading ? "…" : (stats?.total_read ?? 0).toString(),
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  icon: Bookmark,
                  label: "Tersimpan",
                  value: bookmarksLoading ? "…" : (bookmarks?.length ?? 0).toString(),
                  color: "text-secondary",
                  bg: "bg-secondary/10",
                },
                {
                  icon: HelpCircle,
                  label: "Kuis Dikerjakan",
                  value: quizLoading ? "…" : (quizHistory?.length ?? 0).toString(),
                  color: "text-accent",
                  bg: "bg-accent/10",
                },
                {
                  icon: Trophy,
                  label: "Rata-rata Skor",
                  value: quizLoading ? "…" : avgQuizScore !== null ? `${avgQuizScore}%` : "—",
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
              ].map((s) => (
                <Card key={s.label} className="border-border">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground leading-tight">{s.value}</p>
                      <p className="text-[11px] text-muted-foreground">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Bookmarks */}
          <motion.div variants={item}>
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm font-semibold">Artikel Tersimpan</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">{bookmarks?.length ?? 0}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {bookmarksLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : !bookmarks || bookmarks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Belum ada artikel yang disimpan.</p>
                    <Link to="/artikel" className="text-xs text-primary hover:underline mt-1 inline-block">
                      Jelajahi artikel →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {bookmarks.slice(0, 5).map((b: any) => (
                      <Link
                        key={b.id}
                        to={`/artikel/${b.article?.slug ?? b.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                            {b.article?.title ?? b.title}
                          </p>
                          {b.article?.era && (
                            <p className="text-xs text-muted-foreground mt-0.5">{b.article.era.name}</p>
                          )}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                    {bookmarks.length > 5 && (
                      <p className="text-xs text-center text-muted-foreground pt-1">
                        +{bookmarks.length - 5} artikel lainnya
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quiz history */}
          <motion.div variants={item}>
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm font-semibold">Riwayat Kuis</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">{quizHistory?.length ?? 0} percobaan</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {quizLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : !quizHistory || quizHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Belum pernah mengerjakan kuis.</p>
                    <Link to="/artikel" className="text-xs text-primary hover:underline mt-1 inline-block">
                      Coba kuis sekarang →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quizHistory.slice(0, 8).map((attempt: any) => {
                      const pct = attempt.total > 0 ? Math.round((attempt.score / attempt.total) * 100) : 0;
                      return (
                        <div key={attempt.id}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${pct >= 80 ? "bg-green-50" : pct >= 60 ? "bg-amber-50" : "bg-red-50"}`}>
                              <CheckCircle className={`w-4 h-4 ${scoreColor(pct)}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {attempt.article?.title ?? "Kuis"}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <Progress value={pct} className="h-1.5 flex-1" />
                                <span className={`text-xs font-bold shrink-0 ${scoreColor(pct)}`}>{pct}%</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xs font-medium text-foreground">{attempt.score}/{attempt.total}</p>
                              {attempt.time_seconds && (
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground justify-end mt-0.5">
                                  <Clock className="w-3 h-3" />
                                  {formatSeconds(attempt.time_seconds)}
                                </div>
                              )}
                            </div>
                          </div>
                          <Separator className="mt-3" />
                        </div>
                      );
                    })}
                    {quizHistory.length > 8 && (
                      <p className="text-xs text-center text-muted-foreground pt-1">
                        +{quizHistory.length - 8} percobaan lainnya
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
}
