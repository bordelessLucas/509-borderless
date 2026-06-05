import { ChevronRight, Clock, UserRound } from "lucide-react";

import { AppointmentStatusBadge } from "@/components/dashboard/appointment-status-badge";
import { cn } from "@/lib/utils";
import type { DailyAppointment } from "@/lib/dashboard-mock-data";

type AppointmentCardProps = {
  appointment: DailyAppointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const isWaiting = appointment.status === "em_espera";

  return (
    <button
      type="button"
      className={cn(
        "flex w-full min-h-[5.5rem] flex-col gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-colors",
        "hover:border-primary/30 hover:bg-card/80 active:scale-[0.99]",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        isWaiting
          ? "border-clinical-warning/50 bg-clinical-warning/10 ring-1 ring-clinical-warning/25"
          : "border-border/80"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex shrink-0 flex-col items-center justify-center rounded-lg px-2.5 py-2 text-center",
              isWaiting ? "bg-clinical-warning/25" : "bg-primary/10"
            )}
          >
            <span
              className={cn(
                "text-sm font-bold leading-none",
                isWaiting ? "text-[oklch(0.42_0.12_75)]" : "text-primary"
              )}
            >
              {appointment.time}
            </span>
            <span className="mt-1 text-[0.65rem] text-muted-foreground">
              {appointment.endTime}
            </span>
          </div>

          <div className="min-w-0 space-y-1">
            <p className="truncate text-base font-semibold text-foreground">
              {appointment.patient}
            </p>
            <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
              <UserRound className="size-3.5 shrink-0" aria-hidden />
              {appointment.professional}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <AppointmentStatusBadge status={appointment.status} />
          <ChevronRight
            className="size-4 text-muted-foreground sm:hidden"
            aria-hidden
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:hidden">
        <Clock className="size-3.5" aria-hidden />
        <span>
          {appointment.time} – {appointment.endTime}
        </span>
      </div>
    </button>
  );
}
