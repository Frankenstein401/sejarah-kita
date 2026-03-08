import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2, GripVertical } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCreateQuiz, useUpdateQuiz, useAdminArticles, useAdminQuizDetail } from "@/hooks/use-admin";

interface QuestionDraft {
  question: string;
  options: [string, string, string, string];
  correct_index: number;
  explanation: string;
}

const EMPTY_QUESTION = (): QuestionDraft => ({
  question: "",
  options: ["", "", "", ""],
  correct_index: 0,
  explanation: "",
});

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  quiz?: any; // existing quiz for edit mode
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuizFormDialog({ open, onOpenChange, quiz }: Props) {
  const isEdit = !!quiz;
  const { mutateAsync: createQuiz, isPending: creating } = useCreateQuiz();
  const { mutateAsync: updateQuiz, isPending: updating } = useUpdateQuiz();
  const { data: articles } = useAdminArticles();

  // Fetch full quiz detail (with questions array) when editing
  const { data: quizDetail, isLoading: loadingDetail } = useAdminQuizDetail(
    isEdit && open ? quiz.id : ""
  );

  const [title, setTitle] = useState("");
  const [articleId, setArticleId] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([EMPTY_QUESTION()]);
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when detail loads (edit mode)
  useEffect(() => {
    if (open && isEdit && quizDetail) {
      setTitle(quizDetail.title ?? "");
      setArticleId(quizDetail.article?.id ?? "");
      if (quizDetail.questions?.length) {
        setQuestions(
          quizDetail.questions.map((q: any) => ({
            question: q.question ?? "",
            options: (q.options ?? ["", "", "", ""]) as [string, string, string, string],
            correct_index: q.correct_index ?? 0,
            explanation: q.explanation ?? "",
          }))
        );
        setExpanded([0]);
      } else {
        setQuestions([EMPTY_QUESTION()]);
        setExpanded([0]);
      }
    } else if (open && !isEdit) {
      setTitle("");
      setArticleId("");
      setQuestions([EMPTY_QUESTION()]);
      setExpanded([0]);
      setErrors({});
    }
  }, [open, isEdit, quizDetail]);

  const isPending = creating || updating;
  const isLoadingForm = isEdit && loadingDetail && !quizDetail;

  // ── Helpers ──

  const setQuestion = (idx: number, key: keyof QuestionDraft, value: any) => {
    setQuestions((qs) =>
      qs.map((q, i) => (i === idx ? { ...q, [key]: value } : q))
    );
  };

  const setOption = (qIdx: number, optIdx: number, value: string) => {
    setQuestions((qs) =>
      qs.map((q, i) => {
        if (i !== qIdx) return q;
        const opts = [...q.options] as [string, string, string, string];
        opts[optIdx] = value;
        return { ...q, options: opts };
      })
    );
  };

  const addQuestion = () => {
    const idx = questions.length;
    setQuestions((qs) => [...qs, EMPTY_QUESTION()]);
    setExpanded((ex) => [...ex, idx]);
  };

  const removeQuestion = (idx: number) => {
    setQuestions((qs) => qs.filter((_, i) => i !== idx));
    setExpanded((ex) => ex.filter((i) => i !== idx).map((i) => (i > idx ? i - 1 : i)));
  };

  const toggleExpand = (idx: number) => {
    setExpanded((ex) =>
      ex.includes(idx) ? ex.filter((i) => i !== idx) : [...ex, idx]
    );
  };

  // ── Validation ──

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Judul kuis wajib diisi.";
    if (!isEdit && !articleId) errs.articleId = "Pilih artikel terlebih dahulu.";
    if (questions.length === 0) errs.questions = "Tambah minimal 1 soal.";
    questions.forEach((q, i) => {
      if (!q.question.trim()) errs[`q${i}_question`] = "Pertanyaan wajib diisi.";
      q.options.forEach((opt, j) => {
        if (!opt.trim()) errs[`q${i}_opt${j}`] = `Opsi ${OPTION_LABELS[j]} wajib diisi.`;
      });
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ──

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const payload = {
        title,
        ...(isEdit ? {} : { article_id: articleId }),
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options,
          correct_index: q.correct_index,
          explanation: q.explanation || null,
        })),
      };
      if (isEdit) {
        await updateQuiz({ id: quiz.id, data: payload });
      } else {
        await createQuiz(payload);
      }
      onOpenChange(false);
    } catch {
      // errors shown via toast from hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEdit ? "Edit Kuis" : "Tambah Kuis Baru"}
          </DialogTitle>
        </DialogHeader>

        {isLoadingForm ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Memuat soal...</span>
          </div>
        ) : null}

        <div className="space-y-5 py-2" style={{ display: isLoadingForm ? "none" : undefined }}>
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="quiz-title">Judul Kuis <span className="text-destructive">*</span></Label>
            <Input
              id="quiz-title"
              placeholder="Contoh: Kuis Kerajaan Kutai"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((er) => ({ ...er, title: "" })); }}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Article selector (only for create) */}
          {!isEdit && (
            <div className="space-y-1.5">
              <Label>Artikel <span className="text-destructive">*</span></Label>
              <Select value={articleId} onValueChange={(v) => { setArticleId(v); setErrors((er) => ({ ...er, articleId: "" })); }}>
                <SelectTrigger className={errors.articleId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Pilih artikel..." />
                </SelectTrigger>
                <SelectContent>
                  {(articles ?? []).map((a: any) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.articleId && <p className="text-xs text-destructive">{errors.articleId}</p>}
            </div>
          )}

          {isEdit && quiz?.article && (
            <div className="flex items-center gap-2 py-2 px-3 bg-muted rounded-lg border border-border">
              <span className="text-xs text-muted-foreground">Artikel:</span>
              <span className="text-sm font-medium text-foreground">{quiz.article.title}</span>
              <Badge variant="outline" className="ml-auto text-[10px]">Tidak dapat diubah</Badge>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Soal ({questions.length})</Label>
              <Button type="button" variant="outline" size="sm" onClick={addQuestion} className="gap-1.5 h-8">
                <Plus className="w-3.5 h-3.5" /> Tambah Soal
              </Button>
            </div>
            {errors.questions && <p className="text-xs text-destructive">{errors.questions}</p>}

            {questions.map((q, qIdx) => {
              const isOpen = expanded.includes(qIdx);
              const hasError = !!errors[`q${qIdx}_question`] || q.options.some((_, j) => !!errors[`q${qIdx}_opt${j}`]);
              return (
                <div key={qIdx} className={`border rounded-xl overflow-hidden ${hasError ? "border-destructive" : "border-border"}`}>
                  {/* Header */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 bg-muted/40 cursor-pointer select-none"
                    onClick={() => toggleExpand(qIdx)}
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                      {qIdx + 1}
                    </span>
                    <span className="text-sm text-foreground flex-1 truncate">
                      {q.question || <span className="text-muted-foreground italic">Soal belum diisi</span>}
                    </span>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      Jawaban: {OPTION_LABELS[q.correct_index]}
                    </Badge>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeQuestion(qIdx); }}
                        className="text-destructive hover:text-destructive/80 shrink-0 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </div>

                  {/* Body */}
                  {isOpen && (
                    <div className="p-4 space-y-4">
                      {/* Question text */}
                      <div className="space-y-1.5">
                        <Label className="text-xs">Pertanyaan <span className="text-destructive">*</span></Label>
                        <Textarea
                          placeholder="Tulis pertanyaan di sini..."
                          value={q.question}
                          onChange={(e) => { setQuestion(qIdx, "question", e.target.value); setErrors((er) => ({ ...er, [`q${qIdx}_question`]: "" })); }}
                          className={`resize-none ${errors[`q${qIdx}_question`] ? "border-destructive" : ""}`}
                          rows={2}
                        />
                        {errors[`q${qIdx}_question`] && <p className="text-xs text-destructive">{errors[`q${qIdx}_question`]}</p>}
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        <Label className="text-xs">Pilihan Jawaban <span className="text-destructive">*</span></Label>
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setQuestion(qIdx, "correct_index", optIdx)}
                              className={`w-7 h-7 rounded-full text-xs font-bold border-2 shrink-0 transition-all ${
                                q.correct_index === optIdx
                                  ? "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/20"
                                  : "border-border text-muted-foreground hover:border-primary/40"
                              }`}
                              title={`Jadikan ${OPTION_LABELS[optIdx]} sebagai jawaban benar`}
                            >
                              {OPTION_LABELS[optIdx]}
                            </button>
                            <Input
                              placeholder={`Opsi ${OPTION_LABELS[optIdx]}...`}
                              value={opt}
                              onChange={(e) => { setOption(qIdx, optIdx, e.target.value); setErrors((er) => ({ ...er, [`q${qIdx}_opt${optIdx}`]: "" })); }}
                              className={`flex-1 h-9 text-sm ${errors[`q${qIdx}_opt${optIdx}`] ? "border-destructive" : ""} ${q.correct_index === optIdx ? "border-primary/40 bg-primary/5" : ""}`}
                            />
                          </div>
                        ))}
                        <p className="text-[10px] text-muted-foreground">Klik huruf (A/B/C/D) untuk menandai jawaban benar</p>
                      </div>

                      {/* Explanation */}
                      <div className="space-y-1.5">
                        <Label className="text-xs">Penjelasan Jawaban <span className="text-muted-foreground">(opsional)</span></Label>
                        <Textarea
                          placeholder="Jelaskan mengapa jawaban ini benar..."
                          value={q.explanation}
                          onChange={(e) => setQuestion(qIdx, "explanation", e.target.value)}
                          className="resize-none text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isPending} className="min-w-[120px]">
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : isEdit ? "Simpan Perubahan" : "Buat Kuis"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
