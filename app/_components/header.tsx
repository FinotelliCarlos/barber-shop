import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex justify-between flex-row items-center mx-auto p-5">
        <Image
          src="/logo.png"
          alt="Barber Shop Logo"
          height={22}
          width={120}
          loading="eager"
        />

        <Button variant="outline" size="icon" className="size-8">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
