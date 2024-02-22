import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopDetailsPageParams {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params: { id },
}: BarbershopDetailsPageParams) => {
  if (!id) {
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div className="">
      <div className="h-[250px] w-full relative">
        <Button
          variant="outline"
          size="icon"
          className="z-50 top-2 left-2 absolute"
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

        <Image
          fill
          src={barbershop.imageUrl}
          alt={barbershop.name}
          className="object-cover opacity-85"
        />
      </div>

      <div className="pt-3 px-3 pb-6 border-solid border-b border-secondary space-y-2">
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
  );
};

export default BarbershopDetailsPage;
