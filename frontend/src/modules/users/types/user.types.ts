export enum UserRole {
  ADMIN = "ADMIN",

  USER = "USER",

  MANAGER = "MANAGER",

  SUPPORT = "SUPPORT",
}

export interface User {
  id: string;

  name: string;

  email: string;

  role: UserRole;

  createdAt?: string;

  updatedAt?: string;
}
export interface CreateUserDTO {
  name: string;

  email: string;

  password: string;

  role: UserRole;
}

export interface UpdateUserDTO {
  name?: string;

  email?: string;

  password?: string;

  role?: UserRole;
}
