import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, Search, X, Loader2, FileSearch } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useArticles, useEras } from "@/hooks/use-articles";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BackToTop from "@/components/BackToTop";
import FunFactToast from "@/components/FunFactToast";

const eraColors: Record<string, string> = {
  "hindu-buddha": "bg-primary text-primary-foreground",
  "kesultanan": "bg-[hsl(150,30%,25%)] text-primary-foreground",
  "kolonial": "bg-[hsl(15,60%,45%)] text-primary-foreground",
  "pergerakan": "bg-[hsl(15,60%,45%)] text-primary-foreground",
  "kemerdekaan": "bg-accent text-accent-foreground",
};

const thumbs: Record<string, string> = {
  "kerajaan-kutai": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=70",
  "kerajaan-sriwijaya": "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=70",
  "kerajaan-tarumanagara": "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&q=70",
  "kerajaan-majapahit": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=70",
  "kesultanan-demak": "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=600&q=70",
  "borobudur": "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=70",
  "perlawanan-kolonialisme": "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=600&q=70",
  "kebangkitan-nasional": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
  "proklamasi-kemerdekaan": "https://images.unsplash.com/photo-1530277453888-c78fb77a5e3d?w=600&q=70",
};

const eraFallback: Record<string, string> = {
  "hindu-buddha": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=70",
  "kesultanan": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=70",
  "kolonial": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
  "pergerakan": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=600&q=70",
  "kemerdekaan": "https://images.unsplash.com/photo-1530277453888-c78fb77a5e3d?w=600&q=70",
};

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSlug, setActiveSlug] = useState(searchParams.get("era") || "");
  const [query, setQuery] = useState("");

  const { data: articles, isLoading: loadingArticles } = useArticles();
  const { data: erasData } = useEras();

  const eras = useMemo(() => {
    if (!erasData) return [];
    return erasData.map((e: any) => ({ name: e.name, slug: e.slug }));
  }, [erasData]);

  const filtered = useMemo(() => {
    if (!articles) return [];
    return articles.filter((a: any) => {
      const matchEra = !activeSlug || a.era?.slug === activeSlug;
      const matchQuery =
        query.trim() === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        a.era?.name.toLowerCase().includes(query.toLowerCase());
      return matchEra && matchQuery;
    });
  }, [articles, activeSlug, query]);

  useEffect(() => {
    setSearchParams(activeSlug ? { era: activeSlug } : {});
  }, [activeSlug, setSearchParams]);

  const activeEraName = eras.find((e) => e.slug === activeSlug)?.name;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── Page Header ───────────────────────────────────────── */}
      <section className="pt-24 pb-10 px-6 bg-gradient-warm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
              Perpustakaan Sejarah
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Semua Artikel
            </h1>
            <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
              Jelajahi koleksi lengkap materi sejarah Indonesia dari berbagai era
            </p>
          </motion.div>

          {/* ── Search bar ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative mt-8 max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari artikel, era, tokoh…"
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>

          {/* ── Era filter pills ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            <button
              onClick={() => setActiveSlug("")}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-medium border transition-all duration-200 ${
                !activeSlug
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              Semua
            </button>
            {eras.map((era) => (
              <button
                key={era.slug}
                onClick={() => setActiveSlug(era.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-medium border transition-all duration-200 ${
                  activeSlug === era.slug
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {era.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Article Grid ───────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Result count */}
          {!loadingArticles && (
            <motion.p
              layout
              className="text-xs text-muted-foreground font-body mb-6"
            >
              Menampilkan <span className="text-foreground font-semibold">{filtered.length}</span> artikel
              {query && <> untuk "<span className="text-primary">{query}</span>"</>}
              {activeEraName && <> era <span className="text-primary">{activeEraName}</span></>}
            </motion.p>
          )}

          {/* Loading state */}
          {loadingArticles ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-body text-sm">Memuat perpustakaan...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <FileSearch className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="font-display text-xl font-semibold text-foreground">Artikel tidak ditemukan</p>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    Coba kata kunci atau era yang berbeda
                  </p>
                  <button
                    onClick={() => { setQuery(""); setActiveSlug(""); }}
                    className="mt-4 text-sm text-primary font-body hover:underline"
                  >
                    Reset filter →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  layout
                >
                  <AnimatePresence>
                    {filtered.map((article: any, index: number) => {
                      const imgSrc = thumbs[article.slug] || article.hero_image || eraFallback[article.era?.slug] || "";
                      return (
                        <motion.div
                          key={article.slug}
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.35, delay: index * 0.04 }}
                        >
                          <Link
                            to={`/artikel/${article.slug}`}
                            className="group flex flex-col rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden h-full"
                          >
                            {/* Thumbnail */}
                            {imgSrc && (
                              <div className="h-40 overflow-hidden">
                                <img
                                  src={imgSrc}
                                  alt={article.title}
                                  onError={(e) => (e.currentTarget.style.display = "none")}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-body ${eraColors[article.era?.slug] || "bg-muted text-muted-foreground"}`}
                                >
                                  {article.era?.name}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                                  <Clock className="w-3 h-3" />
                                  {article.year}
                                </span>
                              </div>

                              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed line-clamp-2 flex-1">
                                {article.summary}
                              </p>

                              <span className="text-primary text-sm font-body mt-4 inline-flex items-center gap-1">
                                Baca <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      <FooterSection />
      <BackToTop />
      <FunFactToast />
    </main>
  );
};

export default ArticleList;
