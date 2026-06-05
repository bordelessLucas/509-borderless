"use client";

import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userProfileOptions } from "@/lib/auth";

export function RegisterForm() {
  return (
    <AuthCard
      title="Criar sua conta"
      description="Cadastre-se para começar a usar a plataforma. Informe seu perfil para personalizar o acesso."
      footer={
        <>
          <Button
            type="submit"
            form="register-form"
            className="h-11 w-full"
            size="lg"
          >
            Criar conta
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Já possui conta?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Entrar
            </Link>
          </p>
        </>
      }
    >
      <form id="register-form" className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome completo</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Maria Silva Santos"
            autoComplete="name"
            required
            className="h-11"
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            required
            placeholder="Mínimo de 8 caracteres"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile">Cargo / Perfil</Label>
          <Select name="profile" required>
            <SelectTrigger id="profile" className="h-11 w-full">
              <SelectValue placeholder="Selecione seu perfil" />
            </SelectTrigger>
            <SelectContent>
              {userProfileOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            O perfil define suas permissões e a experiência no sistema.
          </p>
        </div>
      </form>
    </AuthCard>
  );
}
