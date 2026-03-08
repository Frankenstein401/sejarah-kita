import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, ChevronRight, ImageOff, Play, X, Loader2 } from "lucide-react";
import ArticleReader from "@/components/ArticleReader";
import { useState, useEffect } from "react";
import { useArticleDetail } from "@/hooks/use-articles";
import ArticleQuiz from "@/components/ArticleQuiz";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTop from "@/components/BackToTop";
import FunFactToast from "@/components/FunFactToast";
import FooterSection from "@/components/FooterSection";
import ArticleDiscussion from "@/components/ArticleDiscussion";

const eraFallback: Record<string, string> = {
  "hindu-buddha": "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
  "kesultanan": "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=1200&q=80",
  "kolonial": "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=1200&q=80",
  "pergerakan": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80",
  "kemerdekaan": "https://images.unsplash.com/photo-1530277453888-c78fb77a5e3d?w=1200&q=80",
};

const eraColors: Record<string, string> = {
  "hindu-buddha": "bg-primary text-primary-foreground",
  "kesultanan": "bg-[hsl(150,30%,25%)] text-primary-foreground",
  "kolonial": "bg-[hsl(15,60%,45%)] text-primary-foreground",
  "pergerakan": "bg-[hsl(15,60%,45%)] text-primary-foreground",
  "kemerdekaan": "bg-accent text-accent-foreground",
};

const ArticleImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <ImageOff className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`object-cover rounded-lg ${className}`}
    />
  );
};

const ArticleNavbar = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"     
  >
    <div className="max-w-6xl mx-auto px-6 flex items-center h-14">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <BookOpen className="w-5 h-5 text-primary" />
        <span className="font-display font-bold text-lg text-foreground">SejarahKita</span>
      </Link>
    </div>
  </motion.nav>
);

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticleDetail(slug || "");
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-body">Membuka catatan sejarah...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Artikel Tidak Ditemukan</h1>
          <Link to="/" className="text-primary font-body hover:underline">← Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const heroSrc = article.hero_image || eraFallback[article.era?.slug] || "";
  const hasVideo = article.videos && article.videos.length > 0;
  const related = article.relatedArticles || [];
  const quiz = article.quiz;

  return (
    <main className="min-h-screen bg-background">
      <ArticleNavbar />

      {/* ── Hero Image ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative h-80 md:h-[28rem] w-full overflow-hidden mt-14 ${hasVideo ? "cursor-pointer group" : ""}`}
        onClick={() => hasVideo && setVideoOpen(true)}
        role={hasVideo ? "button" : undefined}
      >
        <ArticleImage src={heroSrc} alt={article.title} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-6 left-6 z-[2]">
          <span className={`text-xs px-3 py-1 rounded-full font-body ${eraColors[article.era?.slug] || "bg-muted text-muted-foreground"}`}>
            {article.era?.name}
          </span>
        </div>
        {hasVideo && (
          <div className="absolute bottom-6 right-6 z-[2]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 group-hover:bg-primary/80 backdrop-blur-sm border border-white/20 text-white text-xs font-body transition-colors duration-300">
              <Play className="w-3 h-3" fill="currentColor" />
              Tonton Video
            </span>
          </div>
        )}
      </motion.div>

      {/* ── Video Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {videoOpen && hasVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"        
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${article.videos[0].youtube_id}?autoplay=1&rel=0`}
                  title={article.videos[0].title}
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="px-4 py-3 bg-card">
                <p className="font-body text-sm font-semibold text-foreground line-clamp-1">{article.videos[0].title}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{article.videos[0].channel}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Article Header ───────────────────────────────────────────── */}
      <section className="pb-10 px-6">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/artikel" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary font-body text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Semua Artikel
            </Link>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="flex items-center gap-1 text-muted-foreground text-sm font-body">
                <Clock className="w-3.5 h-3.5" /> {article.year}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">{article.title}</h1>
            <p className="text-muted-foreground font-body text-lg mt-4 leading-relaxed">{article.summary}</p>
            <div className="mt-8 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
            <div className="mt-6">
              <ArticleReader sections={article.sections} title={article.title} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Content ──────────────────────────────────────────── */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {article.sections?.map((section: any, index: number) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">        
                <span className="w-1 h-6 bg-primary rounded-full inline-block shrink-0" />
                {section.heading}
              </h2>
              {section.paragraphs?.map((p: string, i: number) => (
                <p key={i} className="text-foreground/85 font-body leading-relaxed mb-4 text-base">{p}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Quiz Section ────────────────────────────────────────────── */}
      {quiz && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10" />
              <ArticleQuiz key={article.slug} quiz={quiz} articleTitle={article.title} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Discussion Section ──────────────────────────────────────── */}
      <ArticleDiscussion slug={article.slug} articleTitle={article.title} />

      {/* ── Related Articles ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-card border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Artikel Terkait
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r: any) => (
                <Link key={r.slug} to={`/artikel/${r.slug}`} className="group rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all bg-background overflow-hidden">
                  {r.hero_image && (
                    <div className="h-32 overflow-hidden">
                      <ArticleImage src={r.hero_image} alt={r.title} className="w-full h-full transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{r.era?.name}</span>
                    <h4 className="font-display text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">{r.title}</h4>
                    <p className="text-muted-foreground text-sm font-body mt-1 line-clamp-2">{r.summary}</p>
                    <span className="text-primary text-sm font-body mt-2 inline-flex items-center gap-1">
                      Baca selengkapnya <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
      <ReadingProgressBar />
      <BackToTop />
      <FunFactToast />
    </main>
  );
};

export default ArticleDetail;
