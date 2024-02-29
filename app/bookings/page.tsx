import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    // confirmed
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

    // finished
    db.booking.findMany({
      where: {
        userId: (session?.user as any)?.id,
        date: {
          lt: new Date(),
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
      <div className="px-5 py-6 space-y-6 container">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length !== 0 && (
          <>
            <h2 className="uppercase text-gray-400 font-bold text-sm">
              Agendamentos ({confirmedBookings.length})
            </h2>

            <div className="grid sm:grid-cols-2 grid-cols-1 mt-3 gap-3">
              {confirmedBookings.map((booking) => {
                return <BookingItem key={booking.id} booking={booking} />;
              })}
            </div>
          </>
        )}

        {finishedBookings.length !== 0 && (
          <>
            <h2 className="uppercase text-gray-400 font-bold text-sm">
              Finalizados ({finishedBookings.length})
            </h2>

            <div className="grid sm:grid-cols-2 grid-cols-1 mt-3 gap-3">
              {finishedBookings.map((booking) => {
                return <BookingItem key={booking.id} booking={booking} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
