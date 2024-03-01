import { MenuIcon } from "lucide-react";
import Link from "next/link";
import SideMenu from "./side-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex justify-between flex-row items-center mx-auto p-5">
          <Link href="/">
            <h1 className="text-primary font-bold text-2xl text-center">
              Barber<strong className="text-white">Shop</strong>
            </h1>
          </Link>

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
    </header>
  );
};

export default Header;
