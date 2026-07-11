import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SmartLink brand lockup — the chain-link mark plus the bilingual
 * wordmark. Shared by the login, signup and onboarding screens so the
 * pre-dashboard flow reads as one system. Uses the emerald brand token
 * (not a hardcoded accent) so it tracks the global theme.
 */
export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Link2 className="size-5" />
      </div>
      <div className="text-base font-extrabold leading-none">
        SmartLink{" "}
        <span className="font-semibold text-muted-foreground">| سمارت لينك</span>
      </div>
    </div>
  );
}
