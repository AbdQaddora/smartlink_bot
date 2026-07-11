import { Flame, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { HOT_LEADS } from "@/lib/data";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join(" ");
}

export function HotLeadsTable() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Flame className="size-4 text-orange-500" />
              محادثات ساخنة تحتاج تدخّلك الفوري
            </CardTitle>
            <CardDescription className="mt-1">
              زبائن بنيّة شراء عالية بانتظار الرد
            </CardDescription>
          </div>
          <Badge variant="destructive">{HOT_LEADS.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {HOT_LEADS.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-secondary/50"
          >
            <div className="relative">
              <Avatar className="size-10">
                <AvatarFallback className="bg-secondary text-xs">
                  {initials(lead.name)}
                </AvatarFallback>
              </Avatar>
              {lead.score === "hot" && (
                <Flame className="animate-flame absolute -bottom-1 -left-1 size-4 fill-orange-400 text-orange-500" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold">{lead.name}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium",
                    lead.score === "hot"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                  )}
                >
                  {lead.intent}
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {lead.message}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-[11px] text-muted-foreground">
                ينتظر {lead.waitingFor}
              </span>
              <Button size="sm" className="h-8">
                تولّى الرد
                <ArrowLeft className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
