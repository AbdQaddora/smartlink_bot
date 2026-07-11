"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessagesSquare,
  Package,
  Settings,
  LogOut,
  Store,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AUTH_COOKIE } from "@/lib/auth";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NAV_LINKS: NavLink[] = [
  { label: "الرئيسية", href: "/", icon: LayoutDashboard },
  { label: "المحادثات", href: "/chat", icon: MessagesSquare },
  { label: "المنتجات", href: "/products", icon: Package },
  { label: "إعدادات البوت", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
    router.replace("/login");
    router.refresh();
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-l border-sidebar-border bg-sidebar">
      {/* Branding */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Store className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold text-sidebar-foreground">متجري</p>
          <p className="text-xs text-muted-foreground">SmartLink</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-secondary"
              )}
            >
              <Icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {link.label}
              {active && (
                <span className="mr-auto size-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <Avatar className="size-9">
            <AvatarImage src="" alt="أحمد العتيبي" />
            <AvatarFallback className="bg-primary/10 text-primary">
              أ ع
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              أحمد العتيبي
            </p>
            <p className="truncate text-xs text-muted-foreground">
              صاحب المتجر
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="تسجيل الخروج"
            onClick={logout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
