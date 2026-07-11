import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartLink — لوحة تحكم المتجر",
  description: "منصة SmartLink لإدارة بوت المبيعات على واتساب",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
