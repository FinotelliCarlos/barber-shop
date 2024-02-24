import { MenuIcon } from "lucide-react";
import Image from "next/image";
import SideMenu from "./side-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="size-8">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
