"use client";

import Header from "@/app/_components/header";
import SideMenu from "@/app/_components/side-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopHeadingProps {
  barbershop: Barbershop;
}

const BarbershopHeading = ({ barbershop }: BarbershopHeadingProps) => {
  const router = useRouter();

  const handleBackToHomePage = () => {
    router.replace("/");
  };

  return (
    <div className="">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="h-[250px] container relative block sm:hidden">
        <Button
          variant="outline"
          size="icon"
          className="z-50 top-2 left-2 absolute"
          onClick={handleBackToHomePage}
        >
          <ChevronLeftIcon size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="z-50 top-2 right-2 absolute"
        >
          <MenuIcon size={16} />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="z-50 top-2 right-2 absolute"
            >
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          fill
          src={barbershop.imageUrl}
          alt={barbershop.name}
          className="object-cover opacity-85"
        />
      </div>

      <div className="flex flex-row gap-3 items-center justify-start border-solid border-b border-secondary container pt-3 px-3 pb-6 ">
        <div className="hidden sm:block">
          <Avatar className="size-16">
            <AvatarImage src={barbershop.imageUrl} />
            <AvatarFallback>{barbershop.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-xl">{barbershop.name}</h1>
          <div className="flex items-center gap-1">
            <MapPinIcon className="text-primary" size={18} />
            <p className="text-sm">{barbershop.address}</p>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="text-primary" size={18} />
            <p className="text-sm">4.7 (754 avaliações)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopHeading;
