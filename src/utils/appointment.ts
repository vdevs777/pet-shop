import {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodPartOfTheDay,
} from "@/types/appointment";

import { Appointment as PrismaAppointment } from "@/generated/prisma/client";

export const APPOINTMENTS_DATA = [
  {
    id: "1",
    petName: "Rex",
    description: "Consulta",
    tutorName: "João",
    phone: "1234567890",
    scheduledAt: new Date("2025-08-17T10:00:00"),
  },
  {
    id: "2",
    petName: "Mimi",
    tutorName: "Maria",
    description: "Banho",
    phone: "1234567890",
    scheduledAt: new Date("2025-08-17T11:00:00"),
  },
  {
    id: "3",
    petName: "Nina",
    tutorName: "Natalia",
    description: "Consulta",
    phone: "1234567890",
    scheduledAt: new Date("2025-08-17T14:00:00"),
  },
  {
    id: "4",
    petName: "Nina",
    tutorName: "Natalia",
    description: "Consulta",
    phone: "1234567890",
    scheduledAt: new Date("2025-08-17T19:00:00"),
  },
];

export function getPeriod(hour: number): AppointmentPeriodPartOfTheDay {
  if (hour >= 9 && hour < 12) return "morning";
  if (hour >= 13 && hour < 18) return "afternoon";
  else return "evening";
}

export function groupAppointmentsByPeriod(
  appointments: PrismaAppointment[],
): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] = appointments.map(
    (appointment) => ({
      ...appointment,
      time: formatDateTime(appointment.scheduledAt),
      service: appointment.description,
      period: getPeriod(parseInt(formatDateTime(appointment.scheduledAt))),
    }),
  );

  const morningAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === "morning",
  );

  const afternoonAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === "afternoon",
  );

  const eveningAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === "evening",
  );

  return [
    {
      title: "Manhã",
      type: "morning",
      timeRange: "09h-12h",
      appointments: morningAppointments,
    },
    {
      title: "Tarde",
      type: "afternoon",
      timeRange: "13h-18h",
      appointments: afternoonAppointments,
    },
    {
      title: "Noite",
      type: "evening",
      timeRange: "19h-21h",
      appointments: eveningAppointments,
    },
  ];
}

export function calculatePeriod(hour: number) {
  const isMorning = hour >= 9 && hour < 12;
  const isAfternoon = hour >= 13 && hour < 18;
  const isEvening = hour >= 19 && hour < 21;

  return { isMorning, isAfternoon, isEvening };
}

export function formatDateTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  });
}
