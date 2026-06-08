import {
  CalendarDays,
  ClipboardCheck,
  FileBarChart,
  ScrollText,
  Settings,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { UserProfile } from "@/lib/auth";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  adminOnly?: boolean;
};

export function getNavItemsForProfile(profile: UserProfile): NavItem[] {
  return mainNavItems.filter(
    (item) => !item.adminOnly || profile === "administracao"
  );
}

export const mainNavItems: NavItem[] = [
  {
    title: "Agenda",
    href: "/dashboard",
    icon: CalendarDays,
    description: "Agendamentos e sessões do dia",
  },
  {
    title: "Pacientes / Aprendizes",
    href: "/dashboard/pacientes",
    icon: Users,
    description: "Cadastro e evolução terapêutica",
  },
  {
    title: "Profissionais",
    href: "/dashboard/profissionais",
    icon: UserCog,
    description: "Equipe clínica e supervisores",
  },
  {
    title: "Avaliações",
    href: "/dashboard/avaliacoes",
    icon: ClipboardCheck,
    description: "Instrumentos e avaliações ABA",
  },
  {
    title: "Relatórios",
    href: "/dashboard/relatorios",
    icon: FileBarChart,
    description: "Indicadores e relatórios clínicos",
  },
  {
    title: "Log de Auditoria",
    href: "/dashboard/auditoria",
    icon: ScrollText,
    description: "Rastreabilidade de alterações na agenda",
    adminOnly: true,
  },
  {
    title: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
    description: "Preferências da clínica",
  },
];
