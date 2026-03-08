import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Trash2, Pencil, MapPin, Loader2, X, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
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
  useAdminMapLocations,
  useCreateMapLocation,
  useUpdateMapLocation,
  useDeleteMapLocation,
} from "@/hooks/use-admin";

const PRESET_COLORS = [
  "#e8891a", // orange (hindu-buddha)
  "#2d6a4f", // green (kesultanan)
  "#c0612b", // brown (kolonial)
  "#e63946", // red (kemerdekaan)
  "#457b9d", // blue
  "#9b5de5", // purple
  "#f72585", // pink
];

function buildIcon(color: string, isActive = false) {
  const size = isActive ? 36 : 28;
  return L.divIcon({
    className: "custom-map-marker",
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:${isActive ? "4px" : "3px"} solid white;
      border-radius:50%;
      box-shadow:0 2px 10px rgba(0,0,0,0.5);
      cursor:pointer;
      transition:transform 0.15s;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

interface LocationForm {
  name: string;
  era_id: string;
  year: string;
  description: string;
  color: string;
  article_slug: string;
  latitude: number;
  longitude: number;
}

export default function AdminMapEditor() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const pendingMarkerRef = useRef<L.Marker | null>(null);

  const { data: locations = [], isLoading } = useAdminMapLocations();
  const { data: eras = [] } = useEras();
  const { mutateAsync: createLocation, isPending: isCreating } = useCreateMapLocation();
  const { mutateAsync: updateLocation, isPending: isUpdating } = useUpdateMapLocation();
  const { mutateAsync: deleteLocation } = useDeleteMapLocation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const { register, handleSubmit, reset, setValue, watch } = useForm<LocationForm>({
    defaultValues: { name: "", era_id: "", year: "", description: "", color: PRESET_COLORS[0], article_slug: "", latitude: 0, longitude: 0 },
  });

  const watchedColor = watch("color");

  // Init map once
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      scrollWheelZoom: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18,
      minZoom: 3,
    }).addTo(map);

    leafletMap.current = map;

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  // Map click handler (add mode)
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      if (!addMode) return;

      // Remove previous pending marker
      if (pendingMarkerRef.current) {
        pendingMarkerRef.current.remove();
      }

      const { lat, lng } = e.latlng;

      const marker = L.marker([lat, lng], {
        icon: buildIcon("#ffffff"),
        draggable: true,
      }).addTo(map);

      pendingMarkerRef.current = marker;

      setValue("latitude", parseFloat(lat.toFixed(6)));
      setValue("longitude", parseFloat(lng.toFixed(6)));
      setEditingId(null);
      reset({ name: "", era_id: "", year: "", description: "", color: PRESET_COLORS[0], article_slug: "", latitude: parseFloat(lat.toFixed(6)), longitude: parseFloat(lng.toFixed(6)) });
      setSelectedColor(PRESET_COLORS[0]);
      setDialogOpen(true);
      setAddMode(false);
    };

    map.on("click", handleClick);
    return () => { map.off("click", handleClick); };
  }, [addMode, reset, setValue]);

  // Render existing markers
  useEffect(() => {
    const map = leafletMap.current;
    if (!map || !locations.length) return;

    // Remove stale markers
    markersRef.current.forEach((marker, id) => {
      if (!locations.find((l: any) => l.id === id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    locations.forEach((loc: any) => {
      const color = loc.color || "#e8891a";

      if (markersRef.current.has(loc.id)) {
        // Update icon color in case it changed
        markersRef.current.get(loc.id)!.setIcon(buildIcon(color));
        return;
      }

      const marker = L.marker([loc.latitude, loc.longitude], {
        icon: buildIcon(color),
        draggable: true,
      }).addTo(map);

      marker.bindTooltip(loc.name, {
        permanent: false,
        direction: "top",
        offset: [0, -16],
        className: "map-tooltip",
      });

      // Click → open edit
      marker.on("click", () => {
        setEditingId(loc.id);
        setSelectedColor(loc.color || PRESET_COLORS[0]);
        reset({
          name: loc.name,
          era_id: loc.era_id,
          year: loc.year,
          description: loc.description,
          color: loc.color || PRESET_COLORS[0],
          article_slug: loc.article_slug || "",
          latitude: parseFloat(loc.latitude),
          longitude: parseFloat(loc.longitude),
        });
        setDialogOpen(true);
      });

      // Drag → update coords in form & auto-save
      marker.on("dragend", async () => {
        const { lat, lng } = marker.getLatLng();
        await updateLocation({ id: loc.id, data: { latitude: parseFloat(lat.toFixed(6)), longitude: parseFloat(lng.toFixed(6)) } });
      });

      markersRef.current.set(loc.id, marker);
    });
  }, [locations, reset, updateLocation]);

  // Change cursor when in add mode
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;
    const container = map.getContainer();
    container.style.cursor = addMode ? "crosshair" : "";
  }, [addMode]);

  const onSubmit = async (data: LocationForm) => {
    const payload = { ...data, color: selectedColor };
    try {
      if (editingId) {
        await updateLocation({ id: editingId, data: payload });
      } else {
        await createLocation(payload);
        pendingMarkerRef.current?.remove();
        pendingMarkerRef.current = null;
      }
      setDialogOpen(false);
    } catch {}
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      if (!editingId) {
        pendingMarkerRef.current?.remove();
        pendingMarkerRef.current = null;
      }
    }
    setDialogOpen(open);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteLocation(deleteId);
    const marker = markersRef.current.get(deleteId);
    if (marker) {
      marker.remove();
      markersRef.current.delete(deleteId);
    }
    setDeleteId(null);
    setDialogOpen(false);
  };

  const isLoading_ = isCreating || isUpdating;

  return (
    <div className="flex flex-col h-full gap-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Editor Peta Sejarah</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{locations.length} lokasi terdaftar</p>
        </div>
        <Button
          onClick={() => setAddMode(true)}
          className="gap-2"
          variant={addMode ? "secondary" : "default"}
        >
          {addMode ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {addMode ? "Batalkan" : "Tambah Lokasi"}
        </Button>
      </div>

      {/* Instruction banner */}
      {addMode && (
        <div className="flex items-center gap-2 mb-3 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary">
          <MapPin className="w-4 h-4 shrink-0" />
          Klik di peta untuk menandai lokasi baru
        </div>
      )}

      {!addMode && (
        <div className="flex items-center gap-2 mb-3 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-muted-foreground">
          <Info className="w-4 h-4 shrink-0" />
          Klik pin untuk edit · Drag pin untuk pindahkan posisi · Tombol "Tambah Lokasi" untuk pin baru
        </div>
      )}

      {/* Map */}
      <div className="relative rounded-xl overflow-hidden border border-border flex-1 min-h-[500px]">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Location list */}
      {locations.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {locations.map((loc: any) => (
            <div
              key={loc.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
            >
              <span
                className="w-4 h-4 rounded-full shrink-0 border-2 border-white shadow"
                style={{ background: loc.color || "#e8891a" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{loc.name}</p>
                <p className="text-xs text-muted-foreground">{loc.year} · {loc.era?.name}</p>
              </div>
              <div className="flex gap-1">
                <button
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors"
                  onClick={() => {
                    setEditingId(loc.id);
                    setSelectedColor(loc.color || PRESET_COLORS[0]);
                    reset({
                      name: loc.name, era_id: loc.era_id, year: loc.year,
                      description: loc.description, color: loc.color || PRESET_COLORS[0],
                      article_slug: loc.article_slug || "",
                      latitude: parseFloat(loc.latitude), longitude: parseFloat(loc.longitude),
                    });
                    setDialogOpen(true);
                  }}
                >
                  <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  className="w-7 h-7 flex items-center justify-center rounded hover:bg-destructive/10 transition-colors"
                  onClick={() => setDeleteId(loc.id)}
                >
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Lokasi" : "Tambah Lokasi Baru"}</DialogTitle>
            <DialogDescription>
              {editingId
                ? "Perbarui detail lokasi sejarah ini."
                : "Isi detail untuk lokasi yang baru ditandai di peta."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nama Lokasi</Label>
              <Input {...register("name", { required: true })} placeholder="Cth: Kerajaan Majapahit" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Era Sejarah</Label>
                <Select onValueChange={(v) => setValue("era_id", v)} value={watch("era_id")}>
                  <SelectTrigger><SelectValue placeholder="Pilih Era" /></SelectTrigger>
                  <SelectContent>
                    {(eras as any[]).map((era) => (
                      <SelectItem key={era.id} value={era.id}>{era.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Rentang Tahun</Label>
                <Input {...register("year", { required: true })} placeholder="1293 – 1527" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Deskripsi Singkat</Label>
              <Textarea {...register("description", { required: true })} placeholder="Jelaskan lokasi ini..." rows={3} />
            </div>

            <div className="space-y-1.5">
              <Label>Warna Pin</Label>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      background: c,
                      borderColor: selectedColor === c ? "white" : "transparent",
                      boxShadow: selectedColor === c ? `0 0 0 2px ${c}` : "none",
                    }}
                  />
                ))}
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-7 h-7 rounded-full cursor-pointer border border-border p-0.5 bg-transparent"
                  title="Warna kustom"
                />
                <span className="text-xs text-muted-foreground font-mono">{selectedColor}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs">Slug Artikel (opsional)</Label>
              <Input {...register("article_slug")} placeholder="contoh: kejayaan-majapahit" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-xs">Latitude</Label>
                <Input type="number" step="any" {...register("latitude", { valueAsNumber: true })} readOnly className="bg-muted text-xs" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-xs">Longitude</Label>
                <Input type="number" step="any" {...register("longitude", { valueAsNumber: true })} readOnly className="bg-muted text-xs" />
              </div>
            </div>

            <DialogFooter className="gap-2">
              {editingId && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => { setDeleteId(editingId); setDialogOpen(false); }}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Hapus
                </Button>
              )}
              <div className="flex-1" />
              <Button type="button" variant="ghost" onClick={() => handleDialogClose(false)}>Batal</Button>
              <Button type="submit" disabled={isLoading_} className="gap-2">
                {isLoading_ && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? "Simpan" : "Tambahkan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Lokasi?</AlertDialogTitle>
            <AlertDialogDescription>
              Lokasi ini akan dihapus dari peta sejarah secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
