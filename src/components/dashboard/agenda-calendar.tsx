"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { AppointmentDayIcon } from "@/components/dashboard/appointment-day-icon";
import { DayAppointmentsDialog } from "@/components/dashboard/day-appointments-dialog";
import { Button } from "@/components/ui/button";
import {
  getAppointmentsByDate,
  monthlyAppointments,
} from "@/lib/dashboard-mock-data";
import {
  formatMonthYear,
  getCalendarDays,
  getWeekdayLabels,
  toDateKey,
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

export function AgendaCalendar() {
  const today = new Date();
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calendarDays = useMemo(
    () =>
      getCalendarDays(visibleMonth.getFullYear(), visibleMonth.getMonth()),
    [visibleMonth]
  );

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, ReturnType<typeof getAppointmentsByDate>>();

    monthlyAppointments.forEach((appointment) => {
      const existing = map.get(appointment.date) ?? [];
      map.set(appointment.date, [...existing, appointment]);
    });

    map.forEach((appointments, dateKey) => {
      map.set(
        dateKey,
        appointments.sort((a, b) => a.time.localeCompare(b.time))
      );
    });

    return map;
  }, []);

  const selectedAppointments = selectedDateKey
    ? (appointmentsByDate.get(selectedDateKey) ?? [])
    : [];

  function openDay(dateKey: string) {
    setSelectedDateKey(dateKey);
    setIsDialogOpen(true);
  }

  function goToPreviousMonth() {
    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() - 1, 1)
    );
  }

  function goToNextMonth() {
    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + 1, 1)
    );
  }

  function goToToday() {
    const currentToday = new Date();
    setVisibleMonth(
      new Date(currentToday.getFullYear(), currentToday.getMonth(), 1)
    );
    openDay(toDateKey(currentToday));
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Agenda
          </h1>
          <p className="text-sm text-muted-foreground">
            Toque em um dia para ver os atendimentos agendados.
          </p>
        </div>

        <Button className="h-11 w-full shrink-0 sm:w-auto">
          <Plus className="size-4" aria-hidden />
          Novo agendamento
        </Button>
      </section>

      <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-3 sm:px-4">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10"
              onClick={goToPreviousMonth}
              aria-label="Mês anterior"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10"
              onClick={goToNextMonth}
              aria-label="Próximo mês"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <h2 className="min-w-0 flex-1 text-center text-base font-semibold capitalize sm:text-lg">
            {formatMonthYear(visibleMonth)}
          </h2>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-10 shrink-0"
            onClick={goToToday}
          >
            Hoje
          </Button>
        </div>

        <div className="grid grid-cols-7 border-b border-border bg-muted/40">
          {getWeekdayLabels().map((label) => (
            <div
              key={label}
              className="px-1 py-2 text-center text-[0.65rem] font-medium text-muted-foreground sm:px-2 sm:text-xs"
            >
              <span className="sm:hidden">{label.charAt(0)}</span>
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const dayAppointments =
              appointmentsByDate.get(day.dateKey) ?? [];
            const visibleAppointments = dayAppointments.slice(0, 3);
            const hiddenCount =
              dayAppointments.length - visibleAppointments.length;
            const hasAppointments = dayAppointments.length > 0;

            return (
              <button
                key={day.dateKey}
                type="button"
                onClick={() => openDay(day.dateKey)}
                className={cn(
                  "relative flex min-h-16 flex-col border-b border-r border-border/70 p-1.5 text-left transition-colors sm:min-h-24 sm:p-2",
                  "hover:bg-muted/50 active:bg-muted/70",
                  "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none",
                  !day.isCurrentMonth && "bg-muted/20 text-muted-foreground",
                  day.isToday && "bg-primary/5"
                )}
                aria-label={`${day.dayNumber}, ${dayAppointments.length} atendimentos`}
              >
                <span
                  className={cn(
                    "mb-1 inline-flex size-6 items-center justify-center self-end rounded-full text-xs font-medium sm:size-7 sm:text-sm",
                    day.isToday &&
                      "bg-primary text-primary-foreground font-semibold"
                  )}
                >
                  {day.dayNumber}
                </span>

                {hasAppointments ? (
                  <div className="mt-auto flex flex-wrap items-center gap-0.5 sm:gap-1">
                    {visibleAppointments.map((appointment) => (
                      <AppointmentDayIcon
                        key={appointment.id}
                        status={appointment.status}
                      />
                    ))}
                    {hiddenCount > 0 ? (
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.6rem] font-medium text-muted-foreground sm:text-[0.65rem]">
                        +{hiddenCount}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:text-sm">
        <span className="font-medium text-foreground">Legenda:</span>
        <span className="inline-flex items-center gap-1.5">
          <AppointmentDayIcon status="confirmado" />
          Confirmado
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AppointmentDayIcon status="agendado" />
          Agendado
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AppointmentDayIcon status="em_espera" />
          Em espera
        </span>
      </div>

      <DayAppointmentsDialog
        dateKey={selectedDateKey}
        appointments={selectedAppointments}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
