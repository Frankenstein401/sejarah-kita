import { motion } from "framer-motion";

// SVG decorative elements per era
const eraDecorations: Record<string, { left: React.ReactNode[]; right: React.ReactNode[] }> = {
  "Hindu-Buddha": {
    left: [
      // Stupa / candi silhouette
      <svg key="stupa" viewBox="0 0 60 120" className="w-10 md:w-14 text-primary/10">
        <path d="M30 5 L10 45 L10 80 L5 80 L5 115 L55 115 L55 80 L50 80 L50 45 Z" fill="currentColor" />
        <circle cx="30" cy="20" r="6" fill="currentColor" opacity="0.5" />
      </svg>,
      <svg key="lotus" viewBox="0 0 60 40" className="w-8 md:w-12 text-primary/8">
        <path d="M30 35 Q15 20 5 30 Q15 10 30 5 Q45 10 55 30 Q45 20 30 35Z" fill="currentColor" />
      </svg>,
    ],
    right: [
      <svg key="bell" viewBox="0 0 50 80" className="w-8 md:w-12 text-primary/10">
        <path d="M25 5 Q5 25 10 55 L40 55 Q45 25 25 5Z" fill="currentColor" />
        <rect x="15" y="55" width="20" height="5" fill="currentColor" opacity="0.5" />
      </svg>,
      <svg key="wheel" viewBox="0 0 50 50" className="w-8 md:w-10 text-primary/8">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="25" cy="25" r="5" fill="currentColor" />
        {[0, 45, 90, 135].map((a) => (
          <line key={a} x1="25" y1="25" x2={25 + 18 * Math.cos((a * Math.PI) / 180)} y2={25 + 18 * Math.sin((a * Math.PI) / 180)} stroke="currentColor" strokeWidth="1.5" />
        ))}
      </svg>,
    ],
  },
  "Kesultanan": {
    left: [
      // Crescent moon
      <svg key="crescent" viewBox="0 0 50 50" className="w-8 md:w-12 text-primary/10">
        <path d="M25 5 A20 20 0 1 0 25 45 A14 14 0 1 1 25 5Z" fill="currentColor" />
      </svg>,
      <svg key="dome" viewBox="0 0 60 50" className="w-8 md:w-12 text-primary/8">
        <path d="M5 50 L5 30 Q30 -5 55 30 L55 50Z" fill="currentColor" />
      </svg>,
    ],
    right: [
      <svg key="star" viewBox="0 0 50 50" className="w-8 md:w-10 text-primary/10">
        <polygon points="25,3 31,18 48,20 35,31 38,47 25,39 12,47 15,31 2,20 19,18" fill="currentColor" />
      </svg>,
      <svg key="arch" viewBox="0 0 40 60" className="w-7 md:w-10 text-primary/8">
        <path d="M5 60 L5 25 Q20 0 35 25 L35 60" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>,
    ],
  },
  "Kolonial": {
    left: [
      // Keris silhouette
      <svg key="keris" viewBox="0 0 20 100" className="w-5 md:w-7 text-primary/10">
        <path d="M10 5 Q5 20 12 30 Q7 40 13 50 Q8 60 12 70 Q9 80 10 95" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>,
      <svg key="shield" viewBox="0 0 40 50" className="w-7 md:w-10 text-primary/8">
        <path d="M20 5 L5 15 L5 30 Q20 50 35 30 L35 15Z" fill="currentColor" />
      </svg>,
    ],
    right: [
      <svg key="flag" viewBox="0 0 50 60" className="w-8 md:w-10 text-primary/10">
        <rect x="5" y="5" width="3" height="50" fill="currentColor" />
        <path d="M8 8 L45 15 L8 25Z" fill="currentColor" opacity="0.7" />
      </svg>,
    ],
  },
  "Pergerakan": {
    left: [
      // Book
      <svg key="book" viewBox="0 0 50 40" className="w-8 md:w-12 text-primary/10">
        <path d="M25 35 L5 30 L5 5 L25 10Z" fill="currentColor" />
        <path d="M25 35 L45 30 L45 5 L25 10Z" fill="currentColor" opacity="0.6" />
      </svg>,
      <svg key="pen" viewBox="0 0 15 80" className="w-4 md:w-5 text-primary/8">
        <rect x="4" y="5" width="7" height="55" rx="2" fill="currentColor" />
        <polygon points="4,60 11,60 7.5,75" fill="currentColor" />
      </svg>,
    ],
    right: [
      <svg key="torch" viewBox="0 0 30 80" className="w-6 md:w-8 text-primary/10">
        <rect x="12" y="30" width="6" height="45" rx="2" fill="currentColor" />
        <path d="M15 5 Q5 15 10 30 L20 30 Q25 15 15 5Z" fill="currentColor" opacity="0.7" />
      </svg>,
    ],
  },
  "Kemerdekaan": {
    left: [
      // Flag
      <svg key="flag2" viewBox="0 0 60 50" className="w-10 md:w-14 text-primary/10">
        <rect x="5" y="5" width="3" height="40" fill="currentColor" />
        <rect x="8" y="5" width="40" height="10" fill="currentColor" opacity="0.8" />
        <rect x="8" y="15" width="40" height="10" fill="currentColor" opacity="0.4" />
      </svg>,
      <svg key="garuda" viewBox="0 0 50 50" className="w-8 md:w-12 text-primary/8">
        <path d="M25 10 L15 25 L5 20 L10 35 L20 40 L25 50 L30 40 L40 35 L45 20 L35 25Z" fill="currentColor" />
      </svg>,
    ],
    right: [
      <svg key="star2" viewBox="0 0 50 50" className="w-8 md:w-10 text-primary/10">
        <polygon points="25,5 29,20 45,20 32,29 36,45 25,35 14,45 18,29 5,20 21,20" fill="currentColor" />
      </svg>,
    ],
  },
};

interface ArticleDecorationProps {
  era: string;
}

const ArticleDecoration = ({ era }: ArticleDecorationProps) => {
  const decorations = eraDecorations[era] || eraDecorations["Hindu-Buddha"];

  return (
    <>
      {/* Left side decorations - hidden on mobile */}
      <div className="hidden lg:flex fixed left-4 xl:left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-10 pointer-events-none">
        {decorations.left.map((el, i) => (
          <motion.div
            key={`left-${i}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {el}
            </motion.div>
          </motion.div>
        ))}
        {/* Vertical decorative line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-px h-24 bg-gradient-to-b from-transparent via-primary/15 to-transparent origin-top"
        />
      </div>

      {/* Right side decorations - hidden on mobile */}
      <div className="hidden lg:flex fixed right-4 xl:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-10 pointer-events-none">
        {decorations.right.map((el, i) => (
          <motion.div
            key={`right-${i}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.3 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {el}
            </motion.div>
          </motion.div>
        ))}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="w-px h-24 bg-gradient-to-b from-transparent via-primary/15 to-transparent origin-top"
        />
      </div>
    </>
  );
};

export default ArticleDecoration;
