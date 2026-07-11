"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AUTH_COOKIE, DEMO_USERNAME, DEMO_PASSWORD } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setLoading(true);
      // Demo session — "remember me" persists for a day, otherwise it's a
      // session cookie. Swap for a real token later.
      document.cookie = remember
        ? `${AUTH_COOKIE}=1; path=/; max-age=${60 * 60 * 24}`
        : `${AUTH_COOKIE}=1; path=/`;
      router.replace("/");
      router.refresh();
      return;
    }

    setError("اسم المستخدم أو كلمة المرور غير صحيحة.");
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-extrabold leading-snug sm:text-[26px]">
        مرحباً بك مجدداً في سمارت لينك 👋
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        أدخل بياناتك لتسجيل الدخول ومتابعة أداء متجرك.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            dir="ltr"
            className="text-right"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="you@store.com"
            aria-invalid={!!error}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">كلمة المرور</Label>
            <Link
              href="#"
              className="text-xs font-semibold text-primary hover:underline"
            >
              هل نسيت كلمة المرور؟
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            dir="ltr"
            className="text-right"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            aria-invalid={!!error}
          />
        </div>

        {error && (
          <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </p>
        )}

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80">
          <Checkbox checked={remember} onCheckedChange={setRemember} />
          تذكرني على هذا الجهاز
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>

      {/* Demo hint — remove once real auth is wired. */}
      <p className="mt-5 rounded-lg bg-secondary/60 px-3 py-2 text-center text-xs text-muted-foreground">
        بيانات تجريبية: <span className="font-medium text-foreground">admin</span>
        {" / "}
        <span className="font-medium text-foreground">admin</span>
      </p>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        ليس لديك حساب؟{" "}
        <Link href="/signup" className="font-bold text-primary hover:underline">
          إنشاء حساب جديد
        </Link>
      </p>
    </AuthLayout>
  );
}
