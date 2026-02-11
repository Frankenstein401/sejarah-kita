import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BookOpen, Target, Users, Sparkles, Code, Palette, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

// Animated Counter Component
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

const AboutPage = () => {
  const stats = [
    { label: "Artikel Sejarah", value: 77, suffix: "+" },
    { label: "Tahun Tercakup", value: 1700, suffix: "+" },
    { label: "Era Peradaban", value: 6, suffix: "" },
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

  const techStack = [
    { name: "React", icon: Code, color: "bg-blue-500" },
    { name: "TypeScript", icon: Code, color: "bg-blue-600" },
    { name: "Tailwind CSS", icon: Palette, color: "bg-cyan-500" },
    { name: "Framer Motion", icon: Zap, color: "bg-purple-500" },
    { name: "Vite", icon: Zap, color: "bg-violet-500" },
    { name: "Shadcn UI", icon: Palette, color: "bg-slate-700" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
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

      {/* Stats Section */}
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

      {/* Mission Cards */}
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
                {/* Animated gradient background on hover */}
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

      {/* Tech Stack */}
      <section className="py-24 px-6 bg-gradient-warm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
              Teknologi Modern
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Tech Stack
            </h2>
            <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
              Dibangun dengan teknologi web terkini untuk pengalaman terbaik
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                className="group relative"
              >
                <div className="flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 cursor-pointer hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <tech.icon className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
                  <span className="font-body font-medium text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Section */}
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

      <FooterSection />
    </div>
  );
};

export default AboutPage;