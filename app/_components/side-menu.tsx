"use client";

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";

const SideMenu = () => {
  const { status, data } = useSession();

  const handleSignIn = async () => {
    await signIn("google");
  };

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <SheetHeader className="border-b border-solid border-secondary p-5 mb-4">
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {status === "authenticated" && (
        <div className="flex justify-between items-center  px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image as string} />

              <AvatarFallback>
                {data.user?.name?.charAt(0) as string}
              </AvatarFallback>
            </Avatar>

            <h2 className="font-bold">{data.user?.name}</h2>
          </div>

          <Button
            size="icon"
            variant="secondary"
            className="size-8"
            onClick={handleSignOut}
          >
            <LogOutIcon size={18} />
          </Button>
        </div>
      )}

      {status === "unauthenticated" && (
        <div className="space-y-4 px-5 py-6">
          <div className="flex items-center gap-3 ">
            <UserIcon />
            <h2>Olá faça seu login!</h2>
          </div>

          <Button
            onClick={handleSignIn}
            className="w-full flex gap-3"
            variant="secondary"
          >
            <LogInIcon />
            Fazer login com google
          </Button>
        </div>
      )}

      {status === "loading" && (
        <div className="w-full px-5 py-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>

            <Skeleton className="h-8 w-8" />
          </div>

          <div className="flex flex-col space-y-3">
            <Skeleton className="w-full bg-secondary h-10" />
            <Skeleton className="w-full bg-secondary h-10" />
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-3 px-5">
        <Button
          className="w-full flex gap-2 justify-start"
          variant="outline"
          asChild
        >
          <Link href="/">
            <HomeIcon />
            Inicio
          </Link>
        </Button>

        {status === "authenticated" && (
          <Button
            className="w-full flex gap-2 justify-start"
            variant="outline"
            asChild
          >
            <Link href="/bookings">
              <CalendarIcon />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
