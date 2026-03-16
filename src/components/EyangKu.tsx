import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Send, X, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { sendToEyang, isAdminUser } from "@/lib/eyang-gemini";

// ─── Types ──────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "eyangku";
  text: string;
}

const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const INITIAL_GREETING: ChatMessage = {
  id: "greeting",
  role: "eyangku",
  text: "Halo cucuku! Eyang senang bisa bertemu denganmu di sini. Ada yang ingin kamu tanyakan tentang sejarah Indonesia? Ketik saja, Eyang siap bercerita!",
};

const QUICK_REPLIES = [
  "Ceritakan Borobudur",
  "Apa itu Majapahit?",
  "Siapa Gajah Mada?",
];

// ─── EyangKu SVG Avatar ────────────────────────────────────────────────

const EyangKuSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Blangkon / traditional headwear */}
    <path d="M40 6 C50 6 62 10 64 18 L64 24 C64 26 60 28 56 28 L24 28 C20 28 16 26 16 24 L16 18 C18 10 30 6 40 6Z" />
    <path d="M40 8 C48 8 58 11 60 17 L60 22 C60 24 57 26 54 26 L26 26 C23 26 20 24 20 22 L20 17 C22 11 32 8 40 8Z" opacity="0.1" fill="white" />
    {/* Headwear fold detail */}
    <path d="M64 20 Q68 22 66 26 Q64 28 62 26" opacity="0.8" />
    {/* Face */}
    <ellipse cx="40" cy="42" rx="20" ry="18" />
    <ellipse cx="40" cy="42" rx="18" ry="16" opacity="0.06" fill="white" />
    {/* Eyes — wise, slightly squinting */}
    <path d="M30 39 Q33 36 36 39 Q33 40 30 39Z" />
    <path d="M44 39 Q47 36 50 39 Q47 40 44 39Z" />
    {/* Eyebrows — thick, wise */}
    <path d="M28 35 Q33 32 37 34" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M43 34 Q47 32 52 35" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Nose */}
    <path d="M40 40 L38 47 Q40 48 42 47 Z" opacity="0.6" />
    {/* Smile / warm expression */}
    <path d="M32 50 Q36 54 40 54 Q44 54 48 50" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Mustache */}
    <path d="M32 48 Q36 46 40 47 Q44 46 48 48" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    {/* Wrinkle lines — suggests wisdom/age */}
    <path d="M22 38 Q20 42 22 46" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M58 38 Q60 42 58 46" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round" />
    {/* Ears */}
    <ellipse cx="19" cy="42" rx="4" ry="6" opacity="0.7" />
    <ellipse cx="61" cy="42" rx="4" ry="6" opacity="0.7" />
    {/* Collar / clothing hint */}
    <path d="M24 58 Q32 64 40 66 Q48 64 56 58 Q58 62 56 66 L44 72 Q40 74 36 72 L24 66 Q22 62 24 58Z" opacity="0.8" />
    <path d="M36 72 Q40 74 44 72 L44 78 Q40 80 36 78Z" opacity="0.6" />
  </svg>
);

// ─── Typing Indicator ───────────────────────────────────────────────────

const TypingIndicator = () => (
  <div className="flex items-start gap-2 mb-3">
    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
      <EyangKuSvg className="w-4 h-4 text-primary" />
    </div>
    <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2 flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary/50"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  </div>
);

// ─── Chat Bubble ────────────────────────────────────────────────────────

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-2 mb-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <EyangKuSvg className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 text-sm font-body leading-relaxed ${
          isUser
            ? "bg-primary/10 text-foreground rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

// ─── Chat Panel ─────────────────────────────────────────────────────────

const ChatPanel = ({
  messages,
  isTyping,
  onSend,
  onClose,
  onQuickReply,
  isMobile,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
  onQuickReply: (text: string) => void;
  isMobile: boolean;
}) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const showQuickReplies = messages.length <= 1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed z-40 bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col ${
        isMobile
          ? "bottom-36 left-3 right-3 max-h-[350px]"
          : "bottom-44 left-6 w-80 max-h-[420px]"
      }`}
    >
      {/* Gold top strip */}
      <div className="h-[3px] bg-gradient-to-r from-[hsl(36,80%,50%)] to-[hsl(40,70%,65%)]" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <EyangKuSvg className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-foreground leading-tight">EyangKu</p>
            <p className="text-[10px] font-body text-muted-foreground flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              {isAdminUser() ? "Mode Admin · AI" : "Penasihat Sejarah · AI"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-3" style={{ maxHeight: isMobile ? 200 : 280 }}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}

        {/* Quick reply chips */}
        {showQuickReplies && !isTyping && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {QUICK_REPLIES.map((text) => (
              <button
                key={text}
                onClick={() => onQuickReply(text)}
                className="px-3 py-1.5 rounded-full border border-primary/30 text-xs font-body text-primary hover:bg-primary/10 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-3 py-2 border-t border-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya EyangKu..."
          maxLength={300}
          className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
};

// ─── Main EyangKu Component ─────────────────────────────────────────────

const EyangKu = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isTyping, setIsTyping] = useState(false);

  // Scroll-driven wiggle animation
  const { scrollYProgress } = useScroll();
  const avatarX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, 14, -10, 16, -12, 10, -8, 0]
  );
  const avatarRotate = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, 4, -3, 5, -3, 3, -2, 0]
  );

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = { id: genId(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
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

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            onSend={sendMessage}
            onClose={() => setIsOpen(false)}
            onQuickReply={handleQuickReply}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Avatar Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ x: avatarX, rotate: avatarRotate }}
        className={`fixed z-40 group ${
          isMobile ? "bottom-20 left-3" : "bottom-24 left-6"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat dengan EyangKu"
      >
        {/* Glowing ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-[-4px] rounded-full bg-primary/25 blur-md ${isOpen ? "hidden" : ""}`}
        />

        {/* Avatar circle */}
        <div
          className={`relative rounded-full border-2 bg-card shadow-lg overflow-hidden flex items-center justify-center transition-colors ${
            isOpen ? "border-primary" : "border-primary/60 group-hover:border-primary"
          } ${isMobile ? "w-12 h-12" : "w-16 h-16"}`}
        >
          <EyangKuSvg className={`text-primary ${isMobile ? "w-9 h-9" : "w-12 h-12"}`} />
        </div>

        {/* Label */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 text-[9px] font-body font-bold tracking-wider text-primary whitespace-nowrap ${
            isMobile ? "-bottom-4" : "-bottom-5"
          }`}
        >
          EyangKu
        </span>

        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[hsl(15,60%,45%)] border-2 border-card"
          />
        )}
      </motion.button>
    </>
  );
};

export default EyangKu;
