import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatCard as StatCardData } from "@/lib/data";

export function StatCard({ stat }: { stat: StatCardData }) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="gap-0 p-5">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-xl",
            stat.tone === "success"
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
              : "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
          )}
        >
          <Icon className="size-5" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            stat.tone === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
          )}
        >
          <TrendIcon className="size-3" />
          {stat.delta}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight">{stat.value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
    </Card>
  );
}
