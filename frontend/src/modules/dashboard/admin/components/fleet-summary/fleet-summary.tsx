"use client";

import styles from "./fleet-summary.module.scss";

interface Props {
  fuel: number;
  maintenance: number;
  total: number;
}

export function FleetSummary({ fuel, maintenance, total }: Props) {
  return (
    <div className={styles.card}>
      <h3>Custos da Frota</h3>

      <div className={styles.items}>
        <div>
          <span>Combustível</span>

          <strong>R$ {fuel.toLocaleString("pt-BR")}</strong>
        </div>

        <div>
          <span>Manutenção</span>

          <strong>R$ {maintenance.toLocaleString("pt-BR")}</strong>
        </div>

        <div>
          <span>Total</span>

          <strong>R$ {total.toLocaleString("pt-BR")}</strong>
        </div>
      </div>
    </div>
  );
}
