import { create } from "zustand";

interface RegisterEventState {
  step: number;
  setStep: (step: number) => void;
  eventData: {
    eventName: string;
    ownerAccount: string;
    eventStartDate: string;
    eventEndDate: string;
    openTime: string;
    closeTime: string;
  };
  updateEventData: (data: Partial<RegisterEventState["eventData"]>) => void;
}

export const useRegisterEventStore = create<RegisterEventState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  eventData: {
    eventName: "",
    ownerAccount: "",
    eventStartDate: "",
    eventEndDate: "",
    openTime: "",
    closeTime: "",
  },
  updateEventData: (data) =>
    set((state) => ({ eventData: { ...state.eventData, ...data } })),
}));
