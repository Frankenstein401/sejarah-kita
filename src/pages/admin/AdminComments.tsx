import { motion } from "framer-motion";
import { MessageSquare, Check, X, Trash2, Clock, User, FileText, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminComments, useApproveComment, useRejectComment, useDeleteComment } from "@/hooks/use-admin";
import { useState } from "react";

export default function AdminComments() {
  const { data: comments, isLoading } = useAdminComments();
  const { mutateAsync: approve } = useApproveComment();
  const { mutateAsync: reject } = useRejectComment();
  const { mutateAsync: deleteComment } = useDeleteComment();
  const [filter, setFilter] = useState<"semua" | "pending" | "disetujui">("semua");

  const filteredComments = comments?.filter((c: any) => {
    if (filter === "semua") return true;
    if (filter === "pending") return !c.is_approved;
    if (filter === "disetujui") return c.is_approved;
    return true;
  });

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-body">Memuat data komentar...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Moderasi Diskusi</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola dan tinjau komentar dari para penjelajah</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg w-full sm:w-auto">
          {(["semua", "pending", "disetujui"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {!filteredComments || filteredComments.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-foreground font-medium">Tidak ada komentar ditemukan</p>
              <p className="text-sm text-muted-foreground mt-1">Coba ganti filter atau tunggu interaksi user baru</p>
            </CardContent>
          </Card>
        ) : (
          filteredComments.map((comment: any, index: number) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`border-border overflow-hidden ${!comment.is_approved ? "border-l-4 border-l-amber-500" : ""}`}>
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{comment.user.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTime(comment.created_at)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <FileText className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[150px]">ID: {comment.id.substring(0,8)}...</span>
                        </div>
                        {!comment.is_approved ? (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">Menunggu</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 text-[10px]">Disetujui</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-foreground/90 leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/50">
                        "{comment.message}"
                      </p>
                    </div>

                    <div className="flex flex-row gap-2">
                      {!comment.is_approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-secondary border-secondary/30 hover:bg-secondary/10 hover:text-secondary gap-1.5 h-9"
                          onClick={() => approve(comment.id)}
                        >
                          <Check className="w-4 h-4" /> Setujui
                        </Button>
                      )}
                      {comment.is_approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-amber-600 border-amber-500/30 hover:bg-amber-50 gap-1.5 h-9"
                          onClick={() => reject(comment.id)}
                        >
                          <X className="w-4 h-4" /> Tolak
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10 gap-1.5 h-9"
                        onClick={() => {
                          if (confirm("Hapus komentar ini selamanya?")) deleteComment(comment.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" /> Hapus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
