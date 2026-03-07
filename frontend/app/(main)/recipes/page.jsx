"use client";

import React, { useEffect } from "react";
import { Bookmark, ChefHat, Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { getSavedRecipes } from "@/actions/recipe.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";

const SavedRecipesPage = () => {
  const {
    loading,
    data: recipesData,
    fn: fetchRecipes,
  } = useFetch(getSavedRecipes);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const recipes = recipesData?.recipes || [];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-1 mb-8">
          <Bookmark className="w-25 h-25 text-green-600" />
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
              My Saved Recipes
            </h1>
            <p className="text-lg text-stone-600">
              Your personal collection of favorite recipes
            </p>
          </div>
        </div>

        {/*Loading State*/}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-6" />
            <p className="text-lg text-stone-600">
              Loading your saved recipes...
            </p>
          </div>
        )}

        {/*Recipes List*/}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} variant="list" />
            ))}
          </div>
        )}

        {/*Empty State*/}
        {!loading && recipes.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-stone-200">
            <div className="bg-green-50 w-20 h-20 rounded-full items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              You haven&apos;t saved any recipes yet. Start exploring and
              bookmark your
            </h3>
            <p className="text-stone-600 mb-8 max-w-wd mx-auto">
              Start exploring recipes and save your favorites to build your
              personal cookbook. Your saved recipes will appear here for easy
              access whenever you need them.
            </p>
            <Link href="/recipes">
              <Button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors">
                <ChefHat className="w-5 h-5 inline-block mr-2" />
                Explore Recipes
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipesPage;
