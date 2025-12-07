"use client";

import * as React from "react";
import { motion, useAnimation, type Variants } from "framer-motion";

import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap,
} from "../components/ui/scroll-x-carousel";
import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "../components/ui/reveal-on-hover";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

type Slide = {
  id: string;
  title: string;
  description: string;
  services: string[];
  type: string;
  imageUrl: string;
};

const SLIDES: Slide[] = [
  {
    id: "ft-software",
    title: "Softwares sob medida",
    description:
      "Arquitetura, desenvolvimento e evolução de sistemas web alinhados ao seu processo, com governança, performance e suporte contínuo.",
    services: ["Web apps", "Sistemas internos", "Portais B2B/B2C", "Dashboards"],
    type: "Software",
    imageUrl: "/images/services/software.jpg",
  },
  {
    id: "ft-apps",
    title: "Aplicativos (MVP a escala)",
    description:
      "Apps prontos para validar e escalar: UX fluida, integrações confiáveis e base sólida para crescer sem retrabalho.",
    services: ["MVP", "UI/UX", "Integrações", "Publicação"],
    type: "App",
    imageUrl: "/images/services/app.jpg",
  },
  {
    id: "ft-lps",
    title: "Landing pages premium",
    description:
      "Landing pages com motion e narrativa forte para posicionar sua marca, gerar autoridade e converter com clareza.",
    services: ["Design", "Motion", "SEO", "Conversão"],
    type: "LP",
    imageUrl: "/images/services/lp.jpg",
  },
  {
    id: "ft-automations",
    title: "Automações e integrações",
    description:
      "Automações e integrações que reduzem o trabalho manual e aumentam rastreabilidade, com observabilidade e suporte ao negócio.",
    services: ["APIs", "Webhooks", "Pipelines", "Observabilidade"],
    type: "Automação",
    imageUrl: "/images/services/automacao.jpg",
  },
];

const fadeUp: Variants = {
  hide: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const cardFade: Variants = {
  hide: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function useEnterExitAnimation() {
  const controls = useAnimation();

  const enter = React.useCallback(() => {
    controls.start("show");
  }, [controls]);

  const exit = React.useCallback(() => {
    controls.start("hide");
  }, [controls]);

  return { controls, enter, exit };
}

export function Services() {
  const header = useEnterExitAnimation();
  const cards = useEnterExitAnimation();
  const [xRange, setXRange] = React.useState<[string, string]>(["0%", "-52%"]);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setXRange(mq.matches ? ["0%", "-88%"] : ["0%", "-52%"]);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="servicos" className="relative w-full">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <motion.div
          initial="hide"
          animate={header.controls}
          variants={fadeUp}
          viewport={{ amount: 0.35 }}
          whileInView="show"
          onViewportEnter={header.enter}
          onViewportLeave={header.exit}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">Serviços</p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight font-tech sm:text-4xl">
            O que a FifthTech entrega.
          </h2>

          <p className="mt-4 max-w-2xl text-white/60">
            Software, apps, landing pages e automações com foco em velocidade de entrega, confiabilidade e narrativas que elevam sua marca.
          </p>
        </motion.div>
      </div>

      <ScrollXCarousel className="mt-10 h-[150vh] md:h-[130vh]">
        <ScrollXCarouselContainer className="flex h-dvh flex-col place-content-center gap-8 py-14">
          <div className="pointer-events-none absolute inset-[0_auto_0_0] z-10 h-[103%] w-[12vw] bg-[linear-gradient(90deg,_black_35%,_transparent)]" />
          <div className="pointer-events-none absolute inset-[0_0_0_auto] z-10 h-[103%] w-[15vw] bg-[linear-gradient(270deg,_black_35%,_transparent)]" />

          <motion.div
            initial="hide"
            animate={cards.controls}
            variants={{
              hide: {},
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
            viewport={{ amount: 0.25 }}
            whileInView="show"
            onViewportEnter={cards.enter}
            onViewportLeave={cards.exit}
          >
            <ScrollXCarouselWrap
              xRagnge={xRange}
              className="flex flex-4/5 space-x-5 px-4 sm:px-8 md:space-x-8 md:px-[6vw]"
            >
              {SLIDES.map((slide) => (
                <motion.div key={slide.id} variants={cardFade}>
                  <CardHoverReveal
                    className={cn(
                      "min-w-[82vw] sm:min-w-[70vw] md:min-w-[50vw] lg:min-w-[38vw] xl:min-w-[32vw]",
                      "rounded-2xl border border-white/10 bg-white/5",
                      "shadow-2xl shadow-black/50"
                    )}
                  >
                    <CardHoverRevealMain>
                      <img
                        alt={slide.title}
                        src={slide.imageUrl}
                        className="size-full aspect-[4/5] object-cover md:aspect-[3/4]"
                      />

                      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_18%,rgba(255,255,255,0.16),transparent_55%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10" />
                    </CardHoverRevealMain>

                    <CardHoverRevealContent className="space-y-4 rounded-2xl border border-white/10 bg-[rgba(0,0,0,.65)] p-5 backdrop-blur-3xl md:max-w-[460px]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="text-white font-semibold">
                            {slide.title}
                          </h3>
                          <p className="text-white/75 text-sm leading-relaxed">
                            {slide.description}
                          </p>
                        </div>

                        <Badge className="rounded-full" variant="secondary">
                          {slide.type}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-white/60">Inclui</p>
                        <div className="flex flex-wrap gap-2">
                          {slide.services.map((s) => (
                            <Badge
                              key={s}
                              className="capitalize rounded-full"
                              variant="outline"
                            >
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1">
                        <p className="text-xs text-white/55">
                          Quer um orçamento rápido? Respondemos com clareza e próximos passos.
                        </p>
                      </div>
                    </CardHoverRevealContent>
                  </CardHoverReveal>
                </motion.div>
              ))}
            </ScrollXCarouselWrap>
          </motion.div>

          <ScrollXCarouselProgress
            className="mx-8 h-1 overflow-hidden rounded-full bg-white/10"
            progressStyle="size-full rounded-full bg-white/55"
          />
        </ScrollXCarouselContainer>
      </ScrollXCarousel>
    </section>
  );
}
