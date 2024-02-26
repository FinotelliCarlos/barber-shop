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
import { Barbershop, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);

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

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

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

              <Sheet>
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
                    <Button disabled={!date || !hour}>Confirmar reverva</Button>
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
