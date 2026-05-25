const TOKEN_KEY = "access_token";

export const tokenStorage = {
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  get() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  remove() {
    localStorage.removeItem(TOKEN_KEY);
  },
};