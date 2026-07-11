import { DashboardShell } from "@/components/layout/dashboard-shell";

/**
 * Layout for the authenticated dashboard. Wraps every in-app route with
 * the sidebar + header chrome. The /login route lives outside this group
 * so it renders without the shell.
 */
export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>;
}
