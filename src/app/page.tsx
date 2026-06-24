import HeadphoneBanner from "@/components/banner/Banner";
import IntroSection from "@/components/intro/IntroSection";
import RangeCarousel from "@/components/carousel/RangeCarousel";
import SoundCustomizer from "@/components/specs/SoundCustomizer";
import Footer from "@/components/footer/Footer";
import StackedFeatures from "@/components/features/StackedFeatures";
import FAQSection from "@/components/faq/FAQSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center justify-start pt-4 overflow-x-hidden select-none">
      <div className="w-full px-3 md:px-6 flex justify-center">
        <HeadphoneBanner />
      </div>
      <IntroSection />
      <StackedFeatures />
      <RangeCarousel />
      <SoundCustomizer />
      <FAQSection />
      <Footer />
    </main>
  );
}
