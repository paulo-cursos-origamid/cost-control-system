"use client";

import { Input } from "@/components/ui/input/input";

import styles from "./account-form.module.scss";

interface Props {
  values: {
    name: string;
    type: string;
    initialBalance: number;
  };

  onChange: (
    field: string,
    value: string | number,
  ) => void;
}

export function AccountForm({
  values,
  onChange,
}: Props) {
  return (
    <div className={styles.form}>
      <Input
        label="Nome"
        value={values.name}
        onChange={(e) =>
          onChange("name", e.target.value)
        }
      />

      <select
        value={values.type}
        onChange={(e) =>
          onChange("type", e.target.value)
        }
      >
        <option value="CHECKING">
          Conta Corrente
        </option>

        <option value="SAVINGS">
          Poupança
        </option>

        <option value="CASH">
          Dinheiro
        </option>

        <option value="CREDIT_CARD">
          Cartão
        </option>

        <option value="INVESTMENT">
          Investimento
        </option>
      </select>

      <Input
        type="number"
        label="Saldo Inicial"
        value={String(values.initialBalance)}
        onChange={(e) =>
          onChange(
            "initialBalance",
            Number(e.target.value),
          )
        }
      />
    </div>
  );
}