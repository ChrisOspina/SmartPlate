import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import RecipeCard from "@/components/RecipeCard";

const RecipeGrid = ({
  type, // category or cuisine
  value, //the actual category or cuisine value
  fetchAction, //server action to fetch recipes based on the type and value
  backLink = "/dashboard",
}) => {
  const { data, loading, fn: fetchMeals } = useFetch(fetchAction);

  useEffect(() => {
    if (value) {
      //Capitalize first letter for API Call
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
      fetchMeals(formattedValue);
    }
  }, [value]);

  const meals = data?.meals || [];
  const displayName = value?.replace(/-/g, " "); //"example: saudi-arabian" to "Saudi Arabian"

  return (
    <div className="min-h bg-stone-50 pt-14 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-green-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <h1
            className="text-5xl md:text-6xl font-bold text-stone-900 capitalize
          tracking-tight leading-tight"
          >
            {displayName}{" "}
            <span className="text-green-600">
              {type === "cuisine" ? "Cuisine" : "Recipes"}
            </span>
          </h1>

          {!loading && meals.length > 0 && (
            <p className="text-stone-600 mt-2">
              {meals.length} declicious {displayName}{" "}
              {type === "cuisine" ? "recipes" : "meals"} to explore!
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-4" />
            <p className="text-stone-500">Loading recipes</p>
          </div>
        )}

        {!loading && meals.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          lg:grid-cols-4 gap-6"
          >
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} recipe={meal} variant="grid" />
            ))}
          </div>
        )}

        {!loading && meals.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              No recipes found
            </h3>
            <p className="text-stone-500 mb-6">
              We couldn&apos;t find any {displayName}{" "}
              {type === "cuisine" ? "dishes" : "recipes"}.
            </p>
            <Link href={backLink}>
              <span className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold">
                <ArrowLeft className="w-4 h-4" />
                Go back to explore more
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGrid;
