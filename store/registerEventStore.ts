import { create } from "zustand";

// ✅ Step 1, 2, 3의 데이터를 각각 인터페이스로 정의
interface RegisterEventStep1 {
  address: string;
  latitude: number;
  longitude: number;
  title: string;
  twitterId: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
}

interface RegisterEventStep2 {
  mode: string;
  openAt: string | null;
  breakTime: number | null;
  limit: number | null;
}

interface RegisterEventStep3 {
  mainImage: string;
  detailImage: string[];
  benefits: string[];
}

// ✅ 전체 이벤트 데이터 타입
interface RegisterEventData
  extends RegisterEventStep1,
    RegisterEventStep2,
    RegisterEventStep3 {}

// ✅ Zustand Store 타입 정의
interface RegisterEventState {
  step: number;
  setStep: (step: number) => void;
  eventData: RegisterEventData;
  updateEventData: (data: Partial<RegisterEventData>) => void;
  resetEventData: () => void;
}

// ✅ Zustand Store 생성
export const useRegisterEventStore = create<RegisterEventState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  eventData: {
    // Step1 초기값
    address: "",
    latitude: 0,
    longitude: 0,
    title: "",
    twitterId: "",
    startDate: null,
    endDate: null,
    startTime: "",
    endTime: "",

    // Step2 초기값
    mode: "",
    openAt: "",
    breakTime: 0,
    limit: 0,

    // Step3 초기값
    mainImage: "",
    detailImage: [],
    benefits: [],
  },
  updateEventData: (data) =>
    set((state) => ({
      eventData: { ...state.eventData, ...data },
    })),
  resetEventData: () =>
    set({
      eventData: {
        address: "",
        latitude: 0,
        longitude: 0,
        title: "",
        twitterId: "",
        startDate: null,
        endDate: null,
        startTime: "",
        endTime: "",

        mode: "",
        openAt: "",
        breakTime: 0,
        limit: 0,

        mainImage: "",
        detailImage: [],
        benefits: [],
      },
    }),
}));
