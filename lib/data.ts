/*
  SmartLink — mock data & domain types
  ------------------------------------------------------------------
  Every view reads from here. Types are intentionally explicit so the
  layer can later be swapped for API/DB calls without touching UI code.
*/

import type { LucideIcon } from "lucide-react";
import {
  Users,
  MessageSquareText,
  Clock4,
  ShoppingBag,
} from "lucide-react";

/* ----------------------------- Navigation ---------------------------- */

export type RouteKey = "home" | "chat" | "products" | "settings";

export interface NavItem {
  key: RouteKey;
  label: string;
  href: string;
}

/* ------------------------------ Dashboard ---------------------------- */

export type TrendDirection = "up" | "down";

export interface StatCard {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: TrendDirection;
  tone: "success" | "warning";
  icon: LucideIcon;
}

export const STAT_CARDS: StatCard[] = [
  {
    id: "customers",
    label: "إجمالي الزبائن",
    value: "١٬٢٤٨",
    delta: "١٢٪ هذا الأسبوع",
    trend: "up",
    tone: "success",
    icon: Users,
  },
  {
    id: "saved-messages",
    label: "الرسائل الموفّرة",
    value: "٨٬٩٣٠",
    delta: "٢٤٪ عن السابق",
    trend: "up",
    tone: "success",
    icon: MessageSquareText,
  },
  {
    id: "waiting",
    label: "محادثات بانتظارك",
    value: "٧",
    delta: "٣ عاجلة",
    trend: "up",
    tone: "warning",
    icon: Clock4,
  },
  {
    id: "leads",
    label: "الطلبات المحتملة",
    value: "٣٤",
    delta: "٥ جديدة اليوم",
    trend: "up",
    tone: "warning",
    icon: ShoppingBag,
  },
];

/** Peak activity — 24h buckets, value = relative conversation volume. */
export interface ActivityBucket {
  hour: string;
  value: number;
}

export const PEAK_ACTIVITY: ActivityBucket[] = [
  { hour: "٨ ص", value: 18 },
  { hour: "١٠ ص", value: 32 },
  { hour: "١٢ م", value: 46 },
  { hour: "٢ م", value: 58 },
  { hour: "٤ م", value: 72 },
  { hour: "٦ م", value: 95 },
  { hour: "٨ م", value: 88 },
  { hour: "١٠ م", value: 64 },
  { hour: "١٢ ص", value: 30 },
];

export interface HotLead {
  id: string;
  name: string;
  message: string;
  intent: string;
  waitingFor: string;
  score: "hot" | "warm";
}

export const HOT_LEADS: HotLead[] = [
  {
    id: "l1",
    name: "نورة الشهري",
    message: "أبغى أعرف إذا متوفر مقاس L باللون الأسود؟",
    intent: "استفسار عن توفّر",
    waitingFor: "٤ دقائق",
    score: "hot",
  },
  {
    id: "l2",
    name: "خالد المطيري",
    message: "كم سعر الشحن للدمام ومتى يوصل؟",
    intent: "نية شراء",
    waitingFor: "٧ دقائق",
    score: "hot",
  },
  {
    id: "l3",
    name: "سارة القحطاني",
    message: "ممكن خصم لو طلبت قطعتين؟",
    intent: "تفاوض سعر",
    waitingFor: "١٢ دقيقة",
    score: "warm",
  },
  {
    id: "l4",
    name: "عبدالله الدوسري",
    message: "الطلب اللي طلبته أمس وصل لأي مرحلة؟",
    intent: "متابعة طلب",
    waitingFor: "١٥ دقيقة",
    score: "warm",
  },
];

/* ------------------------------ Products ----------------------------- */

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  specs: string;
  image: string;
  externalUrl?: string;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "سماعة لاسلكية Pro",
    price: 349,
    currency: "ر.س",
    specs: "عزل ضوضاء نشط · بطارية ٣٠ ساعة · بلوتوث ٥.٣",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=60",
    externalUrl: "https://store.example.com/headphones",
    inStock: true,
  },
  {
    id: "p2",
    name: "ساعة ذكية Series 7",
    price: 899,
    currency: "ر.س",
    specs: "شاشة AMOLED · قياس الأكسجين · مقاومة للماء",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=60",
    externalUrl: "https://store.example.com/watch",
    inStock: true,
  },
  {
    id: "p3",
    name: "كاميرا مدمجة 4K",
    price: 1290,
    currency: "ر.س",
    specs: "تصوير ٤K · تثبيت بصري · عدسة واسعة",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=60",
    inStock: false,
  },
  {
    id: "p4",
    name: "لوحة مفاتيح ميكانيكية",
    price: 259,
    currency: "ر.س",
    specs: "مفاتيح حمراء · إضاءة RGB · اتصال لاسلكي",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=60",
    externalUrl: "https://store.example.com/keyboard",
    inStock: true,
  },
  {
    id: "p5",
    name: "حقيبة ظهر عصرية",
    price: 179,
    currency: "ر.س",
    specs: "مقاومة للماء · جيب لابتوب ١٥ · قماش معاد تدويره",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=60",
    inStock: true,
  },
  {
    id: "p6",
    name: "مكبر صوت محمول",
    price: 210,
    currency: "ر.س",
    specs: "صوت محيطي · مقاوم للغبار · ١٢ ساعة تشغيل",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=60",
    externalUrl: "https://store.example.com/speaker",
    inStock: true,
  },
];

/* ------------------------------ Live chat ---------------------------- */

export type ChatFilter = "all" | "hot" | "waiting";

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "hot" | "waiting" | "bot";
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "نورة الشهري",
    lastMessage: "أبغى أعرف إذا متوفر مقاس L؟",
    time: "١٠:٤٢",
    unread: 3,
    status: "hot",
  },
  {
    id: "c2",
    name: "خالد المطيري",
    lastMessage: "كم سعر الشحن للدمام؟",
    time: "١٠:٣٨",
    unread: 2,
    status: "hot",
  },
  {
    id: "c3",
    name: "سارة القحطاني",
    lastMessage: "ممكن خصم لو طلبت قطعتين؟",
    time: "١٠:٢١",
    unread: 1,
    status: "waiting",
  },
  {
    id: "c4",
    name: "عبدالله الدوسري",
    lastMessage: "شكراً، بانتظار التأكيد 🌟",
    time: "٠٩:٥٤",
    unread: 0,
    status: "bot",
  },
  {
    id: "c5",
    name: "منيرة العنزي",
    lastMessage: "تمام، أرسل لي رابط الدفع",
    time: "٠٩:٣٠",
    unread: 0,
    status: "bot",
  },
];

export type MessageSender = "customer" | "bot";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  time: string;
}

export const CHAT_THREAD: ChatMessage[] = [
  {
    id: "m1",
    sender: "customer",
    text: "السلام عليكم، عندكم السماعة اللاسلكية Pro؟",
    time: "١٠:٣٠",
  },
  {
    id: "m2",
    sender: "bot",
    text: "وعليكم السلام ورحمة الله 🌿 نعم متوفرة! سعرها ٣٤٩ ر.س وتشمل ضمان سنة.",
    time: "١٠:٣١",
  },
  {
    id: "m3",
    sender: "customer",
    text: "حلو، وش الفرق بينها وبين الموديل العادي؟",
    time: "١٠:٣٣",
  },
  {
    id: "m4",
    sender: "bot",
    text: "النسخة Pro فيها عزل ضوضاء نشط وبطارية ٣٠ ساعة، أما العادية ١٨ ساعة وبدون عزل.",
    time: "١٠:٣٤",
  },
  {
    id: "m5",
    sender: "customer",
    text: "أبغى أعرف إذا متوفر مقاس L باللون الأسود؟",
    time: "١٠:٤٢",
  },
];

export interface ProfileInsight {
  id: string;
  text: string;
}

export const PROFILE_INSIGHTS: ProfileInsight[] = [
  { id: "i1", text: "زبونة مهتمة بالمنتجات الصوتية عالية الجودة" },
  { id: "i2", text: "حساسة للسعر — تبحث عن العروض والخصومات" },
  { id: "i3", text: "تفضّل ردوداً سريعة ومباشرة" },
  { id: "i4", text: "احتمالية شراء عالية خلال ٢٤ ساعة" },
];

export const INTEREST_PRODUCTS: Product[] = [PRODUCTS[0], PRODUCTS[5]];

/* ------------------------------ Settings ----------------------------- */

export type StoreType = "physical" | "online";
export type BotMode = "auto" | "assist" | "off";
export type ConnectionState = "connected" | "disconnected";
