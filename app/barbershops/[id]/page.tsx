import { db } from "@/app/_lib/prisma";
import BarbershopHeading from "./_components/barbershop-heading";
import ServiceItem from "./_components/service-item";

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
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div className="">
      <BarbershopHeading barbershop={barbershop} />

      <div className="px-5 space-y-4 py-4">
        {barbershop.services.map((service) => {
          return <ServiceItem key={service.id} service={service} />;
        })}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
