"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface createBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
  localePath: string;
}

export const createBooking = async ({
  barbershopId,
  serviceId,
  userId,
  date,
  localePath,
}: createBookingParams) => {
  await db.booking.create({
    data: {
      barbershopId,
      serviceId,
      userId,
      date,
    },
  });

  revalidatePath(localePath);
};
