"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  Flame,
  Send,
  Paperclip,
  Smile,
  Sparkles,
  ShoppingBag,
  UserCog,
  Bot,
  Check,
  CheckCheck,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  CONVERSATIONS,
  CHAT_THREAD,
  PROFILE_INSIGHTS,
  INTEREST_PRODUCTS,
  type ChatFilter,
  type Conversation,
} from "@/lib/data";

const FILTERS: { key: ChatFilter; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "hot", label: "ساخنة" },
  { key: "waiting", label: "بانتظار الرد" },
];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join(" ");
}

export function LiveChatView() {
  const [filter, setFilter] = useState<ChatFilter>("all");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [manual, setManual] = useState(false);
  const [draft, setDraft] = useState("");
  // On mobile only one pane fits at a time: the list, or the open chat.
  const [mobilePane, setMobilePane] = useState<"list" | "chat">("list");

  const openConversation = (id: string) => {
    setActiveId(id);
    setMobilePane("chat");
  };

  const conversations = useMemo(() => {
    return CONVERSATIONS.filter((c) => {
      const matchesFilter =
        filter === "all" ? true : filter === "hot" ? c.status === "hot" : c.status === "waiting";
      const matchesQuery = c.name.includes(query) || c.lastMessage.includes(query);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const active =
    CONVERSATIONS.find((c) => c.id === activeId) ?? CONVERSATIONS[0];

  return (
    <div className="grid h-[calc(100vh-7rem)] grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_300px]">
      {/* Column 1 (right) — conversation list */}
      <Card
        className={cn(
          "min-h-0 flex-col gap-0 overflow-hidden p-0 lg:flex",
          mobilePane === "chat" ? "hidden" : "flex"
        )}
      >
        <div className="space-y-3 border-b border-border p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بحث في المحادثات..."
              className="h-9 border-transparent bg-secondary pr-9"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  filter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
          {conversations.map((c) => (
            <ConversationRow
              key={c.id}
              conversation={c}
              active={c.id === activeId}
              onSelect={() => openConversation(c.id)}
            />
          ))}
          {conversations.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              لا توجد محادثات مطابقة.
            </p>
          )}
        </div>
      </Card>

      {/* Column 2 (center) — active chat */}
      <Card
        className={cn(
          "min-h-0 flex-col gap-0 overflow-hidden p-0 lg:flex",
          mobilePane === "list" ? "hidden" : "flex"
        )}
      >
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <button
            type="button"
            onClick={() => setMobilePane("list")}
            aria-label="رجوع للمحادثات"
            className="-mr-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary lg:hidden"
          >
            <ArrowRight className="size-5" />
          </button>
          <Avatar className="size-10">
            <AvatarFallback className="bg-secondary text-xs">
              {initials(active.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{active.name}</p>
            <div className="mt-0.5 flex items-center gap-2">
              {active.status === "hot" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-orange-600">
                  <Flame className="size-3 fill-orange-400 text-orange-500" />
                  محادثة ساخنة
                </span>
              )}
              <span className="text-[11px] text-muted-foreground">
                آخر ظهور {active.time}
              </span>
            </div>
          </div>
          {manual ? (
            <Badge variant="warning">
              <UserCog className="size-3" />
              تدخّل بشري
            </Badge>
          ) : (
            <Badge variant="success">
              <Bot className="size-3" />
              البوت نشِط
            </Badge>
          )}
        </div>

        {/* Manual takeover toggle */}
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 transition-colors",
            manual ? "bg-amber-50 dark:bg-amber-500/5" : "bg-secondary/40"
          )}
        >
          <div className="flex items-center gap-2">
            <UserCog
              className={cn(
                "size-4",
                manual ? "text-amber-600" : "text-muted-foreground"
              )}
            />
            <div className="leading-tight">
              <p className="text-sm font-medium">تدخّل بشري يدوياً</p>
              <p
                className={cn(
                  "text-[11px]",
                  manual ? "text-amber-600" : "text-muted-foreground"
                )}
              >
                {manual
                  ? "أنت تدير المحادثة الآن — البوت متوقف مؤقتاً."
                  : "البوت يتولّى الرد تلقائياً."}
              </p>
            </div>
          </div>
          <Switch checked={manual} onCheckedChange={setManual} />
        </div>

        {/* Messages */}
        <div className="wa-canvas min-h-0 flex-1 space-y-2 overflow-y-auto scrollbar-thin p-4">
          {CHAT_THREAD.map((m) => {
            const isCustomer = m.sender === "customer";
            return (
              <div
                key={m.id}
                className={cn("flex", isCustomer ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                    isCustomer
                      ? "rounded-tr-sm bg-chat-customer text-foreground"
                      : "rounded-tl-sm bg-chat-bot text-chat-bot-foreground"
                  )}
                >
                  {!isCustomer && (
                    <span className="mb-0.5 flex items-center gap-1 text-[10px] font-medium text-primary">
                      <Bot className="size-3" />
                      البوت
                    </span>
                  )}
                  <p>{m.text}</p>
                  <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                    {m.time}
                    {isCustomer ? (
                      <CheckCheck className="size-3 text-primary" />
                    ) : (
                      <Check className="size-3" />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky input footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDraft("");
          }}
          className="flex items-center gap-2 border-t border-border bg-card p-3"
        >
          <button
            type="button"
            aria-label="إرفاق ملف"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
          >
            <Paperclip className="size-4" />
          </button>
          <div className="relative flex-1">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={
                manual ? "اكتب ردّك للزبون..." : "فعّل التدخل اليدوي للرد بنفسك..."
              }
              disabled={!manual}
              className="h-10 rounded-full border-transparent bg-secondary pl-10"
            />
            <Smile className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <button
            type="submit"
            aria-label="إرسال"
            disabled={!manual || !draft.trim()}
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
          >
            <Send className="size-4 -scale-x-100" />
          </button>
        </form>
      </Card>

      {/* Column 3 (left) — AI insights + interests */}
      <div className="hidden min-h-0 flex-col gap-4 overflow-y-auto scrollbar-thin xl:flex">
        <Card className="gap-0 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <p className="text-sm font-semibold">تحليل ذكي للزبون</p>
          </div>
          <ul className="mt-3 space-y-2.5">
            {PROFILE_INSIGHTS.map((insight) => (
              <li key={insight.id} className="flex gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{insight.text}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="gap-0 p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-primary" />
            <p className="text-sm font-semibold">منتجات تهمّ الزبون</p>
          </div>
          <div className="mt-3 space-y-3">
            {INTEREST_PRODUCTS.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs font-semibold text-primary">
                    {p.price} {p.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ConversationRow({
  conversation,
  active,
  onSelect,
}: {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 border-b border-border px-3 py-3 text-right transition-colors",
        active ? "bg-accent/60" : "hover:bg-secondary/50"
      )}
    >
      <div className="relative">
        <Avatar className="size-11">
          <AvatarFallback className="bg-secondary text-xs">
            {initials(conversation.name)}
          </AvatarFallback>
        </Avatar>
        {conversation.status === "hot" && (
          <Flame className="animate-flame absolute -bottom-1 -left-1 size-4 fill-orange-400 text-orange-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold">{conversation.name}</p>
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {conversation.time}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-muted-foreground">
            {conversation.lastMessage}
          </p>
          {conversation.unread > 0 && (
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
