"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  const router = useRouter();

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <Card className="w-full rounded-2xl">
      <CardContent className="px-1 pt-1 pb-0">
        <div className="relative w-full h-[159px]">
          <div className="absolute top-2 left-2 z-50">
            <Badge
              variant="secondary"
              className="flex opacity-90 items-center gap-2 justify-center"
            >
              <StarIcon className="fill-primary text-primary" size={12} />{" "}
              <span className="text-xs">5.0</span>
            </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2  overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="w-full mt-3"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
