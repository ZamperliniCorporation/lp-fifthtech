"use client";

import * as React from "react";
import { Hero } from "../sections/hero";
import { NavBar } from "../components/ui/tubelight-navbar";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

// Adapt icons to match the expected ForwardRefExoticComponent<...> signature from NavBar
const HomeIcon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> = React.forwardRef<
  SVGSVGElement,
  LucideProps
>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10.5V20h14v-9.5" />
  </svg>
));
HomeIcon.displayName = "HomeIcon";

const SparkIcon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> = React.forwardRef<
  SVGSVGElement,
  LucideProps
>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 3v6" />
    <path d="m16 7-4 2" />
    <path d="m8 7 4 2" />
    <path d="M6 13h12" />
    <path d="m16 17-4-2" />
    <path d="m8 17 4-2" />
    <path d="M12 15v6" />
  </svg>
));
SparkIcon.displayName = "SparkIcon";

const MailIcon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> = React.forwardRef<
  SVGSVGElement,
  LucideProps
>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
));
MailIcon.displayName = "MailIcon";

export default function Home() {
  const navItems = [
    { name: "Início", url: "#topo", icon: HomeIcon },
    { name: "Serviços", url: "#servicos", icon: SparkIcon },
    { name: "Contato", url: "#contato", icon: MailIcon },
  ];

  return (
    <main id="topo" className="relative">
      <NavBar items={navItems} />
      <Hero
        title="Bem-vindo à Fifth Tech"
        subtitle="Modernizamos processos com Softwares sob medida, automações e integrações com padrão premium e foco em eficiência real."
        actions={[
          { label: "Falar conosco", href: "#contato", variant: "default" },
          { label: "Ver entregas", href: "#servicos", variant: "outline" },
        ]}
        subtitleClassName="max-w-[760px]"
      />

      <section id="sobre" className="mx-auto mt-24 max-w-6xl px-6 py-24">
        ...
      </section>
      <section id="servicos" className="mx-auto max-w-6xl px-6 py-24">
        ...
      </section>
      <section id="contato" className="mx-auto max-w-6xl px-6 py-24">
        ...
      </section>
    </main>
  );
}
