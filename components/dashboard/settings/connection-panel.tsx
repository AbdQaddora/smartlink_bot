"use client";

import { useState } from "react";
import {
  Smartphone,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Power,
  QrCode,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ConnectionState } from "@/lib/data";

/** A decorative mock QR code — deterministic 21×21 module grid, no lib. */
const QR_SIZE = 21;

function isFinder(row: number, col: number) {
  // The three 7×7 finder patterns (top-left, top-right, bottom-left).
  const inBox = (r0: number, c0: number) =>
    row >= r0 && row < r0 + 7 && col >= c0 && col < c0 + 7;
  const box =
    inBox(0, 0) || inBox(0, QR_SIZE - 7) || inBox(QR_SIZE - 7, 0);
  if (!box) return null;
  // Local coords within whichever 7×7 box this cell belongs to.
  const lr = row < 7 ? row : row - (QR_SIZE - 7);
  const lc = col < 7 ? col : col - (QR_SIZE - 7);
  const ring = lr === 0 || lr === 6 || lc === 0 || lc === 6;
  const core = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
  return ring || core;
}

function QrPlaceholder() {
  const cells = Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => {
    const row = Math.floor(i / QR_SIZE);
    const col = i % QR_SIZE;
    const finder = isFinder(row, col);
    if (finder !== null) return finder;
    // Keep an empty quiet-zone gap around each finder pattern.
    const nearFinder =
      (row < 8 && col < 8) ||
      (row < 8 && col >= QR_SIZE - 8) ||
      (row >= QR_SIZE - 8 && col < 8);
    if (nearFinder) return false;
    // Deterministic pseudo-random module fill for the data area.
    return ((row * 17 + col * 23 + row * col * 3) % 7) % 2 === 0;
  });

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div
        className="grid w-52 max-w-full gap-px"
        style={{ gridTemplateColumns: `repeat(${QR_SIZE}, minmax(0, 1fr))` }}
      >
        {cells.map((on, i) => (
          <div
            key={i}
            className={
              on ? "aspect-square rounded-[1px] bg-slate-900" : "aspect-square"
            }
          />
        ))}
      </div>
    </div>
  );
}

export function ConnectionPanel() {
  // Toggle to preview both states; real app derives this from the session.
  const [status, setStatus] = useState<ConnectionState>("connected");
  const connected = status === "connected";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="size-4 text-primary" />
              حالة الاتصال بواتساب
            </CardTitle>
            <CardDescription className="mt-1">
              اربط رقم واتساب الخاص بمتجرك لتفعيل البوت.
            </CardDescription>
          </div>
          {connected ? (
            <Badge variant="success">
              <CheckCircle2 className="size-3" />
              متصل
            </Badge>
          ) : (
            <Badge variant="destructive">
              <XCircle className="size-3" />
              غير متصل
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {connected ? (
          /* State 1 — connected */
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 py-10 text-center dark:border-emerald-500/20 dark:bg-emerald-500/5">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <CheckCircle2 className="size-8" />
            </div>
            <div>
              <p className="font-semibold">الرقم متصل ويعمل</p>
              <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                +966 5X XXX XXXX
              </p>
            </div>
            <Button
              variant="outline"
              className="text-destructive hover:border-destructive/40 hover:bg-destructive/5"
              onClick={() => setStatus("disconnected")}
            >
              <Power className="size-4" />
              فصل الاتصال
            </Button>
          </div>
        ) : (
          /* State 2 — disconnected: scan QR */
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <div className="space-y-4 text-center sm:text-right">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <QrCode className="size-4 text-primary" />
                <p className="font-semibold">امسح الرمز لربط واتساب</p>
              </div>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>١. افتح واتساب على هاتفك</li>
                <li>٢. اذهب إلى الإعدادات ← الأجهزة المرتبطة</li>
                <li>٣. اضغط «ربط جهاز» وامسح الرمز</li>
              </ol>
              <Separator />
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Button variant="outline" onClick={() => setStatus("disconnected")}>
                  <RefreshCw className="size-4" />
                  تحديث الرمز
                </Button>
                <Button onClick={() => setStatus("connected")}>
                  <CheckCircle2 className="size-4" />
                  تم الربط
                </Button>
              </div>
            </div>
            <div className="mx-auto">
              <QrPlaceholder />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
