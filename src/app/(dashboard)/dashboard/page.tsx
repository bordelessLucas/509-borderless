import type { Metadata } from "next";

import { DailyAgenda } from "@/components/dashboard/daily-agenda";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Agenda diária de atendimentos da clínica.",
};

export default function DashboardPage() {
  return <DailyAgenda />;
}
