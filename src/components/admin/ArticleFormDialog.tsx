import { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Loader2, Upload, X, Info, Youtube } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useEras } from "@/hooks/use-articles";
import { useCreateArticle, useUpdateArticle, useUploadArticleImage } from "@/hooks/use-admin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ArticleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: any;
}

/* ── Reusable image upload field ── */
function ImageUploadField({
  value,
  onChange,
  label,
  placeholder = "https://... atau upload gambar",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}) {
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadArticleImage();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    onChange(url);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="space-y-1.5">
      {label && <Label className="text-xs">{label}</Label>}
      {value && (
        <div className="relative w-full h-28 rounded-lg overflow-hidden border border-border bg-muted">
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-sm"
        />
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/jpg,image/webp" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-border bg-muted hover:bg-border text-sm text-foreground transition-colors disabled:opacity-50 shrink-0"
        >
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {isUploading ? "Mengunggah..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

/* ── Main Dialog ── */
export default function ArticleFormDialog({ open, onOpenChange, article }: ArticleFormProps) {
  const isEdit = !!article;
  const { data: eras } = useEras();
  const { mutateAsync: createArt, isPending: isCreating } = useCreateArticle();
  const { mutateAsync: updateArt, isPending: isUpdating } = useUpdateArticle();

  const { register, control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      era_id: "",
      year: "",
      summary: "",
      hero_image: "",
      is_published: true,
      sections: [{ heading: "", paragraphs: [""], image_url: "", image_caption: "" }] as any[],
      videos: [] as any[],
    },
  });

  const { fields: sectionFields, append: addSection, remove: removeSection } = useFieldArray({ control, name: "sections" });
  const { fields: videoFields, append: addVideo, remove: removeVideo } = useFieldArray({ control, name: "videos" });

  // Section image URLs tracked separately (react-hook-form doesn't handle nested custom inputs well)
  const [sectionImages, setSectionImages] = useState<{ image_url: string; image_caption: string }[]>([]);

  // Load data when editing
  useEffect(() => {
    if (isEdit && article) {
      reset({
        title: article.title,
        slug: article.slug,
        era_id: article.era_id,
        year: article.year,
        summary: article.summary,
        hero_image: article.hero_image ?? "",
        is_published: article.is_published,
        sections: article.sections?.map((s: any) => ({
          heading: s.heading,
          paragraphs: s.paragraphs,
          image_url: s.image_url ?? "",
          image_caption: s.image_caption ?? "",
        })) || [{ heading: "", paragraphs: [""], image_url: "", image_caption: "" }],
        videos: article.videos || [],
      });
      setSectionImages(
        (article.sections || []).map((s: any) => ({
          image_url: s.image_url ?? "",
          image_caption: s.image_caption ?? "",
        }))
      );
    } else {
      reset({
        title: "", slug: "", era_id: "", year: "", summary: "", hero_image: "",
        is_published: true,
        sections: [{ heading: "", paragraphs: [""], image_url: "", image_caption: "" }],
        videos: [],
      });
      setSectionImages([{ image_url: "", image_caption: "" }]);
    }
  }, [article, isEdit, reset, open]);

  // Keep sectionImages in sync when sections are added/removed
  useEffect(() => {
    setSectionImages((prev) => {
      const next = [...prev];
      while (next.length < sectionFields.length) next.push({ image_url: "", image_caption: "" });
      return next.slice(0, sectionFields.length);
    });
  }, [sectionFields.length]);

  // Auto-generate slug from title (create only)
  const titleValue = watch("title");
  useEffect(() => {
    if (!isEdit && titleValue) {
      setValue("slug", titleValue.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  }, [titleValue, setValue, isEdit]);

  const heroImageValue = watch("hero_image");

  const onSubmit = async (data: any) => {
    try {
      // Merge sectionImages back into sections
      const sections = data.sections.map((s: any, i: number) => ({
        ...s,
        image_url: sectionImages[i]?.image_url || "",
        image_caption: sectionImages[i]?.image_caption || "",
      }));
      const payload = { ...data, sections };
      if (isEdit) {
        await updateArt({ id: article.id, data: payload });
      } else {
        await createArt(payload);
      }
      onOpenChange(false);
    } catch {}
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{isEdit ? "Edit Artikel" : "Tambah Artikel Baru"}</DialogTitle>
          <DialogDescription>
            Isi detail konten edukasi sejarah di bawah ini. Pastikan informasi akurat.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 px-6">
            <Tabs defaultValue="main" className="w-full pb-6">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="main">Info Utama</TabsTrigger>
                <TabsTrigger value="sections">Konten & Foto</TabsTrigger>
                <TabsTrigger value="media">Video YouTube</TabsTrigger>
              </TabsList>

              {/* ── Info Utama ── */}
              <TabsContent value="main" className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Artikel</Label>
                    <Input id="title" {...register("title", { required: true })} placeholder="Contoh: Kejayaan Majapahit" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input id="slug" {...register("slug", { required: true })} placeholder="kejayaan-majapahit" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Era Sejarah</Label>
                    <Select onValueChange={(val) => setValue("era_id", val)} value={watch("era_id")}>
                      <SelectTrigger><SelectValue placeholder="Pilih Era" /></SelectTrigger>
                      <SelectContent>
                        {eras?.map((era: any) => (
                          <SelectItem key={era.id} value={era.id}>{era.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Rentang Tahun</Label>
                    <Input id="year" {...register("year")} placeholder="Contoh: 1293 - 1527" />
                  </div>
                </div>

                <ImageUploadField
                  label="Gambar Utama (Hero)"
                  value={heroImageValue}
                  onChange={(url) => setValue("hero_image", url)}
                />

                <div className="space-y-2">
                  <Label htmlFor="summary">Ringkasan Singkat</Label>
                  <Textarea id="summary" {...register("summary")} placeholder="Jelaskan artikel dalam 2-3 kalimat..." rows={3} />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="published"
                    checked={watch("is_published")}
                    onCheckedChange={(val) => setValue("is_published", val)}
                  />
                  <Label htmlFor="published">Publikasikan langsung</Label>
                </div>
              </TabsContent>

              {/* ── Konten & Foto per Seksi ── */}
              <TabsContent value="sections" className="space-y-6 pt-2">
                {sectionFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border rounded-xl bg-muted/20 space-y-4 relative">
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Label className="text-xs uppercase tracking-wider font-bold">Seksi {index + 1}</Label>

                    <div className="space-y-2 pr-8">
                      <Input {...register(`sections.${index}.heading` as const)} placeholder="Judul Bagian (Sub-heading)" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Isi Paragraf (baris baru = paragraf baru)</Label>
                      <Textarea
                        placeholder="Tulis konten sejarah di sini..."
                        rows={5}
                        onChange={(e) => {
                          const paragraphs = e.target.value.split("\n").filter((p) => p.trim() !== "");
                          setValue(`sections.${index}.paragraphs` as const, paragraphs);
                        }}
                        defaultValue={(field as any).paragraphs?.join("\n") ?? ""}
                      />
                    </div>

                    {/* Per-section image upload */}
                    <ImageUploadField
                      label="Foto untuk Seksi ini (opsional)"
                      value={sectionImages[index]?.image_url ?? ""}
                      onChange={(url) => setSectionImages((prev) => prev.map((s, i) => i === index ? { ...s, image_url: url } : s))}
                      placeholder="https://... atau upload foto seksi"
                    />
                    {sectionImages[index]?.image_url && (
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Keterangan Foto (opsional)</Label>
                        <Input
                          value={sectionImages[index]?.image_caption ?? ""}
                          onChange={(e) => setSectionImages((prev) => prev.map((s, i) => i === index ? { ...s, image_caption: e.target.value } : s))}
                          placeholder="Contoh: Prasasti Yupa, Kalimantan Timur"
                          className="text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  type="button" variant="outline"
                  className="w-full border-dashed gap-2"
                  onClick={() => addSection({ heading: "", paragraphs: [""], image_url: "", image_caption: "" })}
                >
                  <Plus className="w-4 h-4" /> Tambah Seksi Baru
                </Button>
              </TabsContent>

              {/* ── Video YouTube ── */}
              <TabsContent value="media" className="space-y-6 pt-2">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 flex gap-3 mb-4">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Gunakan ID Video saja (misal: <strong>uP46wXW_2yM</strong> dari https://youtube.com/watch?v=uP46wXW_2yM).
                  </p>
                </div>

                {videoFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end p-4 border border-border rounded-lg bg-muted/10">
                    <div className="space-y-2">
                      <Label className="text-xs">YouTube Video ID</Label>
                      <Input {...register(`videos.${index}.youtube_id` as const)} placeholder="uP46wXW_2yM" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Judul Video</Label>
                      <Input {...register(`videos.${index}.title` as const)} placeholder="Judul" />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 space-y-2">
                        <Label className="text-xs">Channel</Label>
                        <Input {...register(`videos.${index}.channel` as const)} placeholder="Nama Channel" />
                      </div>
                      <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeVideo(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button" variant="outline"
                  className="w-full border-dashed gap-2"
                  onClick={() => addVideo({ youtube_id: "", title: "", channel: "" })}
                >
                  <Youtube className="w-4 h-4" /> Tambah Video YouTube
                </Button>
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <DialogFooter className="p-6 border-t border-border bg-muted/10">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" className="gap-2" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? "Simpan Perubahan" : "Buat Artikel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
