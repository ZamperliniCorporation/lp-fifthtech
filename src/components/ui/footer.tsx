"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

type FooterProps = {
  logo?: React.ReactNode;
  brandName: string;
  socialLinks: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
};

export function Footer({
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-black pb-8 pt-10 lg:pb-10 lg:pt-14">
      {/* glow sutil na base */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-[-220px] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_100%,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* linha de cima (logo + socials) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center" aria-label={brandName}>
            <Image
              src="/images/logo.png"
              alt={`${brandName} logo`}
              width={128}
              height={128}
              priority
              className="h-24 w-24 object-contain"
            />
          </Link>

          <ul className="flex list-none items-center gap-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-full w-full items-center justify-center"
                  >
                    {/* garante que o ícone apareça mesmo se vier como string "IG"/"IN"/"WA" */}
                    {typeof link.icon === "string" ? (
                      <span className="text-[12px] font-semibold tracking-[0.22em] text-white/80">
                        {link.icon}
                      </span>
                    ) : (
                      <span className="[&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white/85">
                        {link.icon}
                      </span>
                    )}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 border-t border-white/10 pt-5 lg:grid lg:grid-cols-10">
          <nav className="lg:col-[4/11]">
            <ul className="list-none flex flex-wrap gap-x-4 gap-y-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 lg:col-[4/11] lg:mt-3">
            <ul className="list-none flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-white/55 underline-offset-4 hover:text-white/80 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 text-sm leading-6 text-white/45 lg:col-[1/4] lg:row-[1/3] lg:mt-0">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}
