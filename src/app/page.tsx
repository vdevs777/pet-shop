import { endOfDay, parseISO, startOfDay } from "date-fns";

import { prisma } from "@/lib/prisma";

import { groupAppointmentsByPeriod } from "@/utils/appointment";

import { AppointmentForm } from "@/components/appointment-form";
import { PeriodSection } from "@/components/period-section";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const selectedDate = date ? parseISO(date) : new Date();

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduledAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: { scheduledAt: "asc" },
  });

  const periods = groupAppointmentsByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <DatePicker />
        </div>
      </div>
      <div className="mt-3 mb-4 md:hidden">
        <DatePicker />
      </div>
      <div className="pb-24 w-full md:pb-0 pt-8">
        {periods.map((period, index) => (
          <PeriodSection period={period} key={index} />
        ))}
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 flex justify-center bg-background-tertiary py-4.5 px-6 
        md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transaparent md:p-0"
      >
        <AppointmentForm
          children={
            <Button variant="brand" className="uppercase">
              Novo agendamento
            </Button>
          }
        />
      </div>
    </div>
  );
}
