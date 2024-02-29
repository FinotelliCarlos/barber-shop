"use client";

import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { cancelBooking } from "../_actions/cancel-booking";
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
    <Button
      disabled={!isConfirmed || cancelLoading}
      className="w-full"
      variant="destructive"
      onClick={handleCancelBooking}
    >
      {cancelLoading && <Loader2 className="animate-spin size-4 mr-2" />}
      Cancelar Reserva
    </Button>
  );
};

export default CancelBookingButton;
