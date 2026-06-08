"use client";

import { useCallback } from "react";

import { persistAuditLogsAction } from "@/app/actions/audit-log-actions";
import type { CreateAuditLogInput } from "@/lib/audit-log";
import { useUserRole } from "@/hooks/use-user-role";

export function useAgendaAudit() {
  const { profile, displayRole, userName } = useUserRole();

  const recordAuditLogs = useCallback(
    async (logs: CreateAuditLogInput[]) => {
      if (logs.length === 0) {
        return;
      }

      const result = await persistAuditLogsAction(
        {
          userName,
          userProfile: profile,
          displayRole,
        },
        logs
      );

      if (!result.success) {
        console.error("[auditoria]", result.error);
      }
    },
    [displayRole, profile, userName]
  );

  return { recordAuditLogs };
}
