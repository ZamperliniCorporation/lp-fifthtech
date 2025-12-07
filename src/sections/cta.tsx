"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function CTASection() {
  return (
    <section id="contato" className="relative overflow-hidden bg-black">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-12",
            "shadow-2xl shadow-black/60"
          )}
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">Vamos conversar</p>

            <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Planejamos, construímos e evoluímos rápido mantendo padrão premium e previsibilidade.
            </h3>

            <p className="mt-4 max-w-2xl text-white/60">
              Conte o que precisa (software, app, automação ou landing page). Respondemos com próximos passos claros e uma estimativa objetiva.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white border-none font-bold text-base tracking-tight shadow-lg shadow-green-950/10"
                style={{
                  textShadow:
                    "0 1px 2px rgba(36, 61, 13, 0.17), 0 0px 1px rgba(0,0,0,0.09)",
                  letterSpacing: "-0.01em",
                  padding: "0.7rem 1.35rem",
                }}
              >
                <Link href="https://wa.me/" target="_blank" rel="noreferrer">
                  Chamar no WhatsApp
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="mailto:contato@fifthtech.com.br">Enviar e-mail</Link>
              </Button>
            </div>

            <p className="mt-6 text-xs text-white/40">
              Resposta rápida | Clareza no escopo | Evolução contínua
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
