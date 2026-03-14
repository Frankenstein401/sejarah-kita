import { useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen, ArrowLeft, ArrowRight, Loader2, Mail, Lock, User, Eye, EyeOff,
  CheckCircle2, XCircle, Phone, GraduationCap,
} from "lucide-react";

function getStrength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const map = ["", "Lemah", "Sedang", "Kuat", "Sangat Kuat"];
  const col = ["", "bg-red-500", "bg-amber-500", "bg-emerald-500", "bg-emerald-600"];
  return { score: s, label: map[s] ?? "", color: col[s] ?? "" };
}

const STATUS_OPTIONS = [
  { value: "pelajar", label: "Pelajar / Mahasiswa" },
  { value: "guru",    label: "Guru / Dosen" },
  { value: "umum",    label: "Umum" },
];

const EDUCATION_OPTIONS = ["SD / Sederajat", "SMP / Sederajat", "SMA / Sederajat", "D3 / D4", "S1", "S2 / S3"];
const STEPS = ["Info Diri", "Buat Password"];

// Turnstile site key — ganti dengan key asli dari dash.cloudflare.com/turnstile
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({ name: "", email: "", phone: "", status: "", education: "" });
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<{ reset: () => void }>(null);

  const { register, isRegistering } = useAuth();
  const navigate = useNavigate();

  const strength = useMemo(() => getStrength(password), [password]);
  const passMatch = passwordConfirm.length > 0 && password === passwordConfirm;
  const passMismatch = passwordConfirm.length > 0 && password !== passwordConfirm;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passMismatch || !captchaToken) return;
    try {
      await register({ ...info, password, password_confirmation: passwordConfirm });
      navigate("/");
    } catch {
      turnstileRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-[38%] bg-[hsl(var(--primary))] flex-col justify-between p-12 relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/5" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">SejarahKita</span>
        </div>
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="font-display text-4xl font-bold text-white leading-tight mb-3">
              Mulai Perjalanan<br />Sejarahmu
            </h2>
            <p className="text-white/70 font-body leading-relaxed text-sm">
              Daftar sekarang dan akses ratusan artikel, kuis interaktif, dan peta sejarah Nusantara.
            </p>
          </div>
          <div className="space-y-3">
            {STEPS.map((label, i) => (
              <div key={i} className={`flex items-center gap-3 transition-all ${i === step ? "opacity-100" : "opacity-40"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i < step ? "bg-white text-primary" :
                  i === step ? "bg-white/20 text-white ring-2 ring-white" : "bg-white/10 text-white/50"
                }`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`font-body text-sm ${i === step ? "text-white font-semibold" : "text-white/60"}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 font-body text-xs relative z-10">© 2026 SejarahKita · Gratis selamanya</p>
      </motion.div>

      {/* Right form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors font-body text-sm">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          {/* Mobile steps bar */}
          <div className="flex gap-2 mb-6 lg:hidden">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── Step 1: Info Diri ── */}
            {step === 0 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <div className="mb-6">
                  <p className="text-xs font-body text-primary font-semibold uppercase tracking-wider mb-1">Langkah 1 dari 2</p>
                  <h1 className="font-display text-2xl font-bold">Info Diri</h1>
                  <p className="text-muted-foreground font-body text-sm mt-0.5">
                    Sudah punya akun?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">Masuk</Link>
                  </p>
                </div>
                <form onSubmit={handleInfoSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="font-body">Nama Lengkap</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Contoh: Budi Santoso" className="pl-10 h-11"
                        value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="email" placeholder="nama@contoh.com" className="pl-10 h-11"
                        value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body">Nomor Telepon <span className="text-muted-foreground text-xs">(opsional)</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="tel" placeholder="08xxxxxxxxxx" className="pl-10 h-11"
                        value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body">Status Saat Ini</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {STATUS_OPTIONS.map((opt) => (
                        <button key={opt.value} type="button"
                          onClick={() => setInfo({ ...info, status: opt.value, education: opt.value !== "pelajar" ? "" : info.education })}
                          className={`px-3 py-2.5 rounded-lg border text-xs font-body transition-all text-center leading-tight ${
                            info.status === opt.value
                              ? "border-primary bg-primary/10 text-primary font-semibold"
                              : "border-border hover:border-primary/40 text-muted-foreground"
                          }`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {info.status === "pelajar" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1.5 overflow-hidden">
                      <Label className="font-body flex items-center gap-1.5 text-sm">
                        <GraduationCap className="w-3.5 h-3.5" /> Jenjang Pendidikan
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {EDUCATION_OPTIONS.map((edu) => (
                          <button key={edu} type="button" onClick={() => setInfo({ ...info, education: edu })}
                            className={`px-2 py-2 rounded-lg border text-xs font-body transition-all text-center ${
                              info.education === edu
                                ? "border-primary bg-primary/10 text-primary font-semibold"
                                : "border-border hover:border-primary/40 text-muted-foreground"
                            }`}>
                            {edu}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <Button type="submit" className="w-full h-11 font-body font-semibold gap-2 mt-2"
                    disabled={!info.name || !info.email || !info.status}>
                    Lanjut <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            )}

            {/* ── Step 2: Password + CAPTCHA ── */}
            {step === 1 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <div className="mb-6">
                  <p className="text-xs font-body text-primary font-semibold uppercase tracking-wider mb-1">Langkah 2 dari 2</p>
                  <h1 className="font-display text-2xl font-bold">Buat Password</h1>
                  <p className="text-muted-foreground font-body text-sm mt-0.5">Hampir selesai! Buat password yang kuat.</p>
                </div>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="font-body">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type={showPass ? "text" : "password"} placeholder="Min. 8 karakter"
                        className="pl-10 pr-10 h-11" value={password}
                        onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-muted"}`} />
                          ))}
                        </div>
                        {strength.label && (
                          <p className={`text-xs font-body ${strength.score <= 1 ? "text-red-500" : strength.score === 2 ? "text-amber-500" : "text-emerald-600"}`}>
                            Kekuatan: {strength.label}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body">Konfirmasi Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type={showConfirm ? "text" : "password"} placeholder="Ulangi password"
                        className={`pl-10 pr-10 h-11 transition-colors ${passMatch ? "border-emerald-500" : passMismatch ? "border-red-500" : ""}`}
                        value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                        required autoComplete="new-password" />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passMatch && (
                      <p className="text-xs text-emerald-600 font-body flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Password cocok
                      </p>
                    )}
                    {passMismatch && (
                      <p className="text-xs text-red-500 font-body flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Password tidak cocok
                      </p>
                    )}
                  </div>

                  {/* CAPTCHA */}
                  <div className="flex justify-center pt-1">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setCaptchaToken(token)}
                      onExpire={() => setCaptchaToken(null)}
                      onError={() => setCaptchaToken(null)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="h-11 px-4" onClick={() => setStep(0)}>
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button type="submit" className="flex-1 h-11 font-body font-semibold"
                      disabled={isRegistering || passMismatch || !password || !captchaToken}>
                      {isRegistering
                        ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Membuat akun...</>
                        : "Selesai & Masuk"}
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground font-body">
                    Dengan mendaftar, kamu menyetujui{" "}
                    <span className="text-primary cursor-pointer hover:underline">Syarat & Ketentuan</span> kami.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
