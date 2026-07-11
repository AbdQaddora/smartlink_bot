"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  PartyPopper,
  Smartphone,
} from "lucide-react";
import { Brand } from "@/components/auth/brand";
import { Stepper } from "@/components/onboarding/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AUTH_COOKIE } from "@/lib/auth";

const STEPS = ["بيانات المتجر", "سلوك البوت", "ربط الواتساب"];

const ACTIVITY_TYPES = [
  "عبايات",
  "أزياء",
  "إلكترونيات",
  "عطور ومستحضرات",
  "أخرى",
];

const CURRENCIES = [
  "ريال سعودي - SAR",
  "درهم إماراتي - AED",
  "شيكل - ILS",
  "ريال قطري - QAR",
];

type Tone = "saudi" | "fusha" | "egyptian" | "levantine";

const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: "saudi", label: "عامية سعودية" },
  { value: "fusha", label: "فصحى مبسطة" },
  { value: "egyptian", label: "عامية مصرية" },
  { value: "levantine", label: "عامية شامية" },
];

const QR_STEPS = [
  "افتح تطبيق واتساب على جوالك.",
  "انتقل إلى الأجهزة المرتبطة ‹ ربط جهاز.",
  "وجّه الكاميرا نحو الشاشة لمسح الرمز.",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [tone, setTone] = useState<Tone>("saudi");

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const finish = () => {
    // Demo session — matches the login flow. Swap for a real token later.
    document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${60 * 60 * 24}`;
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background px-6 py-10">
      <Brand className="mb-9" />

      <div className="w-full max-w-3xl">
        <Stepper steps={STEPS} current={step} />

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9">
          {/* STEP 1 — store data */}
          {step === 1 && (
            <div>
              <h1 className="text-xl font-extrabold leading-relaxed sm:text-2xl">
                مرحباً بك في سمارت لينك! دعنا نجهّز متجرك أولاً
              </h1>

              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="store-name">اسم المتجر</Label>
                  <Input id="store-name" placeholder="مثال: متجر أناقة" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="activity">نوع النشاط أو المنتجات</Label>
                  <Select defaultValue={ACTIVITY_TYPES[0]}>
                    <SelectTrigger id="activity">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTIVITY_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="currency">العملة المحلية للمتجر</Label>
                  <Select defaultValue={CURRENCIES[0]}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">
                    موقع المتجر{" "}
                    <span className="font-normal text-muted-foreground">
                      (اختياري)
                    </span>
                  </Label>
                  <Input id="location" placeholder="مثال: الرياض، السعودية" />
                </div>
              </div>

              <div className="mt-8 flex justify-start">
                <Button onClick={next} size="lg">
                  التالي: إعداد سلوك البوت
                  <ArrowLeft className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 — bot behavior */}
          {step === 2 && (
            <div>
              <h1 className="text-xl font-extrabold leading-relaxed sm:text-2xl">
                ضبط ذكاء وسلوك البوت
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                هذه الإعدادات ستساعد البوت على فهم كيفية الرد على عملائك تلقائياً.
              </p>

              <div className="mt-7 flex flex-col gap-6">
                <div className="grid gap-2.5">
                  <Label>لهجة الرد المفضلة</Label>
                  <SegmentedControl<Tone>
                    className="w-full [&>button]:flex-1"
                    options={TONE_OPTIONS}
                    value={tone}
                    onChange={setTone}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="delivery-policy">سياسة التوصيل السريعة</Label>
                  <Textarea
                    id="delivery-policy"
                    rows={4}
                    className="min-h-28 leading-loose"
                    placeholder="مثلاً: الشحن خلال 3 أيام، التوصيل بـ 25 ريال داخل المدن الرئيسية."
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button onClick={prev} variant="outline" size="lg">
                  السابق
                </Button>
                <Button onClick={next} size="lg">
                  التالي: ربط الواتساب
                  <ArrowLeft className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 — WhatsApp link */}
          {step === 3 && (
            <div className="text-center">
              <h1 className="text-xl font-extrabold leading-relaxed sm:text-2xl">
                الخطوة الأخيرة: اربط رقم الواتساب الخاص بك
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                امسح رمز الـ QR Code من تطبيق واتساب في جوالك لتفعيل الردود
                المؤتمتة فوراً.
              </p>

              <div className="mt-7 flex justify-center">
                <div className="size-52 rounded-2xl border border-border bg-white p-3.5 shadow-sm">
                  <div
                    className="size-full rounded-lg opacity-90"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg,#0f172a 0 6px,transparent 6px 12px),repeating-linear-gradient(90deg,#0f172a 0 6px,transparent 6px 12px)",
                      backgroundSize: "12px 12px",
                    }}
                  />
                </div>
              </div>

              <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 text-right">
                {QR_STEPS.map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/80">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button onClick={prev} variant="outline" size="lg">
                  السابق
                </Button>
                <Button onClick={finish} size="lg" className="flex-1">
                  <PartyPopper className="size-4" />
                  إنهاء وإدخالي إلى لوحة التحكم
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Contextual footer hint */}
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          {step < 3 ? (
            <>
              <Smartphone className="size-3.5" />
              يمكنك تعديل كل هذه الإعدادات لاحقاً من صفحة الإعدادات.
            </>
          ) : (
            <>
              <MessageCircle className="size-3.5" />
              يبقى اتصال الواتساب فعّالاً طالما جوالك متصل بالإنترنت.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
