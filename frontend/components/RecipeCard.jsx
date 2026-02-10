import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ChefHat, ArrowLeft, Loader2 } from "lucide-react";

const RecipeCard = ({ recipe, variant = "default" }) => {
  const getRecipeData = () => {
    //For MealDB recipes (catergory/cuisine pages)
    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}&id=${recipe.idMeal}`,
        showImage: true,
      };
    }

    //more conditions

    return {};
  };

  const data = getRecipeData();

  if (variant === "grid") {
    return (
      <Link href={data.href}>
        <Card className="rounded-none overflow-hidden border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group pt-0">
          {/* Image */}
          {data.showImage ? (
            <div className="relative aspect-square">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">
                    Click to view recipe
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Fallback gradient background when no image
            <div className="relative aspect-square bg-linear-to-br from-green-400 via-lime-400 to-yellow-400 flex items-center justify-center">
              <ChefHat className="w-20 h-20 text-white/30" />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Title */}
          <CardHeader>
            <CardTitle className="text-lg font-bold text-stone-900 group-hover:text-green-600 transition-colors line-clamp-2">
              {data.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  return <></>;
};

export default RecipeCard;
