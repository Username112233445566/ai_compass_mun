import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMun from "@/components/AboutMun";
import WhyParticipate from "@/components/WhyParticipate";
import Committees from "@/components/Committees";
import RegistrationForm from "@/components/RegistrationForm";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <Hero />
      <AboutMun />
      <WhyParticipate />
      <Committees />
      <RegistrationForm />
      <Contacts />
      <Footer />
    </main>
  );
}