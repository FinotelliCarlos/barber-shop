import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
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

  const session = await getServerSession(authOptions);

  return (
    <div className="">
      <BarbershopHeading barbershop={barbershop} />

      <div className="px-5 space-y-4 py-4">
        {barbershop.services.map((service) => {
          return (
            <ServiceItem
              key={service.id}
              service={service}
              barbershop={barbershop}
              isAuthenticated={!!session?.user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
