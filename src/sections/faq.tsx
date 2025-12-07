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
    seguranca: "Qualidade & Seguranca",
    contrato: "Contrato & Suporte",
  };

  const faqData = {
    processo: [
      {
        question: "Como funciona o inicio de um projeto?",
        answer:
          "O trabalho comeca com um diagnostico objetivo: entendimento do processo atual, definicao de metas, requisitos e restricoes. Em seguida, montamos um plano de entrega com escopo priorizado, marcos e cronograma. A execucao ocorre em ciclos curtos, com validacoes frequentes para garantir alinhamento e previsibilidade.",
      },
      {
        question: "Voces ajudam a definir o escopo e priorizacao?",
        answer:
          "Sim. Quando o escopo ainda nao esta fechado, conduzimos um discovery para organizar backlog, definir o MVP e priorizar o que traz mais valor no menor tempo. Isso reduz retrabalho e acelera a entrega.",
      },
      {
        question: "Como e feito o acompanhamento do projeto?",
        answer:
          "O acompanhamento e transparente: checkpoints periodicos, registro de decisoes e atualizacao continua do status (o que foi entregue, proximos passos e riscos). Isso garante previsibilidade e rapidez na tomada de decisao.",
      },
    ],

    tecnologia: [
      {
        question: "Qual e a stack padrao da Fifth Tech?",
        answer:
          "Stack base: React/Next.js no front-end, React Native para apps, Tailwind CSS para UI. Back-end em Python ou Java conforme o produto. Banco: PostgreSQL com modelagem SQL estruturada. Integracoes via APIs e webhooks.",
      },
      {
        question: "Voces fazem integracoes com APIs, servicos e webhooks?",
        answer:
          "Sim. Integramos APIs REST/GraphQL, webhooks e rotinas de automacao. O objetivo e reduzir trabalho manual, aumentar rastreabilidade e garantir consistencia de dados.",
      },
      {
        question: "E possivel evoluir um sistema ja existente?",
        answer:
          "Sim. Fazemos avaliacao tecnica (arquitetura, debitos, gargalos e riscos) e plano de evolucao. Modernizacao pode ser incremental para manter continuidade do negocio.",
      },
    ],

    prazos: [
      {
        question: "Qual e o prazo tipico para um MVP?",
        answer:
          "Depende do escopo e integracoes, mas MVPs bem definidos saem em ciclos curtos, com foco no essencial para validar e evoluir. A proposta traz etapas e entregaveis claros para previsibilidade.",
      },
      {
        question: "Como sao feitas as entregas durante o projeto?",
        answer:
          "Entregas continuas e priorizadas. Cada ciclo fecha funcionalidades utilizaveis, com validacao e ajustes. Reduz risco, acelera aprendizado e entrega valor ao longo do caminho — nao so no final.",
      },
      {
        question: "Voces fazem landing pages premium com foco em conversao?",
        answer:
          "Sim. LPs com design tecnologico, performance, motion/microinteracoes quando faz sentido e boas praticas de SEO, focadas em clareza e conversao.",
      },
    ],

    seguranca: [
      {
        question: "Como garantem qualidade e estabilidade?",
        answer:
          "Boas praticas de engenharia: organizacao de codigo, revisao, padroes de UI, validacoes e testes quando apropriado. Observabilidade e logs para manutencao e evolucao.",
      },
      {
        question: "Como tratam seguranca e dados?",
        answer:
          "Controle de acesso por perfis, validacoes no servidor, protecao de endpoints, cuidado com credenciais e boas praticas no banco (PostgreSQL). Requisitos extras de seguranca podem ser definidos conforme o caso.",
      },
      {
        question: "O sistema fica rapido e escalavel?",
        answer:
          "Arquitetura adequada ao cenario real. Quando necessario, aplicamos paginacao, cache, otimizacao de queries SQL e melhorias no fluxo de dados para performance sustentavel.",
      },
    ],

    contrato: [
      {
        question: "Como funciona orcamento e contratacao?",
        answer:
          "Orcamento baseado em escopo, complexidade e integracoes. Proposta com etapas, entregaveis e premissas. Contratacao por projeto/etapas ou ciclos continuos de evolucao.",
      },
      {
        question: "Existe suporte apos a entrega?",
        answer:
          "Sim. Apos o go-live pode haver estabilizacao e suporte, alem de evolucao continua para melhorias e novas funcionalidades.",
      },
      {
        question: "Como funciona comunicacao e pontos de contato?",
        answer:
          "Definimos um canal principal e rotina de check-ins para reduzir ruido, acelerar decisoes e manter fluxo. Reunioes objetivas quando necessario.",
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
        title="Perguntas frequentes"
        subtitle="FAQ"
        categories={categories}
        faqData={faqData}
      />
    </motion.section>
  );
}
