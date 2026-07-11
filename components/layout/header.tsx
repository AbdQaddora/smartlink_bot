"use client";

import { Bell, Search, MessageSquare, Package, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
  icon: typeof MessageSquare;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "محادثة ساخنة تنتظر ردك",
    detail: "نورة الشهري — استفسار عن توفّر المنتج",
    time: "قبل ٤ دقائق",
    unread: true,
    icon: MessageSquare,
  },
  {
    id: "n2",
    title: "طلب محتمل جديد",
    detail: "خالد المطيري أبدى نية شراء",
    time: "قبل ٩ دقائق",
    unread: true,
    icon: Sparkles,
  },
  {
    id: "n3",
    title: "المخزون على وشك النفاد",
    detail: "كاميرا مدمجة 4K — غير متوفرة",
    time: "قبل ساعة",
    unread: false,
    icon: Package,
  },
];

export function Header() {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 px-6 backdrop-blur-md">
      {/* Central search */}
      <div className="relative mx-auto w-full max-w-xl">
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="بحث في المحادثات والمنتجات..."
          className="h-10 border-transparent bg-secondary pr-9 focus-visible:bg-card"
        />
      </div>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="الإشعارات"
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="size-5" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive/70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-destructive ring-2 ring-card" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">الإشعارات</p>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {unreadCount} غير مقروء
            </span>
          </div>
          <ul className="max-h-80 divide-y divide-border overflow-y-auto scrollbar-thin">
            {NOTIFICATIONS.map((n) => {
              const Icon = n.icon;
              return (
                <li
                  key={n.id}
                  className={cn(
                    "flex gap-3 px-4 py-3 transition-colors hover:bg-secondary/60",
                    n.unread && "bg-accent/40"
                  )}
                >
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{n.title}</p>
                      {n.unread && (
                        <span className="size-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {n.detail}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground/80">
                      {n.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border p-2">
            <Button variant="ghost" className="w-full justify-center text-primary">
              عرض كل الإشعارات
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}
