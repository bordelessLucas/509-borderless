"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  showIcon?: boolean;
};

export function LogoutButton({
  className,
  variant = "outline",
  showIcon = true,
}: LogoutButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      className={cn("h-11 w-full justify-start gap-2", className)}
      onClick={signOut}
    >
      {showIcon ? <LogOut className="size-4" aria-hidden /> : null}
      Sair da plataforma
    </Button>
  );
}
