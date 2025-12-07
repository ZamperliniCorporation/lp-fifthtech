"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
} from "framer-motion";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { DottedSurface } from "../components/ui/dotted-surface";

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
    const sectionRef = React.useRef<HTMLElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        sectionRef.current = node;
        if (!ref) return;
        if (typeof ref === "function") ref(node);
        else (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      [ref]
    );

    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-20% 0px -35% 0px" });

    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end start"],
    });

    const contentOpacityOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
    const contentYOut = useTransform(scrollYProgress, [0, 0.65], [0, 28]);
    const contentScaleOut = useTransform(scrollYProgress, [0, 0.65], [1, 0.985]);

    const spotSize = useTransform(scrollYProgress, [0, 0.65], [520, 260]);
    const spotAlpha = useTransform(scrollYProgress, [0, 0.65], [0.16, 0.06]);

    const ambSize = useTransform(scrollYProgress, [0, 0.65], [860, 620]);
    const ambAlpha = useTransform(scrollYProgress, [0, 0.65], [0.1, 0.05]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const sx = useSpring(mx, { stiffness: 70, damping: 20, mass: 0.34 });
    const sy = useSpring(my, { stiffness: 70, damping: 20, mass: 0.34 });

    const nx = useMotionValue(0);
    const ny = useMotionValue(0);

    const snx = useSpring(nx, { stiffness: 45, damping: 18, mass: 0.38 });
    const sny = useSpring(ny, { stiffness: 45, damping: 18, mass: 0.38 });

    const titleX = useTransform(snx, [-0.5, 0.5], [-3.5, 3.5]);
    const titleY = useTransform(sny, [-0.5, 0.5], [-2.2, 2.2]);
    const subtitleX = useTransform(snx, [-0.5, 0.5], [-2.2, 2.2]);
    const subtitleY = useTransform(sny, [-0.5, 0.5], [-1.6, 1.6]);

    const drift = useMotionValue(0);
    React.useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const loop = (t: number) => {
        const s = (t - start) / 1000;
        drift.set(Math.sin(s * 0.9) * 8);
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
      mx.set((typeof window !== "undefined" ? window.innerWidth : 0) / 2);
      my.set((typeof window !== "undefined" ? window.innerHeight : 0) / 2);
    }, [nx, ny, mx, my]);

    React.useEffect(() => {
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    const spotlight = useMotionTemplate`
      radial-gradient(${spotSize}px circle at ${sx}px ${sy}px, rgba(255,255,255,${spotAlpha}), transparent 62%)
    `;
    const ambient = useMotionTemplate`
      radial-gradient(${ambSize}px circle at calc(${sx}px + ${drift}px) 10%, rgba(255,255,255,${ambAlpha}), transparent 64%)
    `;

    React.useEffect(() => {
      const centerX = (typeof window !== "undefined" ? window.innerWidth : 0) / 2;
      const centerY = (typeof window !== "undefined" ? window.innerHeight : 0) / 2;
      mx.set(centerX);
      my.set(centerY);
    }, [mx, my]);

    const v = {
      hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

    return (
      <section
        ref={setRefs}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn("relative w-full min-h-screen overflow-hidden bg-black", className)}
        {...props}
      >
        <div className="absolute inset-0 z-0 bg-black" />

        <DottedSurface className="z-[5] opacity-55" />

        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-10 h-[560px] w-[980px]">
          <div
            className="absolute inset-0 blur-2xl"
            style={{
              clipPath: "polygon(50% 0%, 51.6% 0%, 77.5% 100%, 22.5% 100%)",
              background:
                "radial-gradient(closest-side at 50% 0%, rgba(255,255,255,0.30), rgba(255,255,255,0.08) 52%, transparent 80%)",
              opacity: 0.65,
            }}
          />
          <div className="absolute left-1/2 top-[-90px] h-80 w-[56rem] -translate-x-1/2 rounded-full bg-white/12 blur-3xl" />
          <div className="absolute left-1/2 top-[-48px] h-24 w-[30rem] -translate-x-1/2 rounded-full bg-white/12 blur-2xl" />
        </div>

        <motion.div style={{ backgroundImage: spotlight }} className="pointer-events-none absolute inset-0 z-20" />
        <motion.div style={{ backgroundImage: ambient }} className="pointer-events-none absolute inset-0 z-20 opacity-70" />

        <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(1200px_circle_at_50%_35%,transparent_30%,rgba(0,0,0,0.92)_78%)]" />
        <div className="pointer-events-none absolute inset-0 z-40 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22400%22 height=%22400%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')]" />

        <motion.div
          ref={contentRef}
          style={{ opacity: contentOpacityOut, y: contentYOut, scale: contentScaleOut }}
          className="relative z-50 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center"
        >
          <motion.h1
            style={{ x: titleX, y: titleY, willChange: "transform" as any }}
            variants={v}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-tech",
              titleClassName
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              style={{ x: subtitleX, y: subtitleY, willChange: "transform" as any }}
              variants={v}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "mt-5 max-w-3xl text-pretty text-base text-white/60 sm:text-lg md:text-xl",
                subtitleClassName
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {actions && actions.length > 0 && (
            <motion.div
              variants={v}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={cn("mt-10 flex flex-wrap justify-center gap-3", actionsClassName)}
            >
              {actions.map((action, idx) => (
                <Button key={idx} variant={mapButtonVariant(action.variant)} asChild>
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </motion.div>
          )}

          <motion.p
            variants={v}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-xs text-white/35"
          >
            Software sob medida | Automação | Integrações | Experiências digitais
          </motion.p>
        </motion.div>
      </section>
    );
  }
);

Hero.displayName = "Hero";

export { Hero };
export default Hero;
