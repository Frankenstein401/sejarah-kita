import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Send, X, Sparkles, RotateCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { sendToEyang, isAdminUser, resetSession } from "@/lib/eyang-gemini";

// ─── Types ───────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "eyangku";
  text: string;
}

const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const INITIAL_GREETING: ChatMessage = {
  id: "greeting",
  role: "eyangku",
  text: "Halo cucuku! Eyang senang bisa bertemu denganmu di sini. Ada yang ingin kamu tanyakan tentang sejarah Indonesia? Ketik saja, Eyang siap bercerita! 😊",
};

const QUICK_REPLIES = ["Ceritakan Borobudur", "Apa itu Majapahit?", "Siapa Gajah Mada?"];

// ─── SVG Avatar ──────────────────────────────────────────────────────────

const EyangKuSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 6 C50 6 62 10 64 18 L64 24 C64 26 60 28 56 28 L24 28 C20 28 16 26 16 24 L16 18 C18 10 30 6 40 6Z" />
    <path d="M40 8 C48 8 58 11 60 17 L60 22 C60 24 57 26 54 26 L26 26 C23 26 20 24 20 22 L20 17 C22 11 32 8 40 8Z" opacity="0.1" fill="white" />
    <path d="M64 20 Q68 22 66 26 Q64 28 62 26" opacity="0.8" />
    <ellipse cx="40" cy="42" rx="20" ry="18" />
    <ellipse cx="40" cy="42" rx="18" ry="16" opacity="0.06" fill="white" />
    <path d="M30 39 Q33 36 36 39 Q33 40 30 39Z" />
    <path d="M44 39 Q47 36 50 39 Q47 40 44 39Z" />
    <path d="M28 35 Q33 32 37 34" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M43 34 Q47 32 52 35" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M40 40 L38 47 Q40 48 42 47 Z" opacity="0.6" />
    <path d="M32 50 Q36 54 40 54 Q44 54 48 50" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M32 48 Q36 46 40 47 Q44 46 48 48" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M22 38 Q20 42 22 46" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M58 38 Q60 42 58 46" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round" />
    <ellipse cx="19" cy="42" rx="4" ry="6" opacity="0.7" />
    <ellipse cx="61" cy="42" rx="4" ry="6" opacity="0.7" />
    <path d="M24 58 Q32 64 40 66 Q48 64 56 58 Q58 62 56 66 L44 72 Q40 74 36 72 L24 66 Q22 62 24 58Z" opacity="0.8" />
    <path d="M36 72 Q40 74 44 72 L44 78 Q40 80 36 78Z" opacity="0.6" />
  </svg>
);

// ─── Typing Indicator ────────────────────────────────────────────────────

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
    <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
      <EyangKuSvg className="w-5 h-5 text-primary" />
    </div>
    <div className="bg-muted border border-border/50 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primary/60"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  </div>
);

// ─── Chat Bubble ─────────────────────────────────────────────────────────

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2 mb-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <EyangKuSvg className="w-5 h-5 text-primary" />
        </div>
      )}
      <div className={`max-w-[78%] text-sm leading-relaxed whitespace-pre-wrap break-words ${
        isUser
          ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm"
          : "bg-muted border border-border/50 text-foreground rounded-2xl rounded-bl-sm px-4 py-2.5"
      }`}>
        {message.text}
      </div>
    </motion.div>
  );
};

// ─── Chat Panel ──────────────────────────────────────────────────────────

const ChatPanel = ({
  messages, isTyping, onSend, onClose, onQuickReply, onReset, isMobile,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
  onQuickReply: (text: string) => void;
  onReset: () => void;
  isMobile: boolean;
}) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const showQuickReplies = messages.length <= 1 && !isTyping;

  // Auto-scroll — langsung scroll div container, bukan scrollIntoView
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, isTyping]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed z-50 flex flex-col rounded-2xl shadow-2xl border border-border bg-card overflow-hidden ${
        isMobile
          ? "bottom-32 left-3 right-3"
          : "bottom-28 left-6 w-[340px]"
      }`}
      style={{ maxHeight: isMobile ? "70svh" : "520px" }}
    >
      {/* Gradient strip */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-[hsl(40,70%,60%)] to-primary/60 flex-shrink-0" />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-card flex-shrink-0">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <EyangKuSvg className="w-6 h-6 text-primary" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground leading-tight">EyangKu</p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-primary" />
            {isAdminUser() ? "Mode Admin · Gemini AI" : "Penasihat Sejarah · Gemini AI"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onReset} title="Reset percakapan"
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages — pakai div biasa supaya scroll benar */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-0"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}

        {showQuickReplies && (
          <div className="flex flex-wrap gap-1.5 pt-1 pb-1">
            {QUICK_REPLIES.map((text) => (
              <button
                key={text}
                onClick={() => onQuickReply(text)}
                className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary hover:bg-primary/15 transition-colors font-medium"
              >
                {text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-3 border-t border-border/60 bg-card/80 backdrop-blur-sm flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isTyping ? "Eyang sedang mengetik..." : "Tanya EyangKu..."}
          disabled={isTyping}
          maxLength={500}
          className="flex-1 h-10 rounded-xl border border-border bg-muted/50 px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────

const EyangKu = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isTyping, setIsTyping] = useState(false);

  const { scrollYProgress } = useScroll();
  const avatarX = useTransform(scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, 14, -10, 16, -12, 10, -8, 0]
  );
  const avatarRotate = useTransform(scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, 4, -3, 5, -3, 3, -2, 0]
  );

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { id: genId(), role: "user", text }]);
    setIsTyping(true);
    try {
      const response = await sendToEyang(text);
      setMessages((prev) => [...prev, { id: genId(), role: "eyangku", text: response }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: genId(), role: "eyangku",
        text: "Maaf cucuku, Eyang sedang tidak bisa menjawab. Coba lagi sebentar ya.",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    resetSession();
    setMessages([INITIAL_GREETING]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            onSend={sendMessage}
            onClose={() => setIsOpen(false)}
            onQuickReply={sendMessage}
            onReset={handleReset}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Avatar Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ x: avatarX, rotate: avatarRotate }}
        className={`fixed z-40 group ${isMobile ? "bottom-20 left-3" : "bottom-24 left-6"}`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Chat dengan EyangKu"
      >
        {/* Glow */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-[-6px] rounded-full bg-primary/20 blur-lg"
          />
        )}

        {/* Avatar */}
        <div className={`relative rounded-full border-2 bg-card shadow-xl overflow-hidden flex items-center justify-center transition-all duration-200 ${
          isOpen ? "border-primary shadow-primary/20" : "border-primary/50 group-hover:border-primary"
        } ${isMobile ? "w-12 h-12" : "w-16 h-16"}`}>
          <EyangKuSvg className={`text-primary ${isMobile ? "w-9 h-9" : "w-12 h-12"}`} />
        </div>

        {/* Label */}
        <span className={`absolute left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-wider text-primary whitespace-nowrap ${
          isMobile ? "-bottom-4" : "-bottom-5"
        }`}>
          EyangKu
        </span>

        {/* Notif dot */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card shadow-sm"
          />
        )}
      </motion.button>
    </>
  );
};

export default EyangKu;
