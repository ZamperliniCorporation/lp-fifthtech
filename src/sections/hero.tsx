"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

type HeroAction = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
};

type HeroProps = React.HTMLAttributes<HTMLElement> & {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: HeroAction[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
};

// Garante que sempre entregamos um variant aceito pelo Button
function mapButtonVariant(variant?: string) {
  switch (variant) {
    case "default":
    case "outline":
    case "ghost":
    case "link":
      return variant;
    case "secondary":
    case "destructive":
    default:
      return "default";
  }
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      ...props
    },
    ref
  ) => {
    // posição do mouse para spotlight (iniciando no centro para já aparecer luz)
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 110, damping: 22, mass: 0.25 });
    const sy = useSpring(my, { stiffness: 110, damping: 22, mass: 0.25 });

    // parallax
    const nx = useMotionValue(0);
    const ny = useMotionValue(0);
    const snx = useSpring(nx, { stiffness: 90, damping: 26, mass: 0.25 });
    const sny = useSpring(ny, { stiffness: 90, damping: 26, mass: 0.25 });
    const titleX = useTransform(snx, [-0.5, 0.5], [-6, 6]);
    const titleY = useTransform(sny, [-0.5, 0.5], [-4, 4]);
    const subtitleX = useTransform(snx, [-0.5, 0.5], [-4, 4]);
    const subtitleY = useTransform(sny, [-0.5, 0.5], [-3, 3]);

    // drift sutil para o cone/spotlight "respirar"
    const drift = useMotionValue(0);
    React.useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const loop = (t: number) => {
        const s = (t - start) / 1000;
        drift.set(Math.sin(s * 0.9) * 18); // 18px drift
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [drift]);

    const rafRef = React.useRef<number | null>(null);

    const onMove = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mx.set(x);
        my.set(y);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          nx.set(x / rect.width - 0.5);
          ny.set(y / rect.height - 0.5);
        });
      },
      [mx, my, nx, ny]
    );

    const onLeave = React.useCallback(() => {
      nx.set(0);
      ny.set(0);
    }, [nx, ny]);

    React.useEffect(() => {
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    const spotlight = useMotionTemplate`
      radial-gradient(640px circle at ${sx}px ${sy}px, rgba(255,255,255,.20), transparent 60%)
    `;
    const ambient = useMotionTemplate`
      radial-gradient(900px circle at calc(${sx}px + ${drift}px) 10%, rgba(255,255,255,.14), transparent 60%)
    `;

    // centraliza luz inicial para não ficar invisível antes do primeiro movimento
    React.useEffect(() => {
      const centerX = (typeof window !== "undefined" ? window.innerWidth : 0) / 2;
      const centerY = (typeof window !== "undefined" ? window.innerHeight : 0) / 2;
      mx.set(centerX);
      my.set(centerY);
    }, [mx, my]);

    return (
      <section
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn("relative w-full min-h-screen overflow-hidden bg-black", className)}
        {...props}
      >
        {/* Base */}
        <div className="absolute inset-0 z-0 bg-black" />

        {/* Lamp cone */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-10 h-[520px] w-[900px]">
          <div
            className="absolute inset-0 opacity-70 blur-2xl"
            style={{
              clipPath: "polygon(50% 0%, 52% 0%, 78% 100%, 22% 100%)",
              background:
                "radial-gradient(closest-side at 50% 0%, rgba(255,255,255,0.35), rgba(255,255,255,0.10) 45%, transparent 78%)",
            }}
          />
          {/* Hotspot da lampada */}
          <div className="absolute left-1/2 top-[-80px] h-72 w-[52rem] -translate-x-1/2 rounded-full bg-white/18 blur-3xl" />
          <div className="absolute left-1/2 top-[-40px] h-24 w-[28rem] -translate-x-1/2 rounded-full bg-white/18 blur-2xl" />
        </div>

        {/* Grid sutil */}
        <div className="absolute inset-0 z-10 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:90px_90px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)]" />

        {/* Spotlight mouse */}
        <motion.div
          style={{ backgroundImage: spotlight }}
          className="pointer-events-none absolute inset-0 z-20"
        />
        <motion.div
          style={{ backgroundImage: ambient }}
          className="pointer-events-none absolute inset-0 z-20 opacity-70"
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(1200px_circle_at_50%_35%,transparent_30%,rgba(0,0,0,0.92)_78%)]" />

        {/* Grain */}
        <div className="pointer-events-none absolute inset-0 z-40 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22400%22 height=%22400%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')]" />

        {/* Content */}
        <div className="relative z-50 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
          <motion.h1
            style={{ x: titleX, y: titleY }}
            className={cn(
              "text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl",
              titleClassName
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              style={{ x: subtitleX, y: subtitleY }}
              className={cn(
                "mt-5 max-w-3xl text-pretty text-base text-white/60 sm:text-lg md:text-xl",
                subtitleClassName
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {actions && actions.length > 0 && (
            <div className={cn("mt-10 flex flex-wrap justify-center gap-3", actionsClassName)}>
              {actions.map((action, idx) => (
                <Button key={idx} variant={mapButtonVariant(action.variant)} asChild>
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </div>
          )}

          <p className="mt-12 text-xs text-white/35">
            Sistemas sob medida | Automacao | Integracoes | Dashboards
          </p>
        </div>
      </section>
    );
  }
);

Hero.displayName = "Hero";

export { Hero };
export default Hero;
