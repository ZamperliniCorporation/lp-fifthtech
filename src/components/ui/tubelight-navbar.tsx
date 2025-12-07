"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavItem {
  name: string;
  url: string; // ex: "#servicos"
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = React.useState(items[0]?.name ?? "");

  // ativa pelo scroll (IntersectionObserver) — mais estável
  React.useEffect(() => {
    const hashItems = items.filter((i) => i.url.startsWith("#"));
    const ids = hashItems.map((i) => i.url.slice(1));

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const byIdToName = new Map(hashItems.map((i) => [i.url.slice(1), i.name] as const));

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        // 1) tenta pegar a section mais próxima do "topo útil" da tela
        // (isso deixa bem consistente quando duas sections ficam visíveis)
        const targetEntry = visible
          .slice()
          .sort((a, b) => {
            const aTop = Math.abs((a.target as HTMLElement).getBoundingClientRect().top);
            const bTop = Math.abs((b.target as HTMLElement).getBoundingClientRect().top);

            // prioridade: quem está mais perto do topo (menor abs top)
            if (aTop !== bTop) return aTop - bTop;

            // desempate: maior ratio
            return (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0);
          })[0];

        const id = (targetEntry.target as HTMLElement).id;
        const next = byIdToName.get(id);
        if (next) setActiveTab(next);
      },
      {
        root: null,
        // mais thresholds = atualização mais suave e correta
        threshold: [0.08, 0.12, 0.2, 0.3, 0.45, 0.6],
        // ativa quando a section entra no "miolo" da tela
        rootMargin: "-30% 0px -55% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        "fixed top-12 left-1/2 -translate-x-1/2 z-[9999]",
        className
      )}
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-1 py-1 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                "text-white/70 hover:text-white hover:-translate-y-[1px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-0",
                isActive && "text-white"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden inline-flex">
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 rounded-full bg-white/6"
                  initial={false}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                >
                  {/* tubelight */}
                  <div className="absolute -top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-t-full bg-white/85">
                    <div className="absolute -left-3 -top-3 h-7 w-16 rounded-full bg-white/20 blur-md" />
                    <div className="absolute -top-2 h-7 w-10 rounded-full bg-white/20 blur-md" />
                    <div className="absolute left-3 top-0 h-4 w-4 rounded-full bg-white/25 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
