import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2, Clock, User, FileText, Loader2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminComments, useDeleteComment } from "@/hooks/use-admin";

export default function AdminComments() {
  const [search, setSearch] = useState("");
  const { data: comments, isLoading } = useAdminComments(search);
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment();

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Komentar</h1>
          <p className="text-sm text-muted-foreground mt-1">Hapus komentar yang melanggar</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari komentar, user, artikel..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Memuat komentar...</p>
        </div>
      ) : !comments?.length ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="font-medium">Tidak ada komentar ditemukan</p>
            {search && <p className="text-sm text-muted-foreground mt-1">Coba kata kunci lain</p>}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {comments.map((comment: any, index: number) => (
            <motion.div key={comment.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <Card>
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-semibold">{comment.user?.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTime(comment.created_at)}
                      </div>
                      {comment.article && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <FileText className="w-3 h-3" />
                          <span className="truncate max-w-[180px]">{comment.article.title}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-foreground/90 bg-muted/40 rounded-lg px-3 py-2 border border-border/40">
                      "{comment.message}"
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1.5 shrink-0 self-start"
                    disabled={isDeleting}
                    onClick={() => {
                      if (confirm("Hapus komentar ini?")) deleteComment(comment.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" /> Hapus
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
