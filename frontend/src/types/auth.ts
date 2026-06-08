export type User = {
  sub: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "MANAGER" | "SUPPORT";
};
