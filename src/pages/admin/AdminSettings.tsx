import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useChangePassword } from "@/hooks/use-admin";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AdminSettings() {
  const { user } = useAuth();
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
    setSuccess(false);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.current_password) errs.current_password = "Masukkan password lama.";
    if (!form.password) errs.password = "Masukkan password baru.";
    else if (form.password.length < 6) errs.password = "Minimal 6 karakter.";
    if (form.password !== form.password_confirmation) errs.password_confirmation = "Password tidak cocok.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await changePassword(form);
      setForm({ current_password: "", password: "", password_confirmation: "" });
      setSuccess(true);
    } catch {
      // error toast handled in hook
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-2xl">
      {/* Title */}
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola akun dan keamanan admin</p>
      </motion.div>

      {/* Profile info card */}
      <motion.div variants={item}>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-body font-semibold">Informasi Profil</CardTitle>
            </div>
            <CardDescription className="text-xs">Data akun yang sedang login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-xl">
                {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
              </div>
              <div>
                <p className="font-semibold text-foreground">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <Badge variant="outline" className="text-[10px] h-5 bg-primary/10 text-primary border-primary/20 px-2">
                    Admin
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Nama</Label>
                <p className="text-sm font-medium text-foreground mt-0.5">{user?.name ?? "—"}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="text-sm font-medium text-foreground mt-0.5">{user?.email ?? "—"}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Role</Label>
                <p className="text-sm font-medium text-foreground mt-0.5 capitalize">{user?.role ?? "—"}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">ID</Label>
                <p className="text-sm font-medium text-foreground mt-0.5 truncate text-[11px] font-mono">{user?.id ?? "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Change password card */}
      <motion.div variants={item}>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-body font-semibold">Ganti Password</CardTitle>
            </div>
            <CardDescription className="text-xs">Pastikan password baru kuat dan mudah diingat</CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-secondary bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-3 mb-4"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                Password berhasil diubah!
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Current password */}
              <div className="space-y-1.5">
                <Label htmlFor="current_password" className="text-xs">Password Lama</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="current_password"
                    type={show.current ? "text" : "password"}
                    placeholder="Password lama"
                    className={`pl-10 pr-10 ${errors.current_password ? "border-destructive" : ""}`}
                    value={form.current_password}
                    onChange={set("current_password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.current_password && <p className="text-xs text-destructive">{errors.current_password}</p>}
              </div>

              {/* New password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs">Password Baru</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={show.new ? "text" : "password"}
                    placeholder="Minimal 6 karakter"
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    value={form.password}
                    onChange={set("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, new: !s.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <Label htmlFor="password_confirmation" className="text-xs">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password_confirmation"
                    type={show.confirm ? "text" : "password"}
                    placeholder="Ulangi password baru"
                    className={`pl-10 pr-10 ${errors.password_confirmation ? "border-destructive" : ""}`}
                    value={form.password_confirmation}
                    onChange={set("password_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password_confirmation && <p className="text-xs text-destructive">{errors.password_confirmation}</p>}
              </div>

              <Button type="submit" className="w-full mt-2" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  "Simpan Password Baru"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
