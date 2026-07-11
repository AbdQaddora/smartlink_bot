"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Lock, User, LogIn, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AUTH_COOKIE,
  DEMO_USERNAME,
  DEMO_PASSWORD,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setLoading(true);
      // Demo session — persists for a day. Swap for a real token later.
      document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${60 * 60 * 24}`;
      router.replace("/");
      router.refresh();
      return;
    }

    setError("اسم المستخدم أو كلمة المرور غير صحيحة.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Store className="size-7" />
          </div>
          <div className="leading-tight">
            <p className="text-xl font-bold">متجري</p>
            <p className="text-sm text-muted-foreground">SmartLink</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-lg font-semibold">تسجيل الدخول</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              أدخل بياناتك للوصول إلى لوحة التحكم.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <LogIn className="size-4" />
              {loading ? "جارٍ الدخول..." : "دخول"}
            </Button>
          </form>

          {/* Demo hint — remove once real auth is wired. */}
          <p className="mt-6 rounded-lg bg-secondary/60 px-3 py-2 text-center text-xs text-muted-foreground">
            بيانات تجريبية: <span className="font-medium text-foreground">admin</span>
            {" / "}
            <span className="font-medium text-foreground">admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
