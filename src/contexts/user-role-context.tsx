"use client";

import { createContext, useContext, useMemo } from "react";

import type { UserProfile } from "@/lib/auth";
import {
  canDragAppointments,
  canManageAgenda,
  canViewAuditLogs,
  isAgendaReadOnly,
} from "@/lib/agenda-permissions";
import { currentUser } from "@/lib/mock-user";

type UserRoleContextValue = {
  profile: UserProfile;
  displayRole: string;
  userName: string;
  isAgendaReadOnly: boolean;
  canDragAppointments: boolean;
  canManageAgenda: boolean;
  canViewAuditLogs: boolean;
};

const UserRoleContext = createContext<UserRoleContextValue | null>(null);

const SIMULATED_USER = {
  profile: "administracao" as const,
  displayRole: "Administração",
};

type UserRoleProviderProps = {
  children: React.ReactNode;
};

export function UserRoleProvider({ children }: UserRoleProviderProps) {
  const value = useMemo<UserRoleContextValue>(
    () => ({
      profile: SIMULATED_USER.profile,
      displayRole: SIMULATED_USER.displayRole,
      userName: currentUser.name,
      isAgendaReadOnly: isAgendaReadOnly(SIMULATED_USER.profile),
      canDragAppointments: canDragAppointments(SIMULATED_USER.profile),
      canManageAgenda: canManageAgenda(SIMULATED_USER.profile),
      canViewAuditLogs: canViewAuditLogs(SIMULATED_USER.profile),
    }),
    []
  );

  return (
    <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);

  if (!context) {
    throw new Error("useUserRole deve ser usado dentro de UserRoleProvider.");
  }

  return context;
}
