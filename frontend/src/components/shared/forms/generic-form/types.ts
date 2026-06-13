export type CrudFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "select";

export interface CrudFieldOption {
  label: string;
  value: string;
}

export interface CrudField {
  name: string;
  label: string;
  type: CrudFieldType;
  placeholder?: string;
  options?: CrudFieldOption[];
}

export interface CrudColumn {
  key: string;
  label: string;
}

export interface CrudFormData {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined;
}

export interface CrudFormSchema {
  title: string;
  endpoint: string;
  method: "POST" | "PATCH";

  columns: CrudColumn[];
  fields: CrudField[];
}