import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import OrderSection from "@/components/OrderSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        /* 64px bottom padding on mobile for the sticky order bar */
        style={{ paddingBottom: "64px" }}
      >
        <HeroSection />
        <FeatureCards />
        {/* id="product" anchor for "Discover Our Product" hero CTA */}
        <div id="product">
          <AboutSection />
        </div>
        <ReviewsSection />
        <OrderSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
