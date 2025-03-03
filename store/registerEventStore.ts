import { create } from "zustand";

// Step 1, 2, 3의 데이터를 각각 인터페이스로 정의
interface RegisterEventStep1 {
  placeName: string;
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

// 전체 이벤트 데이터 타입
interface RegisterEventData
  extends RegisterEventStep1,
    RegisterEventStep2,
    RegisterEventStep3 {}

// Store 타입 정의
interface RegisterEventState {
  step: number;
  setStep: (step: number) => void;
  eventData: RegisterEventData;
  updateEventData: (data: Partial<RegisterEventData>) => Promise<void>;
  resetEventData: () => void;
}

// Store 생성
export const useRegisterEventStore = create<RegisterEventState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  eventData: {
    placeName: "",
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
  updateEventData: (data) =>
    new Promise((resolve) => {
      set((state) => ({
        eventData: { ...state.eventData, ...data },
      }));
      resolve(); // 상태 업데이트 후 resolve 호출
    }),
  resetEventData: () =>
    set({
      eventData: {
        placeName: "",
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
