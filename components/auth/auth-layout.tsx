import { Link2 } from "lucide-react";

/**
 * Split-screen shell for the login/signup screens. The form column sits at
 * the inline-start (right in RTL); the emerald brand column — headline plus
 * an animated chat mockup — fills the other half on large screens and is
 * hidden on mobile so the form takes over.
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Form column */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Brand column */}
      <div className="relative hidden flex-1 flex-col overflow-hidden bg-[linear-gradient(150deg,#065f46_0%,#16a34a_55%,#4ade80_100%)] p-12 text-white lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-white/15">
            <Link2 className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[17px] font-extrabold">SmartLink</div>
            <div className="text-xs opacity-80">سمارت لينك</div>
          </div>
        </div>

        {/* Headline + chat mockup */}
        <div className="flex max-w-md flex-1 flex-col justify-center gap-9">
          <h2 className="text-3xl font-extrabold leading-[1.5]">
            حوّل محادثات الواتساب إلى مبيعات تلقائية على مدار الساعة.
          </h2>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            {/* Customer message */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-[14px_14px_4px_14px] bg-white/15 px-3.5 py-2.5 text-sm leading-relaxed">
                مرحباً، متوفر مقاس M من العباية الكلاسيك؟
              </div>
            </div>
            {/* Bot reply */}
            <div className="flex justify-start">
              <div className="max-w-[82%] animate-bot-in rounded-[14px_14px_14px_4px] bg-white px-3.5 py-2.5 text-sm leading-relaxed text-emerald-950 shadow-lg">
                أهلاً بك! نعم متوفر، هل ترغب في إضافتها لسلة الشراء؟ ✨
              </div>
            </div>
            {/* Typing indicator */}
            <div className="flex items-center gap-1.5 pe-1">
              <span className="size-1.5 animate-typing rounded-full bg-white/70" />
              <span className="size-1.5 animate-typing rounded-full bg-white/70 [animation-delay:0.2s]" />
              <span className="size-1.5 animate-typing rounded-full bg-white/70 [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
