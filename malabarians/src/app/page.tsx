import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import OrderSection from "@/components/OrderSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* id="product" anchor for hero CTA */}
        <div id="product">
          <AboutSection />
        </div>
        <ReviewsSection />
        <OrderSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
