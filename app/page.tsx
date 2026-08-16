import { BookingSection } from "@/components/booking-section";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { Pricing } from "@/components/pricing";
import { ServiceArea } from "@/components/service-area";
import { Testimonials } from "@/components/testimonials";
import { WaveDivider } from "@/components/wave-divider";
import { BookingProvider } from "@/lib/booking-context";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <WaveDivider />
        <Gallery />
        <WaveDivider flip />
        <Pricing />
        <WaveDivider />
        <ServiceArea />
        <WaveDivider flip />
        <Testimonials />
        <WaveDivider />
        <Faq />
        <WaveDivider flip />
        <BookingSection />
      </main>
      <Footer />
      <MobileStickyCta />
    </BookingProvider>
  );
}
