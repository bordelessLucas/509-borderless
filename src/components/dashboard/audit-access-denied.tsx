import { ShieldAlert } from "lucide-react";

export function AuditAccessDenied() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 text-center">
      <ShieldAlert className="mb-3 size-10 text-muted-foreground" aria-hidden />
      <h1 className="text-lg font-semibold">Acesso restrito</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        O log de auditoria está disponível apenas para o perfil de Administração.
      </p>
    </div>
  );
}
