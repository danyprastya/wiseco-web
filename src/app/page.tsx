import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortfolioStats from "@/components/PortfolioStats";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PortfolioStats />
        <Services />
        <Projects />
        <Events />
        <Testimonials />
        <Partners />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
