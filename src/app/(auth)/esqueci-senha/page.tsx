import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Esqueci minha senha",
  description: "Recupere o acesso à sua conta Borderless ABA.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Recuperar senha"
      description="Informe seu e-mail corporativo. Enviaremos instruções para redefinir sua senha."
      footer={
        <>
          <Button type="submit" form="forgot-password-form" className="h-11 w-full" size="lg">
            Enviar instruções
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Lembrou a senha?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Voltar ao login
            </Link>
          </p>
        </>
      }
    >
      <form id="forgot-password-form" className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu.email@clinica.com"
            autoComplete="email"
            inputMode="email"
            required
            className="h-11"
          />
        </div>
      </form>
    </AuthCard>
  );
}
