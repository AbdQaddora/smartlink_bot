"use client";

import { useState } from "react";
import { Store, BrainCircuit, SlidersHorizontal, Smartphone, Save } from "lucide-react";
import { PageHeading } from "@/components/dashboard/page-heading";
import { WhatsAppSimulator } from "@/components/dashboard/whatsapp-simulator";
import { StoreInfoPanel } from "@/components/dashboard/settings/store-info-panel";
import { BotBehaviorPanel } from "@/components/dashboard/settings/bot-behavior-panel";
import { PoliciesPanel } from "@/components/dashboard/settings/policies-panel";
import { ConnectionPanel } from "@/components/dashboard/settings/connection-panel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SettingsTab = "store" | "behavior" | "policies" | "connection";

const TABS: { key: SettingsTab; label: string; icon: typeof Store }[] = [
  { key: "store", label: "بيانات المتجر", icon: Store },
  { key: "behavior", label: "ذكاء وسلوك البوت", icon: BrainCircuit },
  { key: "policies", label: "السياسات والتشغيل", icon: SlidersHorizontal },
  { key: "connection", label: "حالة الاتصال", icon: Smartphone },
];

export function SettingsView() {
  const [tab, setTab] = useState<SettingsTab>("store");

  // The connection tab manages its own lifecycle — hide the global save bar.
  const showSaveBar = tab !== "connection";

  return (
    <div className="animate-fade-in space-y-6 pb-24">
      <PageHeading
        title="إعدادات البوت"
        subtitle="اضبط سلوك البوت وبيانات متجرك وجرّب النتيجة مباشرة."
      />

      {/* Sub-tabs bar */}
      <div className="flex gap-1 overflow-x-auto border-b border-border scrollbar-thin">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Split: settings panels (right) + sticky simulator (left) */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* key re-triggers the entrance each time the active tab changes. */}
        <div key={tab} className="animate-fade-up min-w-0 space-y-6">
          {tab === "store" && <StoreInfoPanel />}
          {tab === "behavior" && <BotBehaviorPanel />}
          {tab === "policies" && <PoliciesPanel />}
          {tab === "connection" && <ConnectionPanel />}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <WhatsAppSimulator />
        </div>
      </div>

      {/* Global save bar — hidden on the connection tab */}
      {showSaveBar && (
        <div className="fixed bottom-0 left-0 z-20 border-t border-border bg-card/90 backdrop-blur-md lg:right-64 right-0">
          <div className="flex items-center justify-between gap-4 px-6 py-3">
            <p className="text-sm text-muted-foreground">
              لديك تغييرات غير محفوظة
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost">تجاهل</Button>
              <Button>
                <Save className="size-4" />
                حفظ التغييرات
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
