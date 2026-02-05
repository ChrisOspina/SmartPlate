import { Button } from "@/components/ui/button";
import { PricingTable } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-stone-50 min-h-screen text-stone-900">
      <section className="pt-32 pb-20 px-4">
        <Button variant="primary" size="lg">
          Click Me
        </Button>
      </section>
    </div>
  );
}
