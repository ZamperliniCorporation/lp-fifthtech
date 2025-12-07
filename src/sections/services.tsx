"use client";

import * as React from "react";
import { motion, useAnimation, type Variants, type Transition } from "framer-motion";

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
      "Sistemas web e internos feitos em cima do seu processo. Do painel administrativo ao portal do cliente — com performance e padrão premium.",
    services: ["Web apps", "Sistemas internos", "Portais", "Dashboards"],
    type: "Software",
    imageUrl: "/images/services/software.jpg",
  },
  {
    id: "ft-apps",
    title: "Aplicativos (MVP à escala)",
    description:
      "Apps para validar, lançar e evoluir rápido. Experiência fluida, integrações e base sólida pra crescer sem retrabalho.",
    services: ["MVP", "UI/UX", "Integrações", "Publicação"],
    type: "App",
    imageUrl: "/images/services/app.jpg",
  },
  {
    id: "ft-lps",
    title: "Landing pages premium",
    description:
      "Landing pages com motion, microinterações e design tecnológico. Construídas pra converter e elevar o posicionamento da marca.",
    services: ["Design", "Motion", "SEO", "Conversão"],
    type: "LP",
    imageUrl: "/images/services/lp.jpg",
  },
  {
    id: "ft-automations",
    title: "Automações e integrações",
    description:
      "Automatizamos tarefas e conectamos sistemas com APIs e webhooks. Menos trabalho manual, mais eficiência e rastreabilidade.",
    services: ["APIs", "Webhooks", "Pipelines", "Observabilidade"],
    type: "Automação",
    imageUrl: "/images/services/automacao.jpg",
  },
];

// Framer Motion aceita cubic-bezier como 'ease' se passada em string ou array [x1, y1, x2, y2]
// Portanto, é necessário tipar corretamente a variante e passar ease como tupla 4 elementos

const fadeUp: Variants = {
  hide: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }, // Corrigido
  },
};

const cardFade: Variants = {
  hide: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }, // Corrigido
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
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">
            Serviços
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            O que a Fifth Tech entrega.
          </h2>

          <p className="mt-4 max-w-2xl text-white/60">
            Software em geral, aplicativos, landing pages e automações — sempre com foco em
            clareza, velocidade e qualidade de entrega.
          </p>
        </motion.div>
      </div>

      <ScrollXCarousel className="mt-10 h-[110vh] md:h-[130vh]">
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
              xRagnge={["0%", "-52%"]}
              className="flex flex-4/5 space-x-5 px-4 sm:px-8 md:space-x-8 md:px-[6vw]"
            >
              {SLIDES.map((slide) => (
                <motion.div key={slide.id} variants={cardFade}>
                  <CardHoverReveal
                    className={cn(
                      "min-w-[88vw] sm:min-w-[70vw] md:min-w-[50vw] lg:min-w-[38vw] xl:min-w-[32vw]",
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
                          Quer um orçamento rápido? A gente te responde com clareza e próximos passos.
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
