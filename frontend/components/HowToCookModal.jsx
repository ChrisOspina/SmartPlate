"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChefHat, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HowToCookModal = () => {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setRecipeName(""); // Reset recipe name when dialog is closed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name.");
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
    handleOpenChange(false); // Close the dialog after navigating
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button className="hover:text-green-600 transition-colors flex items-center gap-1.5 text-sm font-medium text-stone-600">
            <ChefHat className="w-4 h-4" />
            How To Cook?
          </button>
        </DialogTrigger>
        <DialogContent className={"max-w-lg"}>
          <DialogHeader>
            <DialogTitle
              className={
                "text-2xl font-serif font-bold flex items-center gap-2"
              }
            >
              <ChefHat className="w-6 h-6 text-green-600" />
              How to Cook?
            </DialogTitle>
            <DialogDescription>
              Enter any recipe name and we&apos;ll show you how to cook it step
              by step!
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                What do you want to cook?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="e.g. Spaghetti Carbonara"
                  className="w-full border border-stone-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <h4 className="text-sm font-semibold text-green-900 mb-2">
                Try These:
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Pancakes",
                  "Chicken Alfredo",
                  "Vegetable Stir Fry",
                  "Beef Tacos",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setRecipeName(suggestion)}
                    className="bg-green-100 hover:bg-green-200 text-green-800 hover:text-green-900 text-sm font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={!recipeName.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Show Me How To Cook It!
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HowToCookModal;
