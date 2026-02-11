import AboutSection from "@/components/about/About";
import ContactSection from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/home/hero/HeroSection";
import ProjectsSection from "@/components/projectShowCase/Project";
import SkillsSection from "@/components/skill/Skill";
import ServicesSection from "@/components/services/Services";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
