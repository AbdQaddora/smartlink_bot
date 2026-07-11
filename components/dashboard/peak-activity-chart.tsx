import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PEAK_ACTIVITY } from "@/lib/data";

/**
 * Lightweight dependency-free bar chart. Bars are rendered as flex
 * columns with a percentage height, so no charting library is needed.
 */
export function PeakActivityChart() {
  const max = Math.max(...PEAK_ACTIVITY.map((b) => b.value));
  const peak = PEAK_ACTIVITY.reduce((a, b) => (b.value > a.value ? b : a));

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>أوقات ذروة تواصل الزبائن</CardTitle>
            <CardDescription className="mt-1">
              توزيع المحادثات على مدار اليوم
            </CardDescription>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            الذروة {peak.hour}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end">
        <div className="flex h-56 items-stretch justify-between gap-2">
          {PEAK_ACTIVITY.map((bucket) => {
            const isPeak = bucket.hour === peak.hour;
            return (
              <div
                key={bucket.hour}
                className="group flex flex-1 flex-col items-center gap-2"
              >
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md transition-all group-hover:opacity-100 ${
                      isPeak
                        ? "bg-primary"
                        : "bg-primary/25 group-hover:bg-primary/40"
                    }`}
                    style={{ height: `${(bucket.value / max) * 100}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                      {bucket.value}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                  {bucket.hour}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
