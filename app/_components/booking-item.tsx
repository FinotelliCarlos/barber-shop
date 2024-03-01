import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import BookingInfo from "./booking-info";
import CancelBookingButton from "./cancel-booking-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

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
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
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
                {format(booking.date, "hh:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col justify-between">
        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden px-5">
          <SheetHeader className="px-5 text-left py-6 border-b border-solid border-secondary">
            <SheetTitle>Informações da reserva</SheetTitle>
          </SheetHeader>

          <div className="relative h-[180px] w-full mt-6">
            <Image
              fill
              src={booking.barbershop.imageUrl}
              alt={booking.barbershop.name}
              className="object-cover opacity-60"
            />

            <div className="absolute w-full bottom-4 flex items-center justify-center left-0 px-5">
              <Card className="w-full">
                <CardContent className="flex p-3 gap-3 items-center">
                  <Avatar className="size-12">
                    <AvatarImage src={booking.barbershop.imageUrl} />
                    <AvatarFallback>
                      {booking.barbershop.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col text-left">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            className="w-fit my-6"
            variant={bookingConfirmed ? "default" : "secondary"}
          >
            {bookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <BookingInfo
            booking={{
              barbershop: booking.barbershop,
              service: booking.service,
              date: booking.date,
            }}
          />
        </div>

        <SheetFooter className="mt-6 flex-row gap-3 px-5 pb-6">
          <SheetClose asChild>
            <Button className="w-full" variant="secondary">
              Fechar
            </Button>
          </SheetClose>

          {bookingConfirmed && (
            <CancelBookingButton
              isConfirmed={bookingConfirmed}
              booking={booking}
            />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
