import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit2, Trash2, Eye, Loader2, Calendar, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAdminArticles, useDeleteArticle } from "@/hooks/use-admin";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArticleFormDialog from "@/components/admin/ArticleFormDialog";

export default function AdminArticles() {
  const { data: articles, isLoading } = useAdminArticles();
  const { mutateAsync: deleteArticle } = useDeleteArticle();
  const [search, setSearch] = useState("");
  
  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredArticles = articles?.filter((a: any) => 
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.era.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedArticle(null);
    setFormOpen(true);
  };

  const handleEdit = (article: any) => {
    setSelectedArticle(article);
    setFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-body">Memuat data artikel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Manajemen Artikel</h1>
          <p className="text-sm text-muted-foreground mt-1">Buat, edit, dan kelola konten edukasi sejarah</p>
        </div>
        <Button className="gap-2 rounded-full" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Cari judul atau era..." 
            className="pl-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 rounded-xl border-border">
          <Filter className="w-4 h-4" /> Filter Era
        </Button>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 gap-4">
        {!filteredArticles || filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
             <Layout className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
             <p className="text-muted-foreground">Tidak ada artikel ditemukan</p>
          </div>
        ) : (
          filteredArticles.map((article: any, index: number) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="border-border hover:shadow-md transition-all">
                <CardContent className="p-4 flex gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                    <img src={article.hero_image} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                        {article.era.name}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {article.year}
                      </span>
                      {!article.is_published && (
                        <Badge variant="secondary" className="text-[9px] h-4">Draft</Badge>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-foreground line-clamp-1">{article.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 hidden sm:block">{article.summary}</p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <Button variant="outline" size="sm" className="h-8 px-2.5 gap-1" asChild>
                        <Link to={`/artikel/${article.slug}`}>
                          <Eye className="w-3.5 h-3.5" /> <span className="hidden sm:inline text-xs">Lihat</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 gap-1 text-secondary border-secondary/30 hover:bg-secondary/10"
                        onClick={() => handleEdit(article)}
                      >
                        <Edit2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline text-xs">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => {
                          if(confirm("Hapus artikel ini? Semua kuis dan komentar terkait akan ikut terhapus.")) deleteArticle(article.id);
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline text-xs">Hapus</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* The Form Modal */}
      <ArticleFormDialog 
        open={formOpen} 
        onOpenChange={setFormOpen} 
        article={selectedArticle} 
      />
    </div>
  );
}
