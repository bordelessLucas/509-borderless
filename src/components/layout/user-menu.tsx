"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth";
import { currentUser } from "@/lib/mock-user";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  className?: string;
};

export function UserMenu({ className }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn("size-10 rounded-full p-0", className)}
            aria-label="Abrir menu do usuário"
          />
        }
      >
        <Avatar className="size-9 ring-2 ring-primary/10 sm:size-10">
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary sm:text-sm">
            {currentUser.initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{currentUser.name}</span>
            <span className="text-xs text-muted-foreground">
              {currentUser.role}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="min-h-10 cursor-pointer"
          onClick={signOut}
        >
          <LogOut className="size-4" aria-hidden />
          Sair da plataforma
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
