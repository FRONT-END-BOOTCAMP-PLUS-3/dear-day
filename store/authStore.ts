import { create } from "zustand";

interface AuthState {
  user: { id: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkLogin: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    set({ user: { id: data.id } });
  },

  logout: async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    set({ user: null });
  },

  checkLogin: async () => {
    const res = await fetch("/api/user", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      set({ user: { id: data.id } });
    }
  },
}));
