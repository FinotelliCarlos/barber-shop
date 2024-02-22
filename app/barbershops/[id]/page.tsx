import { db } from "@/app/_lib/prisma";
import BarbershopHeading from "./_components/barbershop-heading";

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

  return <BarbershopHeading barbershop={barbershop} />;
};

export default BarbershopDetailsPage;
