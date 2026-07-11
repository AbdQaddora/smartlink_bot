"use client";

import { useState } from "react";
import { PageHeading } from "@/components/dashboard/page-heading";
import { StatCard } from "@/components/dashboard/stat-card";
import { PeakActivityChart } from "@/components/dashboard/peak-activity-chart";
import { HotLeadsTable } from "@/components/dashboard/hot-leads-table";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { STAT_CARDS } from "@/lib/data";

type Period = "today" | "week" | "month";

const PERIODS = [
  { value: "today", label: "اليوم" },
  { value: "week", label: "هذا الأسبوع" },
  { value: "month", label: "هذا الشهر" },
] as const;

export function HomeView() {
  const [period, setPeriod] = useState<Period>("week");

  return (
    <div className="space-y-6">
      <PageHeading
        title="نظرة عامة"
        subtitle="ملخّص أداء متجرك وبوت المبيعات"
        action={
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">الفترة الزمنية</span>
            <SegmentedControl
              options={PERIODS.map((p) => ({ ...p }))}
              value={period}
              onChange={setPeriod}
            />
          </div>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Split: chart (right) + hot leads (left) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PeakActivityChart />
        <HotLeadsTable />
      </div>
    </div>
  );
}
