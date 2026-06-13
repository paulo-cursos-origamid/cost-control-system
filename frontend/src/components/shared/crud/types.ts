import { CrudField } from "../forms/generic-form/types";

export type CrudColumn = {
  key: string;
  label: string;
};

export type CrudSchema = {
  title: string;

  endpoint: string;

  method: "POST" | "PATCH";

  columns: CrudColumn[];

  fields: CrudField[];
};