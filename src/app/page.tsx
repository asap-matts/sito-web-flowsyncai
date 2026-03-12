import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import BookingSection from "@/components/BookingSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
export default function Home() {
  return (
    <IntroAnimation>
      <div className="grain-overlay">
        <Header />

        <main>
          <HeroSection />
          <ServicesSection />
          <ProjectsSection />
          <AboutSection />
          <TestimonialsSection />
          <FaqSection />
          <BookingSection />
          <CtaSection />
        </main>

        <Footer />
      </div>
    </IntroAnimation>
  );
}
