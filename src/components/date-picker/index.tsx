"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { addDays, format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { NavigationButton } from "./navigation-button";

export function DatePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date");

  const getInitialDate = useCallback(() => {
    if (!dateParam) return new Date();

    const [year, month, day] = dateParam.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    return isValid(parsedDate) ? parsedDate : new Date();
  }, [dateParam]);

  const [date, setDate] = useState<Date | undefined>(getInitialDate());
  const [isOpen, setIsOpen] = useState(false);

  const updateURLWithDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("date", format(selectedDate, "yyyy-MM-dd"));

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleNavigateDay = (days: number) => {
    const newDate = addDays(date || new Date(), days);

    updateURLWithDate(newDate);
  };

  const handleSelectDate = (selectedDate: Date | undefined) => {
    updateURLWithDate(selectedDate);

    setIsOpen(false);
  };

  useEffect(() => {
    const newDate = getInitialDate();

    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate);
    }
  }, [date, getInitialDate]);

  return (
    <div className="flex items-center gap-2">
      <NavigationButton
        tooltipText="Dia anterior"
        onClick={() => handleNavigateDay(-1)}
      >
        <ChevronLeft className="size-4" />
      </NavigationButton>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="min-w-45 h-10 justify-between text-left font-normal bg-transparent 
            border-border-primary text-content-primary hover:bg-background-tertiary 
            hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 
            focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand 
            focus-visible:border-border-brand"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-content-brand" />
              {date ? (
                format(date, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </div>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            autoFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      <NavigationButton
        tooltipText="Dia seguinte"
        onClick={() => handleNavigateDay(11)}
      >
        <ChevronRight className="size-4" />
      </NavigationButton>
    </div>
  );
}
