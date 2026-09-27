import { FareAlerts } from "@/components/home/FareAlerts";
import { FareDeals } from "@/components/home/FareDeals";
import { Hero } from "@/components/home/Hero";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyFlyway } from "@/components/home/WhyFlyway";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PopularDestinations />
      <FareDeals />
      <WhyFlyway />
      <Testimonials />
      <FareAlerts />
    </>
  );
}
