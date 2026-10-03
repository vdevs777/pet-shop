export type AppointmentPeriodPartOfTheDay = "morning" | "afternoon" | "evening";

export type Appointment = {
  id: string;
  time: string;
  petName: string;
  tutorName: string;
  phone: string;
  description: string;
  scheduledAt: Date;
  period: AppointmentPeriodPartOfTheDay;
};

export type AppointmentPeriod = {
  title: string;
  type: AppointmentPeriodPartOfTheDay;
  timeRange: string;
  appointments: Appointment[];
};
