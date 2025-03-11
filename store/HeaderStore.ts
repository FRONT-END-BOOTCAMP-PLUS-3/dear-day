import { create } from "zustand";

interface HeaderState {
  title: string;
  setTitle: (name: string) => void;
  reset: () => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: "",
  setTitle: (title: string) => set(() => ({ title })),
  reset: () =>
    set(() => ({
      title: "",
    })),
}));
