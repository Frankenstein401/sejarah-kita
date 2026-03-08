import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, User, AlertTriangle, Reply, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Loader2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useDiscussions, useCreateDiscussion, type Discussion } from "@/hooks/use-discussions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const COMMENTS_PER_PAGE = 5;

// Daftar kata kasar bahasa Indonesia yang difilter
const PROFANITY = [
  "anjing","anjir","anjrit","bangsat","babi","bajingan","keparat","goblok",
  "tolol","kampret","brengsek","sialan","monyet","ngentot","jancok","jancuk",
  "jancik","asu","taik","tai","kontol","memek","puki","lonte","pelacur",
  "sundal","titit","pepek","ngentod","entot","cok","cuk","dancok","dancuk",
  "kimak","pantek","pukimak","bedebah","setan","iblis","brengsek","celeng",
];

const filterProfanity = (text: string): { filtered: string; hasProfanity: boolean } => {
  let result = text;
  let hasProfanity = false;
  PROFANITY.forEach((word) => {
    const regex = new RegExp(`(?<![a-z])${word}(?![a-z])`, "gi");
    if (regex.test(result)) {
      hasProfanity = true;
      result = result.replace(regex, "*".repeat(word.length));
    }
  });
  return { filtered: result, hasProfanity };
};

const formatTime = (dateStr: string) => {
  const ts = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = now - ts;
  if (diff < 60000) return "Baru saja";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
  const d = new Date(ts);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
};

// Reply form component
const ReplyForm = ({ onSubmit, onCancel, isSubmitting }: { 
  onSubmit: (message: string) => void; 
  onCancel: () => void;
  isSubmitting: boolean;
}) => {
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const { filtered, hasProfanity } = filterProfanity(message.trim());
    setWarning(hasProfanity);
    onSubmit(filtered);
    setMessage("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="mt-3 ml-9 space-y-2"
    >
      <textarea
        placeholder="Tulis balasan..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={500}
        rows={2}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={!message.trim() || isSubmitting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-body text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
          Balas
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          Batal
        </button>
      </div>
      <AnimatePresence>
        {warning && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-xs font-body text-amber-600 dark:text-amber-400"
          >
            <AlertTriangle className="w-3 h-3 shrink-0" />
            Balasan mengandung kata tidak pantas dan telah disensor.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

// Single comment component with replies
const CommentItem = ({
  comment,
  onReply,
  isSubmittingReply,
  depth = 0,
}: {
  comment: Discussion;
  onReply: (parentId: string, message: string) => void;
  isSubmittingReply: boolean;
  depth?: number;
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const { isAuthenticated } = useAuth();
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className={depth > 0 ? "ml-9 mt-3" : ""}
    >
      <div className={`rounded-xl border border-border bg-card p-4 ${depth > 0 ? "bg-muted/30" : ""}`}>
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src={comment.user.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
              {comment.user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-body text-sm font-semibold text-foreground">
            {comment.user.name}
          </span>
          <span className="text-[10px] text-muted-foreground font-body">•</span>
          <span className="text-xs text-muted-foreground font-body ml-auto">
            {formatTime(comment.created_at)}
          </span>
        </div>
        <p className="font-body text-sm text-foreground/85 leading-relaxed pl-9">
          {comment.message}
        </p>

        {/* Reply button */}
        {depth < 2 && (
          <div className="pl-9 mt-2 flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setReplyOpen(!replyOpen)}
                className="inline-flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-primary transition-colors"
              >
                <Reply className="w-3 h-3" />
                Balas
              </button>
            )}
            {hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="inline-flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {comment.replies!.length} balasan
              </button>
            )}
          </div>
        )}
      </div>

      {/* Reply form */}
      <AnimatePresence>
        {replyOpen && (
          <ReplyForm
            isSubmitting={isSubmittingReply}
            onSubmit={(message) => {
              onReply(comment.id, message);
              setReplyOpen(false);
              setShowReplies(true);
            }}
            onCancel={() => setReplyOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Nested replies */}
      <AnimatePresence initial={false}>
        {showReplies && hasReplies && comment.replies!.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onReply={onReply}
            isSubmittingReply={isSubmittingReply}
            depth={depth + 1}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const ArticleDiscussion = ({ slug }: { slug: string; articleTitle: string }) => {
  const { user, isAuthenticated } = useAuth();
  const { data: comments, isLoading } = useDiscussions(slug);
  const { mutateAsync: createDiscussion, isPending } = useCreateDiscussion(slug);
  
  const [message, setMessage] = useState("");
  const [profanityWarning, setProfanityWarning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = (list: Discussion[]): number =>
    list.reduce((sum, c) => sum + 1 + (c.replies ? totalCount(c.replies) : 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimMsg = message.trim();
    if (!trimMsg) return;

    const { filtered, hasProfanity } = filterProfanity(trimMsg);
    setProfanityWarning(hasProfanity);

    try {
      await createDiscussion({ message: filtered });
      setMessage("");
    } catch (err) {}
  };

  const handleReply = async (parentId: string, message: string) => {
    try {
      await createDiscussion({ message, parent_id: parentId });
    } catch (err) {}
  };

  return (
    <section className="pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10" />

        <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Diskusi
          {!isLoading && comments && comments.length > 0 && (
            <span className="text-sm font-body text-muted-foreground font-normal">
              ({totalCount(comments)})
            </span>
          )}
        </h3>

        {/* Form */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmit} className="mb-8 space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                   {user?.name.substring(0,2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-body text-sm font-medium text-foreground">{user?.name}</span>
            </div>
            <textarea
              placeholder="Tulis komentar atau pertanyaan..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <button
              type="submit"
              disabled={!message.trim() || isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Kirim
            </button>

            <AnimatePresence>
              {profanityWarning && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1.5 text-xs font-body text-amber-600 dark:text-amber-400"
                >
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  Komentar mengandung kata tidak pantas dan telah disensor otomatis.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        ) : (
          <div className="mb-8 p-6 rounded-xl border border-dashed border-border bg-muted/30 text-center">
             <p className="font-body text-sm text-muted-foreground mb-4">Masuk untuk ikut berdiskusi dan bertanya seputar sejarah.</p>
             <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link to="/login" className="flex items-center gap-2">
                   <LogIn className="w-4 h-4" />
                   Masuk Sekarang
                </Link>
             </Button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="font-body text-xs">Memuat diskusi...</p>
          </div>
        )}

        {/* Comments */}
        {!isLoading && (!comments || comments.length === 0) ? (
          <p className="text-muted-foreground font-body text-sm text-center py-8">
            Belum ada komentar. Jadilah yang pertama berdiskusi!
          </p>
        ) : !isLoading && comments ? (() => {
          const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
          const paginated = comments.slice(
            (currentPage - 1) * COMMENTS_PER_PAGE,
            currentPage * COMMENTS_PER_PAGE
          );
          return (
            <>
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {paginated.map((c) => (
                    <CommentItem key={c.id} comment={c} onReply={handleReply} isSubmittingReply={isPending} />
                  ))}
                </AnimatePresence>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-body transition-colors ${
                          page === currentPage
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Berikutnya
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          );
        })() : null}
      </div>
    </section>
  );
};

export default ArticleDiscussion;
