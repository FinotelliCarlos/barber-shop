"use server";

import { db } from "@/app/_lib/prisma";

interface createBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const createBooking = async ({
  barbershopId,
  serviceId,
  userId,
  date,
}: createBookingParams) => {
  await db.booking.create({
    data: {
      barbershopId,
      serviceId,
      userId,
      date,
    },
  });
};
