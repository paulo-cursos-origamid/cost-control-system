"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "./login-form.module.scss";

import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      console.log({
        email,
        password,
      });

      // login aqui
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logo} />

        <h1>Bem-vindo de volta!</h1>

        <p>Faça login para acessar sua conta.</p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Input
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.forgot}>
          <Link href="/forgot-password">
            Esqueceu sua senha?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <footer className={styles.footer}>
        © 2026 ECP • Todos os direitos reservados
      </footer>
    </div>
  );
}