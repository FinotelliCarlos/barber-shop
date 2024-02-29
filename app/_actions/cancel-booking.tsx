"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

interface CancelBookingParams {
  userId: string;
  bookingId: string;
  localePath: string;
}

export const cancelBooking = async ({
  bookingId,
  userId,
  localePath,
}: CancelBookingParams) => {
  const session = await getServerSession(authOptions);

  const sessionUserId: string = (session?.user as any)?.id;

  if (userId === sessionUserId) {
    await db.booking.delete({
      where: {
        userId,
        id: bookingId,
      },
    });

    revalidatePath(localePath);
  }
};
