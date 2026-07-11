"use client";

import { useState } from "react";
import { SlidersHorizontal, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PolicyToggle {
  id: string;
  title: string;
  onText: string;
  offText: string;
}

const TOGGLES: PolicyToggle[] = [
  {
    id: "auto-reply",
    title: "الرد التلقائي",
    onText: "البوت يرد فوراً على رسائل الزبائن.",
    offText: "الردود متوقفة — يتطلب تدخلاً يدوياً.",
  },
  {
    id: "suggest-products",
    title: "اقتراح المنتجات",
    onText: "يقترح البوت منتجات مناسبة أثناء المحادثة.",
    offText: "لن يقترح البوت أي منتجات تلقائياً.",
  },
  {
    id: "order-notifications",
    title: "إشعارات الطلبات",
    onText: "تصلك إشعارات فورية عند وجود نيّة شراء.",
    offText: "لن تصلك إشعارات عن الطلبات المحتملة.",
  },
];

export function PoliciesPanel() {
  const [state, setState] = useState<Record<string, boolean>>({
    "auto-reply": true,
    "suggest-products": true,
    "order-notifications": false,
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            السياسات والتشغيل
          </CardTitle>
          <CardDescription>
            فعّل أو عطّل سلوكيات البوت الأساسية حسب حاجتك.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {TOGGLES.map((t) => {
            const active = state[t.id];
            return (
              <div
                key={t.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="space-y-0.5">
                  <Label htmlFor={t.id} className="cursor-pointer">
                    {t.title}
                  </Label>
                  <p
                    className={cn(
                      "text-xs transition-colors",
                      active
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {active ? t.onText : t.offText}
                  </p>
                </div>
                <Switch
                  id={t.id}
                  checked={active}
                  onCheckedChange={(v) =>
                    setState((s) => ({ ...s, [t.id]: v }))
                  }
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            سياسات الشحن والتوصيل
          </CardTitle>
          <CardDescription>
            يستخدمها البوت للإجابة عن أسئلة التوصيل والإرجاع.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={5}
            className="min-h-32 leading-loose"
            placeholder="مثال: التوصيل خلال ٢-٤ أيام عمل، مجاني للطلبات فوق ٢٠٠ ر.س، والإرجاع متاح خلال ٧ أيام..."
            defaultValue={
              "• التوصيل خلال ٢-٤ أيام عمل داخل المدن الرئيسية.\n• الشحن مجاني للطلبات فوق ٢٠٠ ر.س.\n• الإرجاع متاح خلال ٧ أيام من الاستلام."
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
