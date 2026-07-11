"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Store, User, Lock, UserPlus, AlertCircle } from "lucide-react";
import { Brand } from "@/components/auth/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!storeName.trim() || !username.trim() || !password) {
      setError("يرجى تعبئة جميع الحقول المطلوبة.");
      return;
    }
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }
    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    // Demo signup — head straight into onboarding to set the store up.
    setLoading(true);
    router.push("/onboarding");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="mb-8 flex justify-center">
          <Brand />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-lg font-semibold">إنشاء حساب جديد</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              أنشئ متجرك على سمارت لينك في دقائق.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="store-name">
                <Store className="size-4 text-muted-foreground" />
                اسم المتجر
              </Label>
              <Input
                id="store-name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="مثال: متجر أناقة"
                aria-invalid={!!error}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">
                <User className="size-4 text-muted-foreground" />
                اسم المستخدم
              </Label>
              <Input
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                aria-invalid={!!error}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">
                <Lock className="size-4 text-muted-foreground" />
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                aria-invalid={!!error}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm">
                <Lock className="size-4 text-muted-foreground" />
                تأكيد كلمة المرور
              </Label>
              <Input
                id="confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••"
                aria-invalid={!!error}
              />
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              <UserPlus className="size-4" />
              {loading ? "جارٍ الإنشاء..." : "إنشاء الحساب والمتابعة"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
