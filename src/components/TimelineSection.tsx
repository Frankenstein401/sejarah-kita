import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTimeline } from "@/hooks/use-home";

const eraColorMap: Record<string, { bg: string; border: string; badge: string; glow: string }> = {
  "hindu-buddha": {
    bg: "from-primary/20 via-transparent to-amber-500/10",
    border: "border-primary/40",
    badge: "bg-primary",
    glow: "shadow-primary/20",
  },
  "kesultanan": {
    bg: "from-[hsl(150,30%,25%)]/20 via-transparent to-primary/10",
    border: "border-[hsl(150,30%,25%)]/40",
    badge: "bg-[hsl(150,30%,25%)]",
    glow: "shadow-[hsl(150,30%,25%)]/20",
  },
  "kolonial": {
    bg: "from-[hsl(15,60%,45%)]/20 via-transparent to-accent/10",
    border: "border-[hsl(15,60%,45%)]/40",
    badge: "bg-[hsl(15,60%,45%)]",
    glow: "shadow-[hsl(15,60%,45%)]/20",
  },
  "pergerakan": {
    bg: "from-[hsl(15,60%,45%)]/20 via-transparent to-accent/10",
    border: "border-[hsl(15,60%,45%)]/40",
    badge: "bg-[hsl(15,60%,45%)]",
    glow: "shadow-[hsl(15,60%,45%)]/20",
  },
  "kemerdekaan": {
    bg: "from-accent/20 via-transparent to-primary/10",
    border: "border-accent/40",
    badge: "bg-accent",
    glow: "shadow-accent/20",
  },
};

const fallback = eraColorMap["hindu-buddha"];

/* ── Modal ───────────────────────────────────────────────── */
const TimelineModal = ({ event, onClose }: { event: any; onClose: () => void }) => {
  const colors = eraColorMap[event.era?.slug] || fallback;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card border border-border rounded-xl max-w-lg w-full overflow-hidden shadow-2xl"
        >
          <div className={`h-1.5 w-full bg-gradient-to-r ${colors.bg}`} />

          {/* Subtle corner glow */}
          <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${colors.bg} blur-2xl opacity-40 pointer-events-none`} />

          <div className="relative z-10 p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-0.5 rounded-full text-primary-foreground ${colors.badge}`}>
                {event.era?.name}
              </span>
              <span className="text-sm font-body text-muted-foreground">{event.year}</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-foreground mb-3">{event.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{event.description}</p>

            {event.significance && Array.isArray(event.significance) && event.significance.length > 0 && (
              <div className="mb-4">
                <p className="font-display text-xs font-semibold text-foreground tracking-widest uppercase mb-2">
                  Signifikansi Sejarah
                </p>
                <ul className="flex flex-col gap-1.5">
                  {event.significance.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.figures && Array.isArray(event.figures) && event.figures.length > 0 && (
              <div className="mb-5">
                <p className="font-display text-xs font-semibold text-foreground tracking-widest uppercase mb-2">
                  Tokoh Utama
                </p>
                <div className="flex flex-wrap gap-2">
                  {event.figures.map((f: string) => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {event.article_slug && (
              <Link
                to={`/artikel/${event.article_slug}`}
                className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
                onClick={onClose}
              >
                <BookOpen className="w-4 h-4" /> Baca artikel lengkap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Timeline Item ───────────────────────────────────────── */
const TimelineItem = ({ event, index, onClick }: { event: any; index: number; onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const colors = eraColorMap[event.era?.slug] || fallback;

  return (
    <div
      ref={ref}
      className={`flex items-start w-full mb-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"} px-2 md:px-0`}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -6 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClick}
          className="relative group bg-card p-4 md:p-6 rounded-lg border border-border cursor-pointer overflow-hidden"
        >
          {/* Gradient glow on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 bg-gradient-to-br ${colors.bg} blur-xl pointer-events-none`}
          />

          {/* Shimmer */}
          <motion.div
            initial={{ x: isLeft ? "-100%" : "100%" }}
            whileHover={{ x: isLeft ? "100%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />

          {/* Border glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 rounded-lg border-2 ${colors.border} pointer-events-none`}
          />

          {/* Corner decoration */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            whileHover={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.4 }}
            className={`absolute ${isLeft ? "top-0 right-0 rounded-bl-full" : "top-0 left-0 rounded-br-full"} w-16 h-16 opacity-20 ${colors.badge} pointer-events-none`}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
              <span className={`text-xs px-2 py-0.5 rounded-full text-primary-foreground ${colors.badge}`}>
                {event.era?.name}
              </span>
              <span className="text-sm font-body text-muted-foreground">{event.year}</span>
            </div>

            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300">
              {event.description}
            </p>

            {/* Click hint — animates in on hover */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`mt-3 flex items-center gap-1 text-xs text-primary font-medium ${isLeft ? "md:justify-end" : ""}`}
            >
              <span>Lihat detail</span>
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-4 h-4 bg-primary rounded-full"
          />
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg shadow-primary/20" />
        </motion.div>
      </div>

      {/* Opposite column — photo if available, otherwise decorative */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="hidden md:flex w-5/12 justify-center items-center"
      >
        {event.image_url ? (
          <motion.div
            whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
            initial={{ rotate: isLeft ? 2 : -2 }}
            className="bg-card border border-border rounded-sm p-3 shadow-xl shadow-black/20 max-w-[220px] w-full"
          >
            <div className="w-full h-36 overflow-hidden rounded-sm bg-muted">
              <img
                src={event.image_url}
                alt={event.title}
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="w-full h-full object-cover"
              />
            </div>
            {event.image_caption && (
              <p className="text-center text-xs font-body text-muted-foreground mt-2 italic px-1 line-clamp-2">
                {event.image_caption}
              </p>
            )}
          </motion.div>
        ) : (
          /* Decorative era badge when no image */
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center opacity-60`}>
            <span className="font-display text-xs text-center text-primary font-semibold px-2 leading-tight">
              {event.year}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* ── Main Section ────────────────────────────────────────── */
const TimelineSection = () => {
  const { data: events, isLoading } = useTimeline();
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <section className="py-24 px-6 bg-background relative" id="linimasa">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Perjalanan Waktu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Linimasa Sejarah</h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Ikuti perjalanan panjang peradaban Indonesia dari era kerajaan hingga kemerdekaan
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground font-body text-sm">Memuat linimasa...</p>
          </div>
        ) : (
          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="timeline-line hidden md:block origin-top"
            />
            {events?.map((event: any, index: number) => (
              <TimelineItem key={event.id} event={event} index={index} onClick={() => setSelected(event)} />
            ))}
          </div>
        )}
      </div>

      {selected && <TimelineModal event={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default TimelineSection;
