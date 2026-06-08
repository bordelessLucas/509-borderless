"use client";

import { cn } from "@/lib/utils";
import { parseDraggedAppointmentId } from "@/lib/appointment-move-utils";

type AgendaDropZoneProps = {
  label: string;
  description?: string;
  isActive?: boolean;
  className?: string;
  onDropAppointment: (appointmentId: string) => void;
};

export function AgendaDropZone({
  label,
  description,
  isActive = false,
  className,
  onDropAppointment,
}: AgendaDropZoneProps) {
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const appointmentId = parseDraggedAppointmentId(event.dataTransfer);

    if (appointmentId) {
      onDropAppointment(appointmentId);
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        "rounded-lg border border-dashed px-3 py-2 text-center transition-colors",
        isActive
          ? "border-primary/50 bg-primary/10"
          : "border-border/80 bg-muted/20 hover:border-primary/30 hover:bg-primary/5",
        className
      )}
    >
      <p className="text-xs font-medium text-foreground">{label}</p>
      {description ? (
        <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
