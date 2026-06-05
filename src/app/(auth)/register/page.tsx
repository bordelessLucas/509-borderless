import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Cadastre-se na plataforma Borderless ABA.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
