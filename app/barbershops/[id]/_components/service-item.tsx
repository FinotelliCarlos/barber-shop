"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createBooking } from "../_actions/create-booking";
import { getDayBookings } from "../_actions/get-day-bookings";
import { generateDayTimeList } from "../_helpers/hours";
import { priceFormat } from "../_helpers/price-format";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const router = useRouter();
  const { data } = useSession();
  const pathname = usePathname();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);
  const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false);
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  console.log(dayBookings);

  const handleDateClick = (currDate: Date | undefined) => {
    setDate(currDate);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingClick = async () => {
    if (!isAuthenticated) {
      await signIn("google");
    }
  };

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);
    if (!isAuthenticated) {
      await signIn("google");
    }

    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await createBooking({
        barbershopId: barbershop.id,
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
        localePath: pathname,
      });

      setSheetIsOpen(false);
      setDate(undefined);
      setHour(undefined);
      toast.success("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'ás' HH':'mm", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const bookings = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!bookings) {
        return true;
      }

      return false;
    });
  }, [date, dayBookings]);

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const days = await getDayBookings(barbershop.id, date);

      setDayBookings(days);
    };

    refreshAvailableHours();
  }, [barbershop.id, date]);

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-2">
          <div className="relative min-w-[110px] max-w-[110px] min-h-[110px] max-h-[110px] rounded-lg">
            <Image
              className="object-contain rounded-lg"
              alt={service.name}
              src={service.imageUrl}
              fill
            />
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex- flex-col">
              <h2 className="font-bold">{service.name}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-primary font-bold">
                {priceFormat(Number(service.price))}
              </p>

              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0 flex flex-col justify-between">
                  <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                      <SheetTitle>Fazer reserva</SheetTitle>
                    </SheetHeader>

                    <div className="py-6 px-5 border-b border-solid border-secondary">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateClick}
                        locale={ptBR}
                        fromDate={new Date()}
                        styles={{
                          head_cell: {
                            width: "100%",
                            textTransform: "capitalize",
                          },
                          cell: {
                            width: "100%",
                          },
                          button: {
                            width: "100%",
                          },
                          nav_button_previous: {
                            width: "32px",
                            height: "32px",
                          },
                          nav_button_next: {
                            width: "32px",
                            height: "32px",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </div>

                    {date && (
                      <div className="flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden py-6 px-5 bordet-y border-solid border-secondary">
                        {timeList.map((time) => {
                          return (
                            <Button
                              variant={hour === time ? "default" : "outline"}
                              className="rounded-full"
                              onClick={() => handleHourClick(time)}
                              key={time}
                            >
                              {time}
                            </Button>
                          );
                        })}
                      </div>
                    )}

                    <div className="py-6 px-5 border-t border-solid border-secondary">
                      <Card>
                        <CardContent className="p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <h2 className="font-bold">{service.name}</h2>
                            <h3 className="text-sm font-bold">
                              {priceFormat(Number(service.price))}
                            </h3>
                          </div>

                          {date && (
                            <div className="flex justify-between items-center">
                              <h3 className="text-gray-400">Data</h3>
                              <h4 className="text-sm">
                                {format(date, "dd' de 'MMMM'", {
                                  locale: ptBR,
                                })}
                              </h4>
                            </div>
                          )}

                          {hour && (
                            <div className="flex justify-between items-center">
                              <h3 className="text-gray-400">Horário</h3>
                              <h4 className="text-sm">{hour}</h4>
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <h3 className="text-gray-400">Barbearia</h3>
                            <h4 className="text-sm">{barbershop.name}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <SheetFooter className="px-5 pb-6">
                    <Button
                      disabled={!date || !hour || submitIsLoading}
                      onClick={handleBookingSubmit}
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      )}
                      Confirmar reverva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
