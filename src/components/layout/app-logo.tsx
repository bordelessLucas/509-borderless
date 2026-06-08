import { APP_NAME } from "@/lib/app-brand";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  showSubtitle?: boolean;
};

export function AppLogo({ className, showSubtitle = true }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm"
      >
        SF
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold leading-tight text-foreground">
          {APP_NAME}
        </p>
        {showSubtitle ? (
          <p className="truncate text-xs text-muted-foreground">
            Gestão clínica
          </p>
        ) : null}
      </div>
    </div>
  );
}
