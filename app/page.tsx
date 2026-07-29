import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import CompareTeaser from "@/components/CompareTeaser";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <CompareTeaser />
      <PricingSection />
      <FAQSection />
    </>
  );
}
