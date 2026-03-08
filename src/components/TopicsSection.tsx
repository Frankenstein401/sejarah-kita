import { motion } from "framer-motion";
import { Crown, Landmark, Sword, Flag, BookOpen, Users, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTopics } from "@/hooks/use-home";

const iconMap: Record<string, React.ElementType> = {
  crown: Crown,
  temple: Landmark,
  sword: Sword,
  users: Users,
  flag: Flag,
  book: BookOpen,
};

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  inView: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -12, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.5 },
  hover: { opacity: 1, scale: 1.2, transition: { duration: 0.4, ease: "easeOut" } },
};

const shimmerVariants = {
  initial: { x: "-100%", opacity: 0 },
  hover: { x: "100%", opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

const iconVariants = {
  hover: { scale: 1.15, transition: { duration: 0.2, ease: "easeInOut" } },
};

const cornerVariants = {
  initial: { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};


const TopicCard = ({ topic, index }: { topic: any; index: number }) => {
  const Icon = iconMap[topic.icon_name] || BookOpen;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="inView"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/artikel?era=${topic.era?.slug || topic.slug || ""}`}
        className="relative group block p-8 rounded-2xl border border-border bg-card overflow-hidden h-full"
        style={{ isolation: "isolate" }}
      >
        {/* Animated glow background */}
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 rounded-2xl bg-primary/8 pointer-events-none"
        />

        {/* Shimmer sweep */}
        <motion.div
          variants={shimmerVariants}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Border glow */}
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 rounded-2xl ring-1 ring-primary/30 pointer-events-none"
        />

        {/* Corner accent */}
        <motion.div
          variants={cornerVariants}
          className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-3xl rounded-tr-2xl pointer-events-none"
        />

        {/* Icon */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm shadow-primary/10">
          <motion.div variants={iconVariants}>
            <Icon className="w-7 h-7 text-primary" />
          </motion.div>
        </div>

        {/* Text content */}
        <div className="relative z-10">
          <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {topic.title}
          </h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
            {topic.description}
          </p>

          {/* Article count as permanent CTA link */}
          <div className="flex items-center gap-1 text-primary font-body text-sm font-semibold mt-auto pt-2">
            {topic.articles_count !== undefined ? topic.articles_count : "—"} Artikel
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const TopicsSection = () => {
  const { data: topics, isLoading } = useTopics();

  return (
    <section className="py-24 px-6 bg-gradient-warm" id="topics">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
            Topik Pembelajaran
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Jelajahi Materi
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Pilih topik yang ingin kamu pelajari dan mulai perjalanan sejarahmu
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground font-body text-sm">Memuat topik...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics?.map((topic: any, index: number) => (
              <TopicCard key={topic.id} topic={topic} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopicsSection;
