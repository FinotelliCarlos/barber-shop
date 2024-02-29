import { format } from "date-fns";

import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import Search from "./_components/search";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recomendedBarbershops, confirmedBookings] =
    await Promise.all([
      // get all barbershops
      db.barbershop.findMany({}),

      // recomended sort
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),

      // get bookings
      db.booking.findMany({
        where: {
          userId: (session?.user as any)?.id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: true,
          barbershop: true,
        },
      }),
    ]);

  return (
    <>
      <Header />
      <div className="container px-5 ">
        <div className="pt-5">
          <h2 className="text-xl font-bold capitalize">
            Ola, {session?.user ? session?.user?.name?.split(" ")[0] : "Amigo"}!
          </h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM ", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className=" mt-6">
          <Search />
        </div>

        {confirmedBookings.length !== 0 && (
          <div className="mt-6">
            <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">
              Agendamentos
            </h2>

            <div className="gap-3 overflow-y-auto max-h-[40vh] py-4 [&::-webkit-scrollbar]:hidden flex">
              {confirmedBookings.map((booking) => {
                return <BookingItem key={booking.id} booking={booking} />;
              })}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
            Recomendados
          </h2>

          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {recomendedBarbershops.map((barbershop) => {
              return (
                <div
                  key={barbershop.id}
                  className="min-w-[167px] max-w-[167px]"
                >
                  <BarberShopItem barbershop={barbershop} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
            Populares
          </h2>

          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => {
              return (
                <div
                  key={barbershop.id}
                  className="min-w-[167px] max-w-[167px]"
                >
                  <BarberShopItem barbershop={barbershop} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
