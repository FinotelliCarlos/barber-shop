"use client";

import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { cancelBooking } from "../_actions/cancel-booking";
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
import { Button } from "./ui/button";

interface CancelBookingButtonProps {
  isConfirmed: boolean;
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const CancelBookingButton = ({
  isConfirmed,
  booking,
}: CancelBookingButtonProps) => {
  const pathname = usePathname();
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);

  const handleCancelBooking = async () => {
    setCancelLoading(true);
    await cancelBooking({
      userId: booking.userId,
      bookingId: booking.id,
      localePath: pathname,
    });

    toast.success("Reserva cancelada com sucesso!");

    setCancelLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={!isConfirmed}
          className="w-full"
          variant="destructive"
        >
          {cancelLoading && <Loader2 className="animate-spin size-4 mr-2" />}
          Cancelar Reserva
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja cancelar esta reserva?</AlertDialogTitle>
          <AlertDialogDescription>
            Uma vez cancelada não é possivel reverter essa ação!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row gap-3">
          <AlertDialogCancel className="w-full m-0">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="w-full"
            onClick={handleCancelBooking}
            disabled={cancelLoading}
          >
            {cancelLoading && <Loader2 className="animate-spin size-4 mr-2" />}
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelBookingButton;
