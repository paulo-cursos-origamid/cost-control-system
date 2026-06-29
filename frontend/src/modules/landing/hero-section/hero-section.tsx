"use client";

import styles from "./hero-section.module.scss";
import Image from "next/image";
import {
  ShieldCheck,
  Monitor,
  BadgeDollarSign,
  PlayCircle,
  ArrowRight,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundGlow} />

      <div className={styles.content}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <Logo />

          <HeroTitle />

          <HeroDescription />

          <HeroActions />

          <Features />

          <SocialProof />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <Image
            src="/dashboard-preview.png"
            alt="Dashboard CCP"
            width={700}
            height={500}
            priority
          />
        </div>
      </div>
    </section>
  );
}

/* =========================
   COMPONENTES INTERNOS
========================= */

function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src="/images/ccp-logo.png"
        alt="CCP Logo"
        width={200}
        height={200}
        priority
      />
    </div>
  );
}

function HeroTitle() {
  return (
    <h1>
      Controle suas finanças
      <br />
      de forma simples e
      <br />
      <span>inteligente.</span>
    </h1>
  );
}

function HeroDescription() {
  return (
    <p>
      O CCP - Centro de Custo Pessoal ajuda você a organizar receitas, despesas
      e investimentos em um único lugar, com clareza e praticidade.
    </p>
  );
}

function HeroActions() {
  return (
    <div className={styles.actions}>
      <button className={styles.primaryButton}>
        Começar Gratuitamente
        <ArrowRight size={20} />
      </button>

      <button className={styles.secondaryButton}>
        <PlayCircle size={22} />
        Ver Demonstração
      </button>
    </div>
  );
}

function Features() {
  return (
    <div className={styles.features}>
      <Feature
        icon={<ShieldCheck />}
        title="100% Seguro"
        subtitle="Seus dados protegidos"
      />

      <Feature
        icon={<BadgeDollarSign />}
        title="Fácil de usar"
        subtitle="Interface intuitiva"
      />

      <Feature
        icon={<Monitor />}
        title="Acesso em qualquer lugar"
        subtitle="Web e Mobile"
      />
    </div>
  );
}

function Feature({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      {icon}
      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <div className={styles.socialProof}>
      <div className={styles.avatars}>
        <Image src="/avatars/1.jpg" alt="user 1" width={32} height={32} />

        <Image src="/avatars/2.jpg" alt="user 2" width={32} height={32} />

        <Image src="/avatars/3.jpg" alt="user 3" width={32} height={32} />
      </div>

      <div className={styles.dexcription}>
        <div className={styles.stars}>★★★★★</div>
        <p>
          Mais de 1.000 pessoas já transformaram sua vida financeira com o CCP.
        </p>
      </div>
    </div>
  );
}
