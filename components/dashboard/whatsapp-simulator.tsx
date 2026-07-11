"use client";

import { useState } from "react";
import { Send, Phone, MoreVertical, ArrowLeft, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SimMessage {
  sender: "customer" | "bot";
  text: string;
  time: string;
}

const INITIAL: SimMessage[] = [
  { sender: "customer", text: "مرحبا، وش عندكم عروض اليوم؟", time: "١٢:٠١" },
  {
    sender: "bot",
    text: "أهلاً وسهلاً 👋 عندنا خصم ١٥٪ على السماعات هذا الأسبوع! تحب أرسل لك التفاصيل؟",
    time: "١٢:٠١",
  },
];

/**
 * WhatsApp sandbox — a live preview of how the bot replies. Sticky on
 * the left so it stays visible while editing settings on the right.
 */
export function WhatsAppSimulator() {
  const [messages, setMessages] = useState<SimMessage[]>(INITIAL);
  const [draft, setDraft] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { sender: "customer", text, time: "الآن" },
      {
        sender: "bot",
        text: "تمام! هذا رد تجريبي من البوت بناءً على إعداداتك الحالية 🌿",
        time: "الآن",
      },
    ]);
    setDraft("");
  };

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
        <Bot className="size-4 text-primary" />
        <p className="text-sm font-semibold">بيئة تجربة البوت</p>
        <span className="mr-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          مباشر
        </span>
      </div>

      {/* Phone frame */}
      <div className="p-4">
        <div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border-4 border-slate-800 bg-slate-800 shadow-xl">
          {/* WA header */}
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <ArrowLeft className="size-4 opacity-80" />
            <div className="flex size-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
              م
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold">متجري</p>
              <p className="truncate text-[11px] text-white/70">متصل الآن</p>
            </div>
            <Phone className="size-4 opacity-80" />
            <MoreVertical className="size-4 opacity-80" />
          </div>

          {/* Messages */}
          <div className="wa-canvas flex h-[34rem] flex-col gap-2 overflow-y-auto scrollbar-thin p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.sender === "customer" ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-[13px] leading-relaxed shadow-sm",
                    m.sender === "customer"
                      ? "rounded-tr-none bg-white text-slate-800"
                      : "rounded-tl-none bg-[#DCF8C6] text-slate-800"
                  )}
                >
                  <p>{m.text}</p>
                  <span className="mt-1 block text-left text-[10px] text-slate-400">
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={send}
            className="flex items-center gap-2 bg-[#F0F0F0] p-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="اكتب رسالة تجريبية..."
              className="h-9 flex-1 rounded-full border-none bg-white px-4 text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label="إرسال"
              className="flex size-9 items-center justify-center rounded-full bg-[#075E54] text-white transition-transform active:scale-95"
            >
              <Send className="size-4 -scale-x-100" />
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
}
