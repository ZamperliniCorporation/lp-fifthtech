"use client";

import * as React from "react";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  Home as HomeIcon,
  Users,
  Sparkles,
  HelpCircle,
  Mail,
} from "lucide-react";

import { Hero } from "../sections/hero";
import { Services } from "../sections/services";
import About from "../sections/about";
import { FaqSection } from "../sections/faq";
import { CTASection } from "../sections/cta";
import { NavBar } from "../components/ui/tubelight-navbar";
import { Footer } from "../components/ui/footer";

export default function Home() {
  const navItems = [
    { name: "Inicio", url: "#topo", icon: HomeIcon },
    { name: "Sobre", url: "#sobre", icon: Users },
    { name: "Servicos", url: "#servicos", icon: Sparkles },
    { name: "FAQ", url: "#faq", icon: HelpCircle },
    { name: "Contato", url: "#contato", icon: Mail },
  ];

  const people = [
    { id: 1, name: "Gustavo Zamperlini", designation: "CEO and CTO", image: "/images/team/gustavo.jpg" },
    { id: 2, name: "Davi Silva", designation: "COO", image: "/images/team/Davi.jpg" },
    { id: 3, name: "Wendel Cinelli", designation: "Back-end developer", image: "/images/team/coxa.jpg" },
    { id: 4, name: "Gustavo Duarte", designation: "Front-end developer", image: "/images/team/negao.jpg" },
    { id: 5, name: "Lucas Silva", designation: "Automacoes", image: "/images/team/Lucas.jpg" },
    { id: 6, name: "Pedro Henrique", designation: "Marketing", image: "/images/team/PH.jpg" },
  ];

  return (
    <main id="topo" className="relative">
      <NavBar items={navItems} />

      <Hero
        title="Bem-vindo a Fifth Tech"
        subtitle="Modernizamos processos com Softwares sob medida, automacoes e integracoes com padrao premium e foco em eficiencia real."
        actions={[
          { label: "Falar conosco", href: "#contato", variant: "default" },
          { label: "Ver entregas", href: "#servicos", variant: "outline" },
        ]}
        subtitleClassName="max-w-[760px]"
      />

      <About people={people} />

      <Services />

      <FaqSection />

      <section id="contato" className="mx-auto max-w-6xl px-6 py-24">
        <CTASection />
      </section>

      <Footer
        brandName="Fifth Tech"
        logo={
          <div className="grid size-10 place-items-center rounded-xl bg-white text-black font-bold">
            FT
          </div>
        }
        socialLinks={[
          { icon: <Instagram size={16} />, href: "https://instagram.com", label: "Instagram" },
          { icon: <Linkedin size={16} />, href: "https://linkedin.com", label: "LinkedIn" },
          { icon: <MessageCircle size={16} />, href: "https://wa.me/", label: "WhatsApp" },
        ]}
        mainLinks={[
          { href: "#topo", label: "Inicio" },
          { href: "#sobre", label: "Sobre" },
          { href: "#servicos", label: "Servicos" },
          { href: "#faq", label: "FAQ" },
          { href: "#contato", label: "Contato" },
        ]}
        legalLinks={[
          { href: "#", label: "Termos" },
          { href: "#", label: "Privacidade" },
        ]}
        copyright={{
          text: "(c) 2025 Fifth Tech. Todos os direitos reservados.",
        }}
      />
    </main>
  );
}
