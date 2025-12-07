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

  // ativa pelo scroll (IntersectionObserver)
  React.useEffect(() => {
    const ids = items
      .map((i) => i.url)
      .filter((u) => u.startsWith("#"))
      .map((u) => u.slice(1));

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const byIdToName = new Map(
      items
        .filter((i) => i.url.startsWith("#"))
        .map((i) => [i.url.slice(1), i.name] as const)
    );

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible?.target?.id) return;
        const next = byIdToName.get(visible.target.id);
        if (next) setActiveTab(next);
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.55],
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        // changed top-5 for a lower position (e.g., top-12 = 3rem/48px, adjust as needed)
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
