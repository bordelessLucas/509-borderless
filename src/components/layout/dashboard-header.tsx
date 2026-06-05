"use client";

import { Bell, Menu } from "lucide-react";

import { UserMenu } from "@/components/layout/user-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mock-user";

type DashboardHeaderProps = {
  onMenuClick?: () => void;
};

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-14 items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={onMenuClick}
          aria-label="Abrir menu de navegação"
        >
          <Menu className="size-5" />
        </Button>

        <div className="min-w-0 flex-1 lg:hidden">
          <p className="truncate text-sm font-semibold">{currentUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {currentUser.role}
          </p>
        </div>

        <div className="hidden flex-1 lg:block" />

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative size-10 shrink-0"
            aria-label={`Notificações, ${currentUser.notificationCount} não lidas`}
          >
            <Bell className="size-5" />
            {currentUser.notificationCount > 0 ? (
              <Badge className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full p-0 text-[0.6rem]">
                {currentUser.notificationCount}
              </Badge>
            ) : null}
          </Button>

          <div className="hidden min-w-0 text-right sm:block">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.role}
            </p>
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
