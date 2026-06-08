export const userProfileOptions = [
  {
    value: "administracao",
    label: "Administração",
    description: "Gestão geral da clínica",
  },
  {
    value: "supervisor",
    label: "Psicólogo supervisor",
    description: "Supervisão clínica e programas ABA",
  },
  {
    value: "at",
    label: "AT (Assistente Terapêutico)",
    description: "Condução de sessões terapêuticas",
  },
  {
    value: "recepcao",
    label: "Recepção",
    description: "Agendamento e atendimento inicial",
  },
] as const;

export type UserProfile = (typeof userProfileOptions)[number]["value"];

export function signOut() {
  // TODO: integrar com provedor de autenticação (ex.: Supabase signOut)
  window.location.href = "/login";
}
