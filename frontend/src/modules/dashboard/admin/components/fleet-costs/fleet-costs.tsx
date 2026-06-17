"use client";

import styles from "./fleet-costs.module.scss";

interface Props {
  fuel: number;
  maintenance: number;
  total: number;
}

export function FleetCosts({ fuel, maintenance, total }: Props) {
  return (
    <div className={styles.card}>
      <h3>Custos da Frota</h3>

      <div className={styles.grid}>
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

            <strong className={styles.total}>
              R$ {total.toLocaleString("pt-BR")}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
