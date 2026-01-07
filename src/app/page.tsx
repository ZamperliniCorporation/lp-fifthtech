"use client";

import * as React from "react";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  Home as HomeIcon,
  Users,
  Wrench,
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
import { Typewriter } from "../components/ui/typewriter-text";

export default function Home() {
  const navItems = [
    { name: "Início", url: "#topo", icon: HomeIcon },
    { name: "Sobre", url: "#sobre", icon: Users },
    { name: "Serviços", url: "#servicos", icon: Wrench },
    { name: "FAQ", url: "#faq", icon: HelpCircle },
    { name: "Contato", url: "#contato", icon: Mail },
  ];

  const people = [
    { id: 1, name: "Gustavo Zamperlini", designation: "CEO e CTO", image: "/images/team/gustavo.jpg" },
    { id: 2, name: "Davi Silva", designation: "COO", image: "/images/team/Davi.jpg" },
    { id: 3, name: "Wendel Cinelli", designation: "Back-end developer", image: "/images/team/coxa.jpg" },
    { id: 4, name: "Gustavo Duarte", designation: "Front-end developer", image: "/images/team/negao.jpg" },
    { id: 5, name: "Lucas Silva", designation: "Automações", image: "/images/team/Lucas.jpg" },
    { id: 6, name: "Pedro Henrique", designation: "Marketing", image: "/images/team/PH.jpg" },
  ];

  return (
    <main id="topo" className="relative">
      {/* Logo fixa no desktop (alinhada ao navbar) */}
      <div className="fixed top-8 left-6 right-6 z-[9998] hidden items-center justify-start md:flex">
        <img
          src="/images/logo.png"
          alt="FifthTech"
          className="h-20 w-20 object-contain"
          loading="lazy"
        />
        <span className="sr-only">FifthTech</span>
      </div>

      <NavBar
        items={navItems}
        className="top-4 left-1/2 -translate-x-1/2 right-auto md:top-12 md:left-1/2 md:-translate-x-1/2"
      />

      <Hero
        title={
          <Typewriter
            text="Simples para operar. Forte para escalar."
            speed={70}
            className="inline-block"
          />
        }
        subtitle="Arquitetamos software, automações e integrações de ponta a ponta para que sua operação rode sem atritos, com velocidade, governança e experiência premium para clientes e times."
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tech"
        actions={[
          { label: "Planejar meu próximo ciclo", href: "#contato", variant: "default" },
          { label: "Ver como entregamos", href: "#servicos", variant: "outline" },
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
        brandName="FifthTech"
        logo={
          <div className="grid size-10 place-items-center rounded-xl bg-white text-black font-bold">
            FT
          </div>
        }
        socialLinks={[
          { icon: <Instagram size={16} />, href: "https://www.instagram.com/fift.htech?igsh=MXVmcWF1aWQ2a3lydw%3D%3D&utm_source=qr", label: "Instagram" },
          { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/fifth-tech-14a969398?utm_source=share_via&utm_content=profile&utm_medium=member_ios", label: "LinkedIn" },
          { icon: <MessageCircle size={16} />, href: "https://wa.me/5511983790224?text=Ol%C3%A1!%20Tenho%20interesse%20em%20conhecer%20melhor%20as%20solu%C3%A7%C3%B5es%20da%20FifthTech...", label: "WhatsApp" },
        ]}
        mainLinks={[
          { href: "#topo", label: "Início" },
          { href: "#sobre", label: "Sobre" },
          { href: "#servicos", label: "Serviços" },
          { href: "#faq", label: "FAQ" },
          { href: "#contato", label: "Contato" },
        ]}
        legalLinks={[
          { href: "#", label: "Termos" },
          { href: "#", label: "Privacidade" },
        ]}
        copyright={{
          text: "(c) 2025 FifthTech. Todos os direitos reservados.",
        }}
      />
    </main>
  );
}
