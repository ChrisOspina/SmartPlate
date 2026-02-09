import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Flame, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FEATURES } from "@/lib/data";
import { HOW_IT_WORKS_STEPS } from "@/lib/data";
import PricingSection from "@/components/PricingSection";

export default async function Home() {
  const { has } = await auth();
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className=" min-h-screen bg-stone-50 text-stone-900">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6wl mx-auto">
          <div className="flex flex-col md:flex-row item-center gap-12 md:gap-20">
            <div>
              <Badge
                variant="outline"
                className="border-2 border-green-600 text-green-700 bg-green-50
              text-sm font-bold mb-6 uppercase tracking-wide"
              >
                <Flame className="mr-1" />
                #1 AI Cooking Assistant
              </Badge>
              <h1
                className="text-6xl md:text-8xl font-bold mb-6 leading-[0.9]
              tracking-tight"
              >
                Turn your{" "}
                <span className="italic underline decoration-4 decoration-green-600">
                  leftovers{" "}
                </span>{" "}
                into
                <br />
                masterpieces.
              </h1>
              <p
                className="text-xl md:text-2xl text-stone-600 mb-10 max-w-lg- mx-auto
                md:mx-0 font-light"
              >
                Snap a photo of your ingredients and get instant recipe ideas.
              </p>

              <Link href={"/dashboard"}>
                <Button
                  size="xl"
                  variant="primary"
                  className={"px-8 py-6 text-lg"}
                >
                  Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <Card
              className={
                "relative aspect-square md:aspect-4/5 border-4 border-stone-900 bg-stone-200 overflow-hidden py-0"
              }
            >
              <Image
                src="/heroimage.png"
                alt="Hero Image"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <Card
                className={
                  "absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm border-2 border-stone-900 py-0"
                }
              >
                <CardContent className={"p-4"}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        Grilled Chicken with mixed vegetables
                      </h3>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-500 text-yellow-500"
                          />
                        ))}
                      </div>
                      <Badge
                        variant="outline"
                        className="border-2 border-green-600 text-green-700 bg-green-50
                      text-sm font-bold mt-2 uppercase tracking-wide"
                      >
                        98% MATCH
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Your Smart Kitchen
            </h2>
            <p className="text-stone-600 text-xl font-light">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-stone-200 bg-white hover:border-green-600 hover:shadow-lg transition-all group py-0"
                >
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="border-2 border-stone-200 bg-green-50 p-3 group-hover:border-green-600 group-hover:bg-green-100 transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-stone-100 text-stone-600 uppercase tracking-wide border border-stone-200"
                      >
                        {feature.limit}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-stone-600 text-lg font-light">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-24 px-4 border-y-2 border-stone-200 bg-gray-900 text-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16">
            Cook in 3 Steps
          </h2>

          <div className="space-y-12">
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <div key={i}>
                <div className="flex gap-6 items-start">
                  <Badge
                    variant="outline"
                    className="text-6xl font-bold text-green-500 border-none bg-transparent p-0 h-auto"
                  >
                    {item.step}
                  </Badge>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-lg text-stone-400 font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <hr className="my-8 bg-stone-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing - Now Using Component */}
      <section className="py-24 px-4">
        <PricingSection subscriptionTier={subscriptionTier} />
      </section>
    </div>
  );
}
