"use client";

import { useState } from "react";
import { BrainCircuit, Zap, Power } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SegmentedControl } from "@/components/ui/segmented-control";
import type { BotMode } from "@/lib/data";

const MODE_HINT: Record<BotMode, string> = {
  auto: "يرد البوت تلقائياً على كل المحادثات دون تدخّل.",
  assist: "يقترح البوت الردود وتوافق عليها قبل الإرسال.",
  off: "البوت متوقف — كل المحادثات تُدار يدوياً.",
};

export function BotBehaviorPanel() {
  const [mode, setMode] = useState<BotMode>("auto");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="size-4 text-primary" />
          ذكاء وسلوك البوت
        </CardTitle>
        <CardDescription>
          تحكّم بطريقة تفاعل البوت وشخصيته أثناء الحديث مع الزبائن.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label>وضعية تشغيل البوت</Label>
          <SegmentedControl<BotMode>
            className="w-full [&>button]:flex-1"
            options={[
              { value: "auto", label: "تلقائي", icon: <Zap className="size-4" /> },
              { value: "off", label: "متوقف", icon: <Power className="size-4" /> },
            ]}
            value={mode}
            onChange={setMode}
          />
          <p className="text-xs text-muted-foreground">{MODE_HINT[mode]}</p>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="system-prompt">توجيهات البوت (System Prompt)</Label>
            <span className="text-xs text-muted-foreground">
              يوجّه شخصية البوت وأسلوب ردّه
            </span>
          </div>
          <Textarea
            id="system-prompt"
            rows={9}
            className="min-h-52 leading-loose"
            defaultValue={`أنت مساعد مبيعات ودود لمتجر "متجري".
- رحّب بالزبون بأسلوب لطيف ومختصر.
- اقترح المنتجات المناسبة بناءً على احتياج الزبون.
- وضّح الأسعار وطرق الشحن والدفع بوضوح.
- إذا لم تعرف الإجابة، حوّل المحادثة لصاحب المتجر.
- لا تعد بأي شيء غير موجود في بيانات المتجر.`}
          />
          <p className="text-xs text-muted-foreground">
            نصيحة: كن محدّداً في نبرة الصوت والحدود التي يجب أن يلتزم بها البوت.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
