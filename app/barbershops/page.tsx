import { redirect } from "next/navigation";
import BarberShopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({
  searchParams: { search },
}: BarbershopsPageProps) => {
  if (!search) {
    return redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6 flex flex-col gap-6 container">
        <Search defaultValues={{ search }} />

        <h1 className="text-gray-400 font-bold text-xs">
          Resultados para &quot;{search}&quot;
        </h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map((barbershop) => {
            return (
              <div key={barbershop.id} className="w-full">
                <BarberShopItem barbershop={barbershop} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BarbershopsPage;

// http://localhost:3000/barbershops?search=123
