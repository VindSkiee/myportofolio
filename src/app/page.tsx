import AboutSection from "@/components/about/About";
import ContactSection from "@/components/contact/Contact";
import HeroSection from "@/components/home/hero/HeroSection";
import SkillsSection from "@/components/skill/Skill";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
