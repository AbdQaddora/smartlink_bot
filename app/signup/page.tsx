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

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !storeName.trim() || !email.trim() || !password) {
      setError("يرجى تعبئة جميع الحقول.");
      return;
    }
    if (password.length < 8) {
      setError("كلمة المرور يجب أن تحتوي على 8 خانات على الأقل.");
      return;
    }
    if (!agreed) {
      setError("يجب الموافقة على الشروط والأحكام للمتابعة.");
      return;
    }

    // Demo signup — head straight into onboarding to set the store up.
    setLoading(true);
    router.push("/onboarding");
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-extrabold leading-snug sm:text-[26px]">
        ابدأ أتمتة مبيعاتك اليوم 🚀
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        أنشئ حسابك مجاناً خلال دقيقة وابدأ بربط متجرك.
      </p>

      <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="full-name">الاسم الكامل</Label>
          <Input
            id="full-name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="مثال: أحمد العتيبي"
            aria-invalid={!!error}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="store-name">اسم المتجر</Label>
          <Input
            id="store-name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="مثال: متجر أناقة"
            aria-invalid={!!error}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            dir="ltr"
            className="text-right"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@store.com"
            aria-invalid={!!error}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            dir="ltr"
            className="text-right"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            aria-invalid={!!error}
          />
          <p className="text-xs text-muted-foreground">
            يجب أن تحتوي على 8 خانات على الأقل.
          </p>
        </div>

        {error && (
          <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </p>
        )}

        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-foreground/80">
          <Checkbox
            checked={agreed}
            onCheckedChange={setAgreed}
            className="mt-0.5"
          />
          أوافق على الشروط والأحكام وسياسة الخصوصية
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "جارٍ الإنشاء..." : "إنشاء الحساب وبدء الفترة التجريبية"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </AuthLayout>
  );
}
