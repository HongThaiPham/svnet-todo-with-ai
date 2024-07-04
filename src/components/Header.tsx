import React from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Menu, Search, CircleUser } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserProfile from "./UserProfile";
import { primaryNavItems } from "@/lib/menu-items";
import Link from "next/link";
import { signOutAction } from "@/actions/auth-actions";
import SearchForm from "./navbar/SearchForm";
import Image from "next/image";
type Props = {
  navTitle?: string;
  navLink?: string;
};

const Header: React.FC<Props> = ({ navLink, navTitle }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <VisuallyHidden.VisuallyHidden>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>
              Main navigation for the application.
            </SheetDescription>
          </VisuallyHidden.VisuallyHidden>

          <nav className="grid gap-2 text-lg font-medium">
            <UserProfile />

            {primaryNavItems.map((item) => (
              <Link
                href={item.link}
                key={item.name}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="flex items-center mt-6 mb-2">
              <p className="flex flex-1 text-base">My Projects</p>
            </div>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex items-center md:justify-between w-full gap-1 md:gap-2 py-2">
        <div className="lg:flex-1">
          <Link href={navLink || "#"}>
            <p className="text-sm font-semibold text-foreground/70 w-24">
              {navTitle}
            </p>
          </Link>
        </div>
        <div className="place-content-center w-full flex-1">
          <SearchForm />
        </div>
        {/* <div className="place-content-center w-12 h-12 lg:w-16 lg:h-20">
          <Image alt="logo" src={todovexLogo} />
        </div> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="lg:w-full">
            <form action={signOutAction}>
              <button type="submit" className="hover:text-rose-500">
                Sign out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
