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
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json(); // API에서 오는 에러 메시지 확인
        throw new Error(errorData.error || "로그인 실패");
      }

      const data = await res.json();
      set({ user: { id: data.id } });
    } catch (error) {
      throw new Error("로그인 실패"); // 프론트엔드에서 에러 메시지를 처리하도록 다시 던짐
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    set({ user: null });
  },

  checkLogin: async () => {
    const res = await fetch("/api/auth/user", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      set({ user: { id: data.id } });
    }
  },
}));
