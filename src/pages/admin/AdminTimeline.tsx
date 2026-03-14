import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useEras } from "@/hooks/use-articles";
import {
  useAdminTimeline, useCreateTimeline, useUpdateTimeline, useDeleteTimeline,
} from "@/hooks/use-admin";

type FormValues = {
  era_id: string;
  year: string;
  title: string;
  description: string;
  image_url: string;
  image_caption: string;
  article_slug: string;
  sort_order: number;
};

export default function AdminTimeline() {
  const { data: events, isLoading } = useAdminTimeline();
  const { data: eras } = useEras();
  const createTimeline = useCreateTimeline();
  const updateTimeline = useUpdateTimeline();
  const deleteTimeline = useDeleteTimeline();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormValues>();
  const eraId = watch("era_id");

  const openCreate = () => {
    setEditTarget(null);
    reset({ era_id: "", year: "", title: "", description: "", image_url: "", image_caption: "", article_slug: "", sort_order: 99 });
    setDialogOpen(true);
  };

  const openEdit = (event: any) => {
    setEditTarget(event);
    reset({
      era_id: event.era_id,
      year: event.year,
      title: event.title,
      description: event.description,
      image_url: event.image_url ?? "",
      image_caption: event.image_caption ?? "",
      article_slug: event.article_slug ?? "",
      sort_order: event.sort_order ?? 99,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    const payload = { ...data, sort_order: Number(data.sort_order) };
    if (editTarget) {
      await updateTimeline.mutateAsync({ id: editTarget.id, data: payload });
    } else {
      await createTimeline.mutateAsync(payload);
    }
    setDialogOpen(false);
  };

  const onDelete = async () => {
    if (!deleteTarget) return;
    await deleteTimeline.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  const isPending = createTimeline.isPending || updateTimeline.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Timeline</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Kelola event-event sejarah di timeline</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Event
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-3">
          {events?.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Belum ada event timeline.</p>
            </div>
          )}
          {events?.map((event: any) => (
            <div key={event.id} className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors">
              <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: `hsl(${event.era?.color_hue ?? 0}, 60%, 50%)` }} />
              {event.image_url && (
                <img src={event.image_url} alt={event.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{event.year}</span>
                  {event.era && <span className="text-xs text-muted-foreground">{event.era.name}</span>}
                </div>
                <p className="font-semibold mt-1 truncate">{event.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{event.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => openEdit(event)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setDeleteTarget(event)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editTarget ? "Edit Event" : "Tambah Event Timeline"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Era</Label>
                <Select value={eraId} onValueChange={(v) => setValue("era_id", v)}>
                  <SelectTrigger><SelectValue placeholder="Pilih era" /></SelectTrigger>
                  <SelectContent>
                    {eras?.map((era: any) => (
                      <SelectItem key={era.id} value={era.id}>{era.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Tahun / Periode</Label>
                <Input placeholder="cth: 1293 M" {...register("year", { required: true })} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Judul Event</Label>
              <Input placeholder="cth: Berdirinya Kerajaan Majapahit" {...register("title", { required: true })} />
              {errors.title && <p className="text-xs text-red-500">Wajib diisi</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Deskripsi</Label>
              <Textarea rows={3} placeholder="Ringkasan singkat event..." {...register("description", { required: true })} />
              {errors.description && <p className="text-xs text-red-500">Wajib diisi</p>}
            </div>

            <div className="space-y-1.5">
              <Label>URL Gambar <span className="text-muted-foreground text-xs">(opsional)</span></Label>
              <Input placeholder="https://..." {...register("image_url")} />
            </div>

            <div className="space-y-1.5">
              <Label>Keterangan Gambar <span className="text-muted-foreground text-xs">(opsional)</span></Label>
              <Input placeholder="cth: Prasasti Yupa, Kalimantan Timur" {...register("image_caption")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Slug Artikel Terkait <span className="text-muted-foreground text-xs">(opsional)</span></Label>
                <Input placeholder="cth: kerajaan-majapahit" {...register("article_slug")} />
              </div>
              <div className="space-y-1.5">
                <Label>Urutan</Label>
                <Input type="number" {...register("sort_order")} />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit" disabled={isPending} className="gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {editTarget ? "Simpan Perubahan" : "Buat Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus event ini?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{deleteTarget?.title}</strong> akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
              {deleteTimeline.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
