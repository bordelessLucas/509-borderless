"use client";

import { Filter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  countActiveFilters,
  DEFAULT_AGENDA_FILTERS,
  type AgendaAvailabilityFilter,
  type AgendaFilters,
} from "@/lib/agenda-filter-utils";
import { PROFESSIONAL_ROLES } from "@/lib/professionals-data";

const availabilityOptions: {
  value: AgendaAvailabilityFilter;
  label: string;
}[] = [
  { value: "all", label: "Todos os horários" },
  { value: "vacant", label: "Apenas horários vagos" },
];

const roleSelectItems = [
  { label: "Todos os cargos", value: "all" },
  ...PROFESSIONAL_ROLES.map((role) => ({ label: role, value: role })),
];

const availabilitySelectItems = availabilityOptions.map((option) => ({
  label: option.label,
  value: option.value,
}));

type AgendaFiltersProps = {
  filters: AgendaFilters;
  onFiltersChange: (filters: AgendaFilters) => void;
};

type FilterFieldsProps = {
  filters: AgendaFilters;
  onRoleChange: (role: AgendaFilters["role"]) => void;
  onAvailabilityChange: (availability: AgendaAvailabilityFilter) => void;
  className?: string;
};

function FilterFields({
  filters,
  onRoleChange,
  onAvailabilityChange,
  className,
}: FilterFieldsProps) {
  return (
    <div className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="agenda-role-filter">Cargo do Profissional</Label>
          <Select
            value={filters.role}
            items={roleSelectItems}
            onValueChange={(value) =>
              onRoleChange(value as AgendaFilters["role"])
            }
          >
            <SelectTrigger
              id="agenda-role-filter"
              className="h-10 w-full"
              size="default"
            >
              <SelectValue placeholder="Todos os cargos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos os cargos</SelectItem>
                {PROFESSIONAL_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="agenda-availability-filter">Disponibilidade</Label>
          <Select
            value={filters.availability}
            items={availabilitySelectItems}
            onValueChange={(value) =>
              onAvailabilityChange(value as AgendaAvailabilityFilter)
            }
          >
            <SelectTrigger
              id="agenda-availability-filter"
              className="h-10 w-full"
              size="default"
            >
              <SelectValue placeholder="Todos os horários" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availabilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export function AgendaFilters({
  filters,
  onFiltersChange,
}: AgendaFiltersProps) {
  const activeFilterCount = countActiveFilters(filters);
  const hasActiveFilters = activeFilterCount > 0;

  function updateRole(role: AgendaFilters["role"]) {
    onFiltersChange({ ...filters, role });
  }

  function updateAvailability(availability: AgendaAvailabilityFilter) {
    onFiltersChange({ ...filters, availability });
  }

  function clearFilters() {
    onFiltersChange(DEFAULT_AGENDA_FILTERS);
  }

  return (
    <section className="rounded-xl border border-border/80 bg-card shadow-sm">
      <div className="hidden gap-4 p-4 sm:flex sm:items-end">
        <FilterFields
          filters={filters}
          onRoleChange={updateRole}
          onAvailabilityChange={updateAvailability}
          className="min-w-0 flex-1"
        />

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 shrink-0 gap-1.5 text-muted-foreground"
            onClick={clearFilters}
          >
            <X className="size-4" aria-hidden />
            Limpar filtros
          </Button>
        ) : null}
      </div>

      <div className="flex items-center gap-2 p-3 sm:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="h-10 flex-1 justify-between gap-2"
              />
            }
          >
            <span className="inline-flex items-center gap-2">
              <Filter className="size-4" aria-hidden />
              Filtros avançados
            </span>
            {hasActiveFilters ? (
              <Badge variant="secondary" className="size-5 justify-center px-0">
                {activeFilterCount}
              </Badge>
            ) : null}
          </SheetTrigger>

          <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-6">
            <SheetHeader className="px-0 text-left">
              <SheetTitle>Filtros da agenda</SheetTitle>
              <SheetDescription>
                Encontre horários vagos por cargo e disponibilidade.
              </SheetDescription>
            </SheetHeader>

            <FilterFields
              filters={filters}
              onRoleChange={updateRole}
              onAvailabilityChange={updateAvailability}
              className="px-0 py-2"
            />

            {hasActiveFilters ? (
              <Button
                type="button"
                variant="outline"
                className="mt-4 h-11 w-full"
                onClick={clearFilters}
              >
                Limpar filtros
              </Button>
            ) : null}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
