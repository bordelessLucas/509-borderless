"use client";

import { CalendarDays, Plus } from "lucide-react";

import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DailyAppointment } from "@/lib/dashboard-mock-data";
import { formatFullDate } from "@/lib/calendar-utils";

type DayAppointmentsDialogProps = {
  dateKey: string | null;
  appointments: DailyAppointment[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DayAppointmentsDialog({
  dateKey,
  appointments,
  open,
  onOpenChange,
}: DayAppointmentsDialogProps) {
  const waitingCount = appointments.filter(
    (item) => item.status === "em_espera"
  ).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(92dvh,820px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-3xl">
        <DialogHeader className="gap-3 border-b border-border px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start gap-3 pr-8">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <CalendarDays className="size-5" aria-hidden />
            </div>
            <div className="min-w-0 space-y-1 text-left">
              <DialogTitle className="text-lg capitalize sm:text-xl">
                {dateKey ? formatFullDate(dateKey) : "Agenda do dia"}
              </DialogTitle>
              <DialogDescription>
                {appointments.length > 0
                  ? `${appointments.length} atendimento${appointments.length > 1 ? "s" : ""} agendado${appointments.length > 1 ? "s" : ""}${waitingCount > 0 ? ` · ${waitingCount} em espera` : ""}`
                  : "Nenhum atendimento agendado para este dia."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 text-center">
              <p className="text-sm font-medium text-foreground">
                Dia livre na agenda
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Não há sessões marcadas para esta data.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-muted/30 px-4 py-4 sm:px-6">
          <Button className="h-11 w-full">
            <Plus className="size-4" aria-hidden />
            Novo agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
