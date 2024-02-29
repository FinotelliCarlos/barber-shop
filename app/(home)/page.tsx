import { format } from "date-fns";

import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BarberShopItem from "./_components/barbershop-item";
import Search from "./_components/search";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    // get all barbershops
    db.barbershop.findMany({}),

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
    <div className="">
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Ola, Carlos!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM ", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>

      {confirmedBookings.length !== 0 && (
        <div className="mt-6">
          <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">
            Agendamentos
          </h2>

          <div className="px-5 gap-3 overflow-y-auto max-h-[40vh] py-4 [&::-webkit-scrollbar]:hidden flex">
            {confirmedBookings.map((booking) => {
              return <BookingItem key={booking.id} booking={booking} />;
            })}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>

        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>

        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
