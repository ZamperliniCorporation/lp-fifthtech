"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FAQ } from "../components/ui/faq-tabs";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function FaqSection() {
  const categories = {
    processo: "Processo",
    tecnologia: "Tecnologia & Stack",
    prazos: "Prazos & Entregas",
    seguranca: "Qualidade & Segurança",
    contrato: "Contrato & Suporte",
  };

  const faqData = {
    processo: [
      {
        question: "Como funciona o início de um projeto?",
        answer:
          "Começamos com um diagnóstico objetivo: entendimento do processo atual, definição de metas, requisitos e restrições. Na sequência, montamos um plano de entrega com escopo priorizado, marcos e cronograma. Executamos em ciclos curtos, com validações frequentes para garantir alinhamento e previsibilidade.",
      },
      {
        question: "Vocês ajudam a definir o escopo e priorização?",
        answer:
          "Sim. Quando o escopo ainda não está fechado, conduzimos um discovery para organizar backlog, definir o MVP e priorizar o que traz mais valor no menor tempo. Isso reduz retrabalho e acelera a entrega.",
      },
      {
        question: "Como é feito o acompanhamento do projeto?",
        answer:
          "Acompanhamento transparente: checkpoints periódicos, registro de decisões e atualização contínua do status (o que foi entregue, próximos passos e riscos). Isso garante previsibilidade e rapidez na tomada de decisão.",
      },
    ],

    tecnologia: [
      {
        question: "Qual é a stack padrão da FifthTech?",
        answer:
          "Stack base: React/Next.js no front-end, React Native para apps, Tailwind CSS para UI. Back-end em Python ou Java conforme o produto. Banco: PostgreSQL com modelagem SQL estruturada. Integrações via APIs e webhooks.",
      },
      {
        question: "Vocês fazem integrações com APIs, serviços e webhooks?",
        answer:
          "Sim. Integramos APIs REST/GraphQL, webhooks e rotinas de automação. O objetivo é reduzir trabalho manual, aumentar rastreabilidade e garantir consistência de dados.",
      },
      {
        question: "É possível evoluir um sistema já existente?",
        answer:
          "Sim. Fazemos avaliação técnica (arquitetura, débitos, gargalos e riscos) e plano de evolução. A modernização pode ser incremental para manter continuidade do negócio.",
      },
    ],

    prazos: [
      {
        question: "Qual é o prazo típico para um MVP?",
        answer:
          "Depende do escopo e integrações, mas MVPs bem definidos saem em ciclos curtos, com foco no essencial para validar e evoluir. A proposta traz etapas e entregáveis claros para previsibilidade.",
      },
      {
        question: "Como são feitas as entregas durante o projeto?",
        answer:
          "Entregas contínuas e priorizadas. Cada ciclo fecha funcionalidades utilizáveis, com validação e ajustes. Reduz risco, acelera aprendizado e entrega valor ao longo do caminho — não só no final.",
      },
      {
        question: "Vocês fazem landing pages premium com foco em conversão?",
        answer:
          "Sim. LPs com design tecnológico, performance, motion/microinterações quando faz sentido e boas práticas de SEO, focadas em clareza e conversão.",
      },
    ],

    seguranca: [
      {
        question: "Como garantem qualidade e estabilidade?",
        answer:
          "Boas práticas de engenharia: organização de código, revisão, padrões de UI, validações e testes quando apropriado. Observabilidade e logs para manutenção e evolução.",
      },
      {
        question: "Como tratam segurança e dados?",
        answer:
          "Controle de acesso por perfis, validações no servidor, proteção de endpoints, cuidado com credenciais e boas práticas no banco (PostgreSQL). Requisitos extras de segurança podem ser definidos conforme o caso.",
      },
      {
        question: "O sistema fica rápido e escalável?",
        answer:
          "Arquitetura adequada ao cenário real. Quando necessário, aplicamos paginação, cache, otimização de queries SQL e melhorias no fluxo de dados para performance sustentável.",
      },
    ],

    contrato: [
      {
        question: "Como funciona orçamento e contratação?",
        answer:
          "Orçamento baseado em escopo, complexidade e integrações. Proposta com etapas, entregáveis e premissas. Contratação por projeto/etapas ou ciclos contínuos de evolução.",
      },
      {
        question: "Existe suporte após a entrega?",
        answer:
          "Sim. Após o go-live pode haver estabilização e suporte, além de evolução contínua para melhorias e novas funcionalidades.",
      },
      {
        question: "Como funciona comunicação e pontos de contato?",
        answer:
          "Definimos um canal principal e rotina de check-ins para reduzir ruído, acelerar decisões e manter fluxo. Reuniões objetivas quando necessário.",
      },
    ],
  };

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <FAQ
        title="Perguntas que recebemos"
        subtitle="FAQ"
        categories={categories}
        faqData={faqData}
      />
    </motion.section>
  );
}
