import { apiFetch } from "@/lib/fetch";

export interface LoginDTO {
  email: string;
  password: string;
}

export const authApi = {
  login: (data: LoginDTO) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () =>
    apiFetch("/auth/me", {
      method: "GET",
    }),

  logout: () =>
    apiFetch("/auth/logout", {
      method: "POST",
    }),
};

// import { useAuthStore } from "@/modules/auth/store/auth.store";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function apiFetch<T>(
//   url: string,
//   options: RequestInit = {},
// ): Promise<T> {
//   const res = await fetch(`${API_URL}${url}`, {
//     ...options,
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//   });

//   if (res.status === 401) {
//     // 🔥 logout global automático
//     useAuthStore.getState().logout?.();

//     if (typeof window !== "undefined") {
//       window.location.href = "/login";
//     }

//     throw new Error("Unauthorized");
//   }

//   if (!res.ok) {
//     const error = await res.json().catch(() => ({}));
//     throw new Error(error.message || "API Error");
//   }

//   return res.json();
// }
