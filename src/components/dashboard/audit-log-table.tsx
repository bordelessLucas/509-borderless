"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AgendaAuditLogRow } from "@/lib/supabase/database.types";

type AuditLogTableProps = {
  logs: AgendaAuditLogRow[];
  isLoading?: boolean;
};

function formatPerformedAt(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

function getActionVariant(actionLabel: string) {
  if (actionLabel === "Cancelamento") {
    return "destructive" as const;
  }

  if (actionLabel === "Remanejamento") {
    return "secondary" as const;
  }

  return "outline" as const;
}

export function AuditLogTable({ logs, isLoading = false }: AuditLogTableProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-xl border border-border/80 bg-card p-6 text-sm text-muted-foreground">
        Carregando registros de auditoria...
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 text-center">
        <p className="text-sm font-medium text-foreground">
          Nenhum registro encontrado
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Ajuste o período ou o nome do paciente para ampliar a busca.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data/Hora</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Ação</TableHead>
            <TableHead>Paciente</TableHead>
            <TableHead>De</TableHead>
            <TableHead>Para</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap">
                {formatPerformedAt(log.performed_at)}
              </TableCell>
              <TableCell>
                <div className="space-y-0.5">
                  <p className="font-medium">{log.user_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {log.user_profile}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getActionVariant(log.action_label)}>
                  {log.action_label}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{log.patient_name}</TableCell>
              <TableCell className="max-w-56 whitespace-normal text-muted-foreground">
                {log.from_description}
              </TableCell>
              <TableCell className="max-w-56 whitespace-normal">
                {log.to_description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
