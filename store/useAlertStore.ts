import { create } from "zustand";

export type AlertType = "info" | "waiting" | "reservation";

export type AlertContentMap = {
  info: { message?: string };
  waiting: { title: string; waitingNumber: number; waitingAhead: number };
  reservation: { message?: string };
};

interface AlertState<T extends AlertType = AlertType> {
  isOpen: boolean;
  type: T;
  content: AlertContentMap[T] | null;
  showAlert: <K extends AlertType>(
    type: K,
    content: AlertContentMap[K]
  ) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertState>()((set) => ({
  isOpen: false,
  type: "info",
  content: null,
  showAlert: (type, content) =>
    set({ isOpen: true, type, content } as unknown as AlertState),
  closeAlert: () => set({ isOpen: false, content: null }),
}));
