"use client";

import { EmptyState } from "@/components/feedback/empty-state/empty-state";
import styles from "./latest-fuel-supplies.module.scss";

interface FuelSupply {
  id: string;
  totalAmount: number;

  vehicle?: {
    name?: string;
  };
}

interface Props {
  supplies: FuelSupply[];
}

export function LatestFuelSupplies({ supplies }: Props) {
  return (
    <div className={styles.card}>
      <h3>Últimos Abastecimentos</h3>

      {supplies.length === 0 ? (
        // <p>Nenhum abastecimento encontrado.</p>
        <EmptyState
          title="Nenhum abastecimento encontrado"
          description="Cadastre um abastecimento para acompanhar os custos da frota."
        />
      ) : (
        <div className={styles.list}>
          {supplies.map((item) => (
            <div key={item.id} className={styles.item}>
              <span>{item.vehicle?.name ?? "Veículo"}</span>

              <strong>
                R$
                {item.totalAmount.toLocaleString("pt-BR")}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
