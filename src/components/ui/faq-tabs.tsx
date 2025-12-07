"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";

type FAQCategoryMap = Record<string, string>;

type FAQItemData = {
  question: string;
  answer: string;
};

type FAQDataMap = Record<string, FAQItemData[]>;

type FAQProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
  subtitle?: string;
  categories: FAQCategoryMap;
  faqData: FAQDataMap;
};

export function FAQ({
  title = "Dúvidas frequentes",
  subtitle = "FAQ",
  categories,
  faqData,
  className,
  ...props
}: FAQProps) {
  const categoryKeys = useMemo(() => Object.keys(categories), [categories]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryKeys[0] ?? "");

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black px-6 py-24 text-white",
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FAQList faqData={faqData} selected={selectedCategory} />
    </section>
  );
}

function FAQHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
      <span className="mb-4 text-xs uppercase tracking-[0.22em] text-white/50">
        {subtitle}
      </span>

      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-white/60">
        Respostas diretas sobre processo, prazos e como começamos um projeto.
      </p>

      {/* glow suave */}
      <span className="pointer-events-none absolute -top-[360px] left-1/2 z-0 h-[540px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side_at_50%_50%,rgba(255,255,255,0.10),transparent_70%)] blur-3xl" />
    </div>
  );
}

function FAQTabs({
  categories,
  selected,
  setSelected,
}: {
  categories: Record<string, string>;
  selected: string;
  setSelected: (v: string) => void;
}) {
  return (
    <div className="relative z-10 mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-3">
      {Object.entries(categories).map(([key, label]) => {
        const isActive = selected === key;

        return (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={cn(
              "relative overflow-hidden whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
              isActive
                ? "border-white/20 text-black"
                : "border-white/10 bg-transparent text-white/65 hover:text-white"
            )}
          >
            <span className="relative z-10">{label}</span>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-0 bg-white"
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

function FAQList({ faqData, selected }: { faqData: FAQDataMap; selected: string }) {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(faqData).map(([category, questions]) => {
          if (selected !== category) return null;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              {questions.map((faq, index) => (
                <FAQItem key={`${category}-${index}`} {...faq} />
              ))}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItemData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] transition-colors",
        isOpen && "bg-white/[0.06]"
      )}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span
          className={cn(
            "text-base font-semibold transition-colors",
            isOpen ? "text-white" : "text-white/75"
          )}
        >
          {question}
        </span>

        <motion.span
          variants={{ open: { rotate: 45 }, closed: { rotate: 0 } }}
          transition={{ duration: 0.18 }}
          className="shrink-0"
        >
          <Plus className={cn("h-5 w-5", isOpen ? "text-white" : "text-white/55")} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="overflow-hidden px-5"
      >
        <div className="pb-5 text-sm leading-relaxed text-white/60">{answer}</div>
      </motion.div>
    </motion.div>
  );
}
