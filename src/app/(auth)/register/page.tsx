import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { APP_NAME } from "@/lib/app-brand";

export const metadata: Metadata = {
  title: "Criar conta",
  description: `Cadastre-se na plataforma ${APP_NAME}.`,
};

export default function RegisterPage() {
  return <RegisterForm />;
}
