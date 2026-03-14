import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle, Users, TrendingUp, Plus, ChevronLeft, ChevronRight,
  Loader2, Pencil, Trash2, BookOpen, AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdminQuizzes, useDeleteQuiz } from "@/hooks/use-admin";
import QuizFormDialog from "@/components/admin/QuizFormDialog";

const ITEMS_PER_PAGE = 6;

export default function AdminQuizzes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: quizzes, isLoading } = useAdminQuizzes();
  const { mutateAsync: deleteQuiz, isPending: deleting } = useDeleteQuiz();

  const quizList = quizzes || [];
  const totalAttempts = quizList.reduce((s: number, q: any) => s + (q.attempts_count || 0), 0);
  const avgAllScore =
    quizList.length > 0
      ? Math.round(quizList.reduce((s: number, q: any) => s + (q.avg_score || 0), 0) / quizList.length)
      : 0;

  const totalPages = Math.ceil(quizList.length / ITEMS_PER_PAGE);
  const paginated = quizList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openCreate = () => { setEditingQuiz(null); setDialogOpen(true); };
  const openEdit = (quiz: any) => { setEditingQuiz(quiz); setDialogOpen(true); };
  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteQuiz(deleteId);
    setDeleteId(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-body">Memuat data kuis...</p>
      </div>
    );
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Kelola Kuis</h1>
            <p className="text-sm text-muted-foreground mt-1">{quizList.length} kuis aktif</p>
          </div>
          <Button onClick={openCreate} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4" /> Tambah Kuis
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{quizList.length}</p>
                <p className="text-xs text-muted-foreground">Total Kuis</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{totalAttempts}</p>
                <p className="text-xs text-muted-foreground">Total Percobaan</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border col-span-2 md:col-span-1">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{avgAllScore}%</p>
                <p className="text-xs text-muted-foreground">Rata-rata Skor</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz list */}
        {quizList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <AlertCircle className="w-10 h-10 opacity-30" />
            <p className="text-sm">Belum ada kuis. Klik "Tambah Kuis" untuk membuat kuis pertama.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {paginated.map((quiz: any, i: number) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground">{quiz.title}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <BookOpen className="w-3 h-3 text-muted-foreground shrink-0" />
                            <p className="text-xs text-muted-foreground truncate">
                              {quiz.article?.title || "Artikel tidak ditemukan"}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground/60 mt-0.5">
                            {quiz.questions_count ?? 0} soal
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                            onClick={() => openEdit(quiz)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setDeleteId(quiz.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-foreground text-sm">{quiz.attempts_count || 0}</span>
                          <span className="text-xs text-muted-foreground">Percobaan</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                          <span className="text-sm font-bold">{quiz.avg_score || 0}%</span>
                          <Progress value={quiz.avg_score || 0} className="h-1.5 flex-1" />
                        </div>
                        <Badge
                          variant={(quiz.avg_score || 0) >= 75 ? "default" : "secondary"}
                          className={(quiz.avg_score || 0) >= 75 ? "bg-secondary text-secondary-foreground" : ""}
                        >
                          {(quiz.avg_score || 0) >= 75 ? "Baik" : "Perlu Review"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, quizList.length)} dari {quizList.length} kuis
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline" size="icon" className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 text-sm ${page === currentPage ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline" size="icon" className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Quiz form dialog (create / edit) */}
      <QuizFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        quiz={editingQuiz}
      />

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => { if (!v) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kuis?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Semua soal dan riwayat percobaan pada kuis ini akan ikut terhapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
