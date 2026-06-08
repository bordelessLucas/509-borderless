import type { Metadata } from "next";

import { AuditLogGuard } from "@/components/dashboard/audit-log-guard";

export const metadata: Metadata = {
  title: "Log de Auditoria",
  description:
    "Consulta de rastreabilidade das alterações realizadas na agenda clínica.",
};

export default function AuditoriaPage() {
  return <AuditLogGuard />;
}
