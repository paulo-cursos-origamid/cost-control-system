import { UserRole } from "@/modules/users/types/user.types";

export function isAdmin(role?: UserRole) {
  return role === UserRole.ADMIN;
}

export function isUser(role?: UserRole) {
  return role === UserRole.USER;
}

export function isManager(role?: UserRole) {
  return role === UserRole.MANAGER;
}

export function isSupport(role?: UserRole) {
  return role === UserRole.SUPPORT;
}
