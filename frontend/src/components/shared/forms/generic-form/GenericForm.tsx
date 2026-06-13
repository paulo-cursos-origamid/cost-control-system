"use client";

import { FormEvent, useState } from "react";

import { CrudField, CrudFormData, CrudFormSchema } from "./types";

type Props = {
  schema: CrudFormSchema;
  initialData?: CrudFormData;
  onSuccess?: () => void;
};

export function GenericForm({ schema, initialData, onSuccess }: Props) {
  const [form, setForm] = useState<CrudFormData>(initialData ?? {});

  function handleChange(name: string, value: string | number | boolean) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}${schema.endpoint}`, {
      method: schema.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      {schema.fields.map((field: CrudField) => (
        <div key={field.name} style={{ marginBottom: "1rem" }}>
          <label>{field.label}</label>

          {field.type === "select" ? (
            <select
              value={String(form[field.name] ?? "")}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">Selecione</option>

              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={String(form[field.name] ?? "")}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <button type="submit">Salvar</button>
    </form>
  );
}
