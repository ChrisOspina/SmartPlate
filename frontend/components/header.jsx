import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Cookie, Refrigerator } from "lucide-react";
import UserDropdown from "./UserDropdown";

const Header = async () => {
  const user = null; // Replace with actual user fetching logic if needed

  return (
    <header
      className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80
      backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"}>
          <Image
            src="/SmartPlateLogo.png"
            width={80}
            height={80}
            className="w-16"
            alt="SmartPlate Logo"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          <Link
            href="/recipes"
            className="hover:text-green-600 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-green-600 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserDropdown />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className={
                  "text-stone-600 hover:text-green-600  hover:bg-green-50 font-medium"
                }
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="primary" className={"rounded-full px-6"}>
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
          {/* Show the user button when the user is signed in */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
