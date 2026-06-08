"use client";

import { AuditAccessDenied } from "@/components/dashboard/audit-access-denied";
import { AuditLogPage } from "@/components/dashboard/audit-log-page";
import { useUserRole } from "@/hooks/use-user-role";

export function AuditLogGuard() {
  const { canViewAuditLogs } = useUserRole();

  if (!canViewAuditLogs) {
    return <AuditAccessDenied />;
  }

  return <AuditLogPage />;
}
