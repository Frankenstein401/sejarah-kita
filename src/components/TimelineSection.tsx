import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
}

const events: TimelineEvent[] = [
  {
    year: "Abad ke-4",
    title: "Kerajaan Kutai",
    era: "Hindu-Buddha",
    description: "Kerajaan Hindu tertua di Indonesia, terletak di Kalimantan Timur. Dikenal melalui prasasti Yupa peninggalan Raja Mulawarman.",
  },
  {
    year: "Abad ke-7",
    title: "Kerajaan Sriwijaya",
    era: "Hindu-Buddha",
    description: "Kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang. Pusat perdagangan dan pendidikan agama Buddha.",
  },
  {
    year: "Abad ke-8",
    title: "Pembangunan Borobudur",
    era: "Hindu-Buddha",
    description: "Candi Buddha terbesar di dunia dibangun oleh Dinasti Syailendra. Mahakarya arsitektur yang menjadi kebanggaan Indonesia.",
  },
  {
    year: "1293",
    title: "Kerajaan Majapahit",
    era: "Hindu-Buddha",
    description: "Kerajaan terbesar di Nusantara di bawah Mahapatih Gajah Mada, dengan Sumpah Palapa yang menyatukan wilayah Nusantara.",
  },
  {
    year: "Abad ke-15",
    title: "Kesultanan Islam Nusantara",
    era: "Kesultanan",
    description: "Penyebaran Islam meluas dengan berdirinya Kesultanan Demak, Ternate, dan Tidore sebagai pusat kekuasaan baru.",
  },
  {
    year: "1908",
    title: "Kebangkatan Nasional",
    era: "Pergerakan",
    description: "Budi Utomo didirikan sebagai organisasi modern pertama, menandai era pergerakan nasional menuju kemerdekaan.",
  },
  {
    year: "1928",
    title: "Sumpah Pemuda",
    era: "Pergerakan",
    description: "Pemuda dari berbagai suku bersumpah satu tanah air, satu bangsa, dan satu bahasa: Indonesia.",
  },
  {
    year: "1945",
    title: "Proklamasi Kemerdekaan",
    era: "Kemerdekaan",
    description: "Soekarno dan Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945, lahirnya Republik Indonesia.",
  },
];

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  const eraColors: Record<string, string> = {
    "Hindu-Buddha": "bg-primary",
    "Kesultanan": "bg-forest",
    "Pergerakan": "bg-terracotta",
    "Kemerdekaan": "bg-accent",
  };

  return (
    <div ref={ref} className={`flex items-center w-full mb-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}
      >
        <motion.div
          whileHover={{ 
            scale: 1.05,
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.98 }}
          className="relative group bg-card p-6 rounded-lg border border-border cursor-pointer overflow-hidden"
        >
          {/* Gradient glow on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.3 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${
              eraColors[event.era] === "bg-primary" 
                ? "from-primary/20 via-transparent to-gold/10" 
                : eraColors[event.era] === "bg-forest"
                ? "from-forest/20 via-transparent to-primary/10"
                : eraColors[event.era] === "bg-terracotta"
                ? "from-terracotta/20 via-transparent to-accent/10"
                : "from-accent/20 via-transparent to-primary/10"
            } blur-xl`}
          />

          {/* Shimmer effect */}
          <motion.div
            initial={{ x: isLeft ? "-100%" : "100%" }}
            whileHover={{ x: isLeft ? "100%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* Border glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 rounded-lg border-2 ${
              eraColors[event.era] === "bg-primary" 
                ? "border-primary/40" 
                : eraColors[event.era] === "bg-forest"
                ? "border-forest/40"
                : eraColors[event.era] === "bg-terracotta"
                ? "border-terracotta/40"
                : "border-accent/40"
            }`}
          />

          <div className="relative z-10">
            {/* Badge & Year */}
            <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={`text-xs px-2 py-0.5 rounded-full text-primary-foreground ${eraColors[event.era] || "bg-muted"} group-hover:shadow-lg transition-shadow`}
              >
                {event.era}
              </motion.span>
              <span className="text-sm font-body text-muted-foreground group-hover:text-foreground transition-colors">
                {event.year}
              </span>
            </div>

            {/* Title with gradient on hover */}
            <motion.h3
              whileHover={{ x: isLeft ? -4 : 4 }}
              transition={{ duration: 0.3 }}
              className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
            >
              {event.title}
            </motion.h3>

            {/* Description */}
            <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
              {event.description}
            </p>

            {/* Read more indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mt-3 flex items-center gap-1 text-xs text-primary font-medium ${isLeft ? "md:justify-end" : ""}`}
            >
              <span>Baca selengkapnya</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Corner decoration */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            whileHover={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.4 }}
            className={`absolute ${isLeft ? "top-0 right-0" : "top-0 left-0"} w-16 h-16 ${
              eraColors[event.era] === "bg-primary" 
                ? "bg-primary/20" 
                : eraColors[event.era] === "bg-forest"
                ? "bg-forest/20"
                : eraColors[event.era] === "bg-terracotta"
                ? "bg-terracotta/20"
                : "bg-accent/20"
            } ${isLeft ? "rounded-bl-full" : "rounded-br-full"}`}
          />
        </motion.div>
      </motion.div>

      {/* Timeline dot with pulse animation */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative"
        >
          {/* Pulse ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-4 h-4 bg-primary rounded-full -m-0"
          />
          
          {/* Main dot */}
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg shadow-primary/20" />
        </motion.div>
      </div>

      <div className="hidden md:block w-5/12" />
    </div>
  );
};

const TimelineSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Perjalanan Waktu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Linimasa Sejarah
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Ikuti perjalanan panjang peradaban Indonesia dari era kerajaan hingga kemerdekaan
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="timeline-line hidden md:block origin-top"
          />
          
          {events.map((event, index) => (
            <TimelineItem key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;