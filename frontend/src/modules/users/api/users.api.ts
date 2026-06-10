import { apiFetch } from "@/lib/api";
import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/modules/users/types/user.types";

export const usersApi = {
  // Listar todos os usuários
  findAll: () => apiFetch<User[]>("/api/users"),

  // Buscar um usuário específico por ID
  findById: (id: string) => apiFetch<User>(`/api/users/${id}`),

  // Criar um novo usuário
  create: (data: CreateUserDTO) =>
    apiFetch<User>("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Atualizar um usuário existente
  update: (id: string, data: UpdateUserDTO) =>
    apiFetch<User>(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Deletar um usuário por ID
  remove: (id: string) =>
    apiFetch(`/api/users/${id}`, {
      method: "DELETE",
    }),
};
