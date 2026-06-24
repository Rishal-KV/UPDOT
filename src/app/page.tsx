import HeadphoneBanner from "@/components/banner/Banner";
import IntroSection from "@/components/intro/IntroSection";
import RangeCarousel from "@/components/carousel/RangeCarousel";
import SoundCustomizer from "@/components/specs/SoundCustomizer";
import Footer from "@/components/footer/Footer";
import StackedFeatures from "@/components/features/StackedFeatures";
import FAQSection from "@/components/faq/FAQSection";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center justify-start pt-4 overflow-x-hidden select-none">
      <Navbar />
      
      <div id="overview" className="w-full px-3 md:px-6 flex justify-center">
        <HeadphoneBanner />
      </div>
      
      <IntroSection />
      
      <div id="features" className="w-full">
        <StackedFeatures />
      </div>
      
      <RangeCarousel />
      
      <div id="customizer" className="w-full">
        <SoundCustomizer />
      </div>
      
      <div id="faq" className="w-full">
        <FAQSection />
      </div>
      
      <Footer />
    </main>
  );
}
