import { CrudField } from "../forms/generic-form/types";

export type CrudColumn = {
  key: string;
  label: string;

  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
};

export type CrudSchema = {
  title: string;

  endpoint: string;

  columns: CrudColumn[];

  fields: CrudField[];
};
