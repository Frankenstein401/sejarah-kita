import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BookOpen, Target, Users, Sparkles, Landmark, Heart, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import EyangKu from "@/components/EyangKu";
import { usePublicStats } from "@/hooks/use-home";

// ─── SVG Wayang Components ──────────────────────────────────────────────

// Gunungan (Kayon) — The Tree of Life, iconic scene divider in wayang kulit
const Gunungan = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 240" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Main leaf shape */}
    <path d="M60 6 C75 40 102 98 102 152 C102 194 84 220 60 234 C36 220 18 194 18 152 C18 98 45 40 60 6Z" />
    {/* Inner detail — lighter leaf */}
    <path d="M60 28 C69 50 86 96 86 148 C86 180 74 202 60 214 C46 202 34 180 34 148 C34 96 51 50 60 28Z" opacity="0.12" fill="white" />
    {/* Center trunk */}
    <rect x="58" y="36" width="4" height="185" rx="2" opacity="0.1" fill="white" />
    {/* Branches */}
    <path d="M60 70 L78 56 M60 70 L42 56" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M60 105 L82 90 M60 105 L38 90" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M60 140 L76 128 M60 140 L44 128" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M60 175 L72 165 M60 175 L48 165" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.08" fill="none" />
    {/* Decorative circles */}
    <circle cx="60" cy="50" r="5" opacity="0.12" fill="white" />
    <circle cx="60" cy="88" r="6" opacity="0.1" fill="white" />
    <circle cx="60" cy="125" r="7" opacity="0.08" fill="white" />
    <circle cx="60" cy="158" r="6" opacity="0.1" fill="white" />
    <circle cx="60" cy="192" r="4" opacity="0.12" fill="white" />
    {/* Tip ornament */}
    <circle cx="60" cy="6" r="3" opacity="0.3" />
  </svg>
);

// Wayang Figure — Simplified stylized shadow puppet silhouette
const WayangFigure = ({ className, flip }: { className?: string; flip?: boolean }) => (
  <svg
    viewBox="0 0 100 300"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={flip ? { transform: "scaleX(-1)" } : undefined}
  >
    {/* Crown / Headdress */}
    <path d="M50 0 L56 6 L60 2 L58 22 Q56 30 50 34 Q44 30 42 22 L40 2 L44 6 Z" />
    <circle cx="50" cy="12" r="3" opacity="0.2" fill="white" />
    {/* Head */}
    <ellipse cx="50" cy="46" rx="14" ry="13" />
    {/* Nose profile */}
    <path d="M64 40 L74 44 L70 50 L64 47 Z" />
    {/* Eye cutout */}
    <ellipse cx="54" cy="43" rx="3" ry="2" opacity="0.15" fill="white" />
    {/* Neck */}
    <rect x="45" y="59" width="10" height="14" rx="4" />
    {/* Body / Torso */}
    <path d="M38 73 Q36 105 35 132 Q34 142 40 148 L60 148 Q66 142 65 132 Q64 105 62 73 Q56 67 50 67 Q44 67 38 73Z" />  
    {/* Decorative body details */}
    <ellipse cx="50" cy="100" rx="6" ry="4" opacity="0.1" fill="white" />
    <rect x="48" y="115" width="4" height="20" rx="2" opacity="0.08" fill="white" />
    {/* Left arm — extended upward-left */}
    <path d="M38 82 L20 60 Q16 56 12 58 L10 62 Q10 66 14 68 L32 85 Z" />
    {/* Left hand detail */}
    <path d="M10 58 L4 52 M10 58 L6 56 M10 62 L4 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Right arm — extended downward-right */}
    <path d="M62 90 L80 112 Q84 116 88 114 L90 110 Q90 106 86 104 L68 86 Z" />
    {/* Right hand detail */}
    <path d="M90 110 L96 114 M90 114 L94 118 M88 114 L92 120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Sarong / lower body */}
    <path d="M40 148 L36 230 Q34 242 38 246 L46 250 L50 240 L54 250 L62 246 Q66 242 64 230 L60 148 Z" />
    {/* Sarong batik pattern */}
    <path d="M42 170 L58 170 M44 190 L56 190 M46 210 L54 210" stroke="white" strokeWidth="1" opacity="0.08" fill="none" />
    {/* Control rod */}
    <rect x="48" y="250" width="4" height="48" rx="2" opacity="0.5" />
  </svg>
);

// Ornamental diamond — Javanese wajik motif
const WajikOrnament = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 2 L56 30 L30 58 L4 30 Z" />
    <path d="M30 10 L48 30 L30 50 L12 30 Z" opacity="0.15" fill="white" />
    <circle cx="30" cy="30" r="4" opacity="0.12" fill="white" />
  </svg>
);

// Mega Mendung — stylized cloud motif from Cirebon batik
const CloudMotif = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 48 Q12 30 28 30 Q28 12 46 12 Q56 12 62 20 Q66 12 78 12 Q94 12 94 30 Q108 30 108 48 Z" />
    <path d="M20 46 Q20 32 32 32 Q32 18 46 18 Q54 18 58 24 Q62 18 72 18 Q84 18 84 32 Q94 32 94 46 Z" opacity="0.12" fill="white" />
  </svg>
);

// ─── Animated Counter ───────────────────────────────────────────────────

const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => { 
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
};

// ─── Main Page Component ────────────────────────────────────────────────

const AboutPage = () => {
  const { data: publicStats } = usePublicStats();

  // Wayang section parallax
  const wayangRef = useRef<HTMLElement>(null);
  const { scrollYProgress: wayangProgress } = useScroll({
    target: wayangRef,
    offset: ["start end", "end start"],
  });

  // Gunungan transforms
  const gununganY = useTransform(wayangProgress, [0, 1], [80, -80]);
  const gununganRotate = useTransform(wayangProgress, [0, 0.5, 1], [-8, 0, 8]);
  const gununganScale = useTransform(wayangProgress, [0, 0.5, 1], [0.7, 1.15, 0.85]);

  // Wayang figure transforms
  const wayangLeftY = useTransform(wayangProgress, [0, 1], [160, -120]);
  const wayangLeftX = useTransform(wayangProgress, [0, 0.5, 1], [-80, 0, -30]);
  const wayangRightY = useTransform(wayangProgress, [0, 1], [-120, 160]);
  const wayangRightX = useTransform(wayangProgress, [0, 0.5, 1], [80, 0, 30]);

  // Ornamental transforms
  const ornament1Rotate = useTransform(wayangProgress, [0, 1], [0, 180]);
  const ornament2Rotate = useTransform(wayangProgress, [0, 1], [45, -135]);
  const ornament3Y = useTransform(wayangProgress, [0, 1], [40, -60]);
  const ornament4Y = useTransform(wayangProgress, [0, 1], [-30, 50]);
  const cloudX = useTransform(wayangProgress, [0, 1], [-40, 40]);

  // Page-level floating elements
  const { scrollYProgress: pageProgress } = useScroll();
  const floatGunungan1 = useTransform(pageProgress, [0, 1], [0, -200]);
  const floatGunungan2 = useTransform(pageProgress, [0, 1], [0, -120]);
  const floatRotate = useTransform(pageProgress, [0, 1], [0, 360]);

  const stats = [
    { label: "Artikel Sejarah", value: publicStats?.total_articles || 77, suffix: "+" },
    { label: "Tahun Tercakup", value: publicStats?.years_covered || 1700, suffix: "+" },
    { label: "Era Peradaban", value: publicStats?.total_eras || 6, suffix: "" },
  ];

  const missions = [
    {
      icon: Target,
      title: "Misi Kami",
      description: "Menjadikan pembelajaran sejarah Indonesia lebih menarik, interaktif, dan mudah dipahami oleh generasi digital.",
      color: "primary",
    },
    {
      icon: Users,
      title: "Untuk Siapa",
      description: "Pelajar, mahasiswa, guru, dan siapapun yang ingin memahami kekayaan sejarah dan budaya Indonesia.",
      color: "forest",
    },
    {
      icon: Sparkles,
      title: "Keunikan Kami",
      description: "Menggabungkan desain modern dengan konten sejarah mendalam, dilengkapi visualisasi timeline interaktif.",
      color: "terracotta",
    },
  ];

  const budayaCards = [
    {
      icon: Landmark,
      title: "Kearifan Lokal",
      desc: "Setiap cerita sejarah mengandung nilai-nilai luhur yang relevan hingga hari ini — dari gotong royong hingga bhinneka tunggal ika.",
    },
    {
      icon: Heart,
      title: "Identitas Bangsa",
      desc: "Memahami perjalanan bangsa adalah kunci membentuk generasi berkarakter yang mencintai tanah airnya.",     
    },
    {
      icon: Globe,
      title: "Warisan untuk Dunia",
      desc: "Dari Borobudur hingga batik, Indonesia memiliki warisan budaya yang diakui dunia dan wajib dilestarikan.",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* ── Floating page-level wayang decorations ── */}
      <motion.div style={{ y: floatGunungan1 }} className="absolute top-[600px] -left-8 pointer-events-none opacity-[0.04]">
        <Gunungan className="w-28 h-auto" />
      </motion.div>
      <motion.div style={{ y: floatGunungan2, rotate: floatRotate }} className="absolute top-[900px] -right-4 pointer-events-none opacity-[0.03]">
        <WajikOrnament className="w-16 h-auto" />
      </motion.div>
      <motion.div style={{ y: floatGunungan1 }} className="absolute top-[1600px] right-12 pointer-events-none opacity-[0.04]">
        <Gunungan className="w-20 h-auto rotate-12" />
      </motion.div>

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-primary font-body text-sm font-medium">Tentang SejarahKita</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Menghidupkan Sejarah
            <br />
            <span className="text-gradient-gold">untuk Masa Depan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Platform pembelajaran sejarah Indonesia yang menggabungkan teknologi modern dengan konten berkualitas,     
            dirancang untuk membuat sejarah lebih mudah dipahami dan menyenangkan.
          </motion.p>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 px-6 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground font-body text-sm mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Cards ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
              Mengapa SejarahKita?
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Visi & Misi Kami
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-card border border-border rounded-xl p-8 overflow-hidden cursor-pointer"  
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 0.1, scale: 1.5 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-br from-${mission.color} to-transparent`}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-xl bg-${mission.color}/10 flex items-center justify-center mb-6 group-hover:bg-${mission.color}/20 transition-colors`}
                  >
                    <mission.icon className={`w-7 h-7 text-${mission.color}`} />
                  </motion.div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {mission.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ── WAYANG CULTURE PARALLAX SECTION ──
          ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={wayangRef}
        className="relative py-32 md:py-40 px-6 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(35 30% 12%) 0%, hsl(30 25% 8%) 50%, hsl(25 20% 10%) 100%)" }}
      >
        {/* Blencong glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,hsl(36,80%,50%,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,hsl(36,70%,45%,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* ── Gunungan ── */}
        <motion.div
          style={{ y: gununganY, rotate: gununganRotate, scale: gununganScale }}
          className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <Gunungan className="w-24 md:w-32 h-auto text-[hsl(36,70%,45%)] opacity-40" />
        </motion.div>

        {/* ── Left Wayang Figure ── */}
        <motion.div
          style={{ y: wayangLeftY, x: wayangLeftX }}
          className="absolute -left-4 md:left-8 lg:left-20 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <WayangFigure className="w-20 md:w-28 lg:w-36 h-auto text-[hsl(30,25%,18%)] opacity-60" />
        </motion.div>

        {/* ── Right Wayang Figure (flipped) ── */}
        <motion.div
          style={{ y: wayangRightY, x: wayangRightX }}
          className="absolute -right-4 md:right-8 lg:right-20 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <WayangFigure flip className="w-20 md:w-28 lg:w-36 h-auto text-[hsl(30,25%,18%)] opacity-60" />
        </motion.div>

        {/* ── Floating ornamental elements ── */}
        <motion.div style={{ rotate: ornament1Rotate }} className="absolute top-16 left-[15%] pointer-events-none">
          <WajikOrnament className="w-8 md:w-12 h-auto text-[hsl(36,60%,50%)] opacity-20" />
        </motion.div>
        <motion.div style={{ rotate: ornament2Rotate }} className="absolute bottom-20 right-[18%] pointer-events-none">
          <WajikOrnament className="w-10 md:w-14 h-auto text-[hsl(36,50%,40%)] opacity-15" />
        </motion.div>
        <motion.div style={{ y: ornament3Y }} className="absolute top-1/3 left-[8%] pointer-events-none hidden md:block">
          <CloudMotif className="w-20 h-auto text-[hsl(36,40%,35%)] opacity-10" />
        </motion.div>
        <motion.div style={{ y: ornament4Y, x: cloudX }} className="absolute bottom-1/3 right-[5%] pointer-events-none hidden md:block">
          <CloudMotif className="w-24 h-auto text-[hsl(36,40%,35%)] opacity-10 scale-x-[-1]" />
        </motion.div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[hsl(36,80%,60%)] font-body text-sm tracking-[0.25em] uppercase mb-4">
              Lebih Dari Sekedar Website
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[hsl(40,30%,90%)] leading-tight mb-6">     
              Warisan Budaya
              <br />
              <span className="text-[hsl(36,80%,55%)]">Nusantara</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[hsl(35,15%,65%)] font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-16"    
          >
            Seperti dalang yang menghidupkan cerita melalui wayang, kami menghidupkan
            kembali kisah-kisah peradaban Nusantara melalui sentuhan digital — agar
            warisan nenek moyang terus hidup di hati generasi penerus.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {budayaCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group bg-[hsl(30,20%,14%)] border border-[hsl(36,30%,25%)] rounded-xl p-6 text-left hover:border-[hsl(36,60%,45%,0.4)] transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-[hsl(36,60%,45%,0.12)] flex items-center justify-center mb-4 group-hover:bg-[hsl(36,60%,45%,0.2)] transition-colors">
                  <card.icon className="w-5 h-5 text-[hsl(36,70%,55%)]" />
                </div>
                <h4 className="font-display text-lg font-semibold text-[hsl(40,30%,88%)] mb-2">
                  {card.title}
                </h4>
                <p className="text-[hsl(35,12%,55%)] font-body text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Creator Section ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-24 h-24 bg-gradient-to-br from-primary to-terracotta rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <BookOpen className="w-12 h-12 text-white" />
            </motion.div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Dibuat untuk Indonesia
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              Project ini merupakan bagian dari upaya untuk melestarikan dan menyebarkan pengetahuan
              tentang sejarah Indonesia kepada generasi muda melalui teknologi modern. Dengan
              menggabungkan desain yang menarik dan konten yang berkualitas, kami berharap dapat
              menginspirasi lebih banyak orang untuk mencintai sejarah bangsanya.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground font-body">
                Dikembangkan sebagai project pembelajaran • 2026
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <EyangKu />
      <FooterSection />
    </div>
  );
};

export default AboutPage;
