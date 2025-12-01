import Hero from "@/components/Hero";
import PortfolioStats from "@/components/PortfolioStats";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import YoutubeVideos from "@/components/YoutubeVideos";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioStats />
      <Services />
      <Projects />
      <Testimonials />
      <Events />
      <YoutubeVideos />
      <Partners />
    </>
  );
}
