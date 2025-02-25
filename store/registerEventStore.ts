import { create } from "zustand";

interface RegisterEventState {
  step: number;
  setStep: (step: number) => void;
  eventData: {
    // Step1 데이터
    address: string;
    title: string;
    twitterId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;

    // Step2 데이터
    mode: string;
    openAt: string;
    breakTime: string;
    limit: number;

    // Step3 데이터
    mainImage: string;
    detailImage: string;
    benefits: string[];
  };
  updateEventData: (data: Partial<RegisterEventState["eventData"]>) => void;
  resetEventData: () => void;
}

export const useRegisterEventStore = create<RegisterEventState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  eventData: {
    // Step1 초기값
    address: "",
    title: "",
    twitterId: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",

    // Step2 초기값
    mode: "",
    openAt: "",
    breakTime: "",
    limit: 0,

    // Step3 초기값
    mainImage: "",
    detailImage: "",
    benefits: [],
  },
  updateEventData: (data) =>
    set((state) => ({ eventData: { ...state.eventData, ...data } })),
  resetEventData: () =>
    set({
      eventData: {
        address: "",
        title: "",
        twitterId: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",

        mode: "",
        openAt: "",
        breakTime: "",
        limit: 0,

        mainImage: "",
        detailImage: "",
        benefits: [],
      },
    }),
}));
