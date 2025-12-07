"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "../lib/utils";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";

type Person = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export default function About({
  people,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { people: Person[] }) {
  return (
    <section
      id="sobre"
      className={cn("relative mx-auto max-w-6xl px-6 py-24", className)}
      {...props}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.35, margin: "-10% 0px -10% 0px" }}
        className="grid gap-10 md:grid-cols-2 md:items-start"
      >
        {/* Coluna esquerda */}
        <div>
          <motion.p
            variants={item}
            className="text-xs uppercase tracking-[0.22em] text-white/50"
          >
            Sobre a FifthTech
          </motion.p>

          <motion.h2
            variants={item}
            className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Software sob medida com padrão premium — do diagnóstico à entrega.
          </motion.h2>

          <motion.p variants={item} className="mt-5 text-white/60 leading-relaxed">
            A FifthTech projeta e desenvolve soluções digitais para empresas que
            precisam de eficiência real: sistemas internos, automações, integrações,
            dashboards e produtos digitais. Nosso foco é construir rápido, com
            clareza, qualidade e suporte próximo.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
            {[
              "Sistemas web",
              "Automação de processos",
              "Integrações (APIs)",
              "Dashboards & BI",
              "Performance & UX",
              "Entrega com acompanhamento",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Card direita */}
        <motion.div
          variants={item}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
        >
          <motion.p variants={item} className="text-sm font-medium text-white/85">
            Nosso time
          </motion.p>

          <motion.p variants={item} className="mt-2 text-sm text-white/60">
            Um time enxuto e completo — produto, engenharia e marketing trabalhando juntos.
          </motion.p>

          {/* área segura pro tooltip */}
          <motion.div variants={item} className="mt-6 pt-10">
            <AnimatedTooltip items={people} />
          </motion.div>

          <motion.div variants={item} className="mt-8 grid gap-3">
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <p className="text-xs text-white/50">Como trabalhamos</p>
              <p className="mt-1 text-sm text-white/70">
                Briefing → Diagnóstico → Prototipação → Desenvolvimento → Deploy → Evolução
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <p className="text-xs text-white/50">Compromisso</p>
              <p className="mt-1 text-sm text-white/70">
                Comunicação clara, entregas frequentes e qualidade de código.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

