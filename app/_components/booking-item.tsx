import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  if (!booking) {
    return;
  }

  const bookingConfirmed = isFuture(booking.date);

  return (
    <Card>
      <CardContent className="p-0 flex">
        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
          <Badge
            className="w-fit"
            variant={bookingConfirmed ? "default" : "secondary"}
          >
            {bookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>
                {booking.barbershop.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l flex-1 border-solid border-secondary">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", {
              locale: ptBR,
            })}
          </p>
          <p className="text-2xl">
            {format(booking.date, "dd", {
              locale: ptBR,
            })}
          </p>
          <p className="text-sm">
            {format(booking.date, "hh':'mm", {
              locale: ptBR,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
