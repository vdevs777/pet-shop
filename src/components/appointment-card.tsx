"use client";

import { Appointment } from "@/types/appointment";
import { cn } from "@/lib/utils";
import { AppointmentForm } from "./appointment-form";
import { Button } from "./ui/button";
import { Loader2, Pen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";
import { deleteAppointment } from "@/app/actions";
import { toast } from "sonner";

interface AppointmentCardProps {
  appointment: Appointment;
  isFirstInSection?: boolean;
}

export function AppointmentCard({
  appointment,
  isFirstInSection = false,
}: AppointmentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    const result = await deleteAppointment(appointment.id);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Agendamento removido com sucesso!");

    setIsDeleting(false);
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] items-center py-3",
        !isFirstInSection && "border-t border-[#2E2C30]",
      )}
    >
      <div className="text-left pr-4 md:pr-0">
        <span className="text-label-small text-content-primary font-semibold">
          {appointment.time}
        </span>
      </div>
      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center justify-end md:justify-start gap-1">
          <span className="text-label-small-size text-content-primary font-semibold">
            {appointment.petName}
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            /
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            {appointment.tutorName}
          </span>
        </div>
      </div>
      <div className="text-left pr-4 hidden md:block mt-1 md:mt-0 col-span-2 md:col-span-1">
        <span className="text-paragraph-small-size text-content-secondary">
          {appointment.description}
        </span>
      </div>
      <div className="text-right mt-2 md:mt-0 col-span-2 md:col-span-1 flex justify-end items-center gap-2">
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <Pen />
          </Button>
        </AppointmentForm>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="remove" size="icon">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remover agendamento</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover este agendamento? Esta ação não
                pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && <Loader2 className="mr-2 size-4 animate-spin" />}
                Confirmar remoção
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
