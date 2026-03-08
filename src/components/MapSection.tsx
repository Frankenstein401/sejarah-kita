import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapLocations } from "@/hooks/use-home";

const eraColors: Record<string, string> = {
  "hindu-buddha": "hsl(36, 80%, 50%)",
  "kesultanan": "hsl(150, 30%, 25%)",
  "kolonial": "hsl(15, 60%, 45%)",
  "pergerakan": "hsl(15, 60%, 45%)",
  "kemerdekaan": "hsl(0, 70%, 50%)",
};

const eraBadgeClass: Record<string, string> = {
  "hindu-buddha": "bg-primary text-primary-foreground",
  "kesultanan": "bg-secondary text-secondary-foreground",
  "kolonial": "bg-accent text-accent-foreground",
  "pergerakan": "bg-accent text-accent-foreground",
  "kemerdekaan": "bg-destructive text-destructive-foreground",
};

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const { data: locations, isLoading } = useMapLocations();

  useEffect(() => {
    if (!mapRef.current || !locations || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 10,
        minZoom: 4,
      }
    ).addTo(map);

    L.control.attribution({ position: "bottomright" }).addTo(map);

    locations.forEach((loc: any) => {
      const color = loc.color || eraColors[loc.era?.slug] || "hsl(36,80%,50%)";

      const icon = L.divIcon({
        className: "custom-map-marker",
        html: `
          <div style="
            width: 28px; height: 28px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            cursor: pointer;
            transition: transform 0.2s;
          "></div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([loc.latitude, loc.longitude], { icon }).addTo(map);

      marker.bindTooltip(loc.name, {
        permanent: false,
        direction: "top",
        offset: [0, -16],
        className: "map-tooltip",
      });

      marker.on("click", () => {
        setSelected(loc);
      });
    });

    leafletMap.current = map;

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, [locations]);

  return (
    <section className="py-24 px-6 bg-background relative" id="peta">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
            Jelajahi Nusantara
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Peta Sejarah Indonesia
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Temukan lokasi kerajaan-kerajaan dan peristiwa bersejarah yang
            membentuk peradaban Indonesia
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.entries(eraColors).map(([era, color]) => (
            <div key={era} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-border"
                style={{ background: color }}
              />
              <span className="text-xs font-body text-muted-foreground uppercase">
                {era}
              </span>
            </div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl overflow-hidden border border-border shadow-lg"
        >
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          )}
          <div
            ref={mapRef}
            className="w-full h-[450px] md:h-[550px] relative z-0"
            style={{ background: "hsl(var(--card))" }}
          />
        </motion.div>
      </div>

      {/* Info popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl max-w-sm w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2.5 py-0.5 rounded-full ${eraBadgeClass[selected.era?.slug] || "bg-primary text-primary-foreground"}`}>
                  {selected.era?.name}
                </span>
                <span className="text-sm font-body text-muted-foreground">
                  {selected.year}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <h3 className="font-display text-xl font-bold text-foreground">
                  {selected.name}
                </h3>
              </div>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {selected.description}
              </p>

              {selected.article_slug && (
                <Link
                  to={`/artikel/${selected.article_slug}`}
                  className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setSelected(null)}
                >
                  <BookOpen className="w-4 h-4" />
                  Baca artikel lengkap
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MapSection;
