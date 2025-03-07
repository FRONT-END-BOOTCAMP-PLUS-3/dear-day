import { create } from "zustand";

// Step 1, 2, 3의 데이터를 각각 인터페이스로 정의
interface RegisterEventStep1 {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  title: string;
  twitterId: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

interface RegisterEventStep2 {
  mode: string;
  openAt: Date | null;
  breaktime: number | null;
  limit: number | null;
}

interface RegisterEventStep3 {
  mainImage: string;
  detailImage: string[] | null;
  benefits: string[] | null;
}

// SearchStar에서 가져올 데이터
interface SearchStarData {
  starId: number; // 타입을 number로 변경
}

// 전체 이벤트 데이터 타입
interface RegisterEventData
  extends RegisterEventStep1,
    RegisterEventStep2,
    RegisterEventStep3,
    SearchStarData {}

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
  step: 0, // 초기값 0으로 변경 (SearchStar부터 시작)
  setStep: (step) => set({ step }),
  eventData: {
    starId: 0,
    placeName: "",
    address: "",
    latitude: 0,
    longitude: 0,
    title: "",
    twitterId: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "",
    endTime: "",

    mode: "",
    openAt: null,
    breaktime: null,
    limit: null,

    mainImage: "",
    detailImage: [],
    benefits: [],
  },
  updateEventData: (data) =>
    new Promise((resolve) => {
      set((state) => ({
        eventData: { ...state.eventData, ...data },
      }));
      console.log(
        "최신 Store 데이터:",
        useRegisterEventStore.getState().eventData
      );
      resolve();
    }),
  resetEventData: () =>
    set({
      step: 0, // 초기 상태도 0으로 초기화
      eventData: {
        starId: 0,
        placeName: "",
        address: "",
        latitude: 0,
        longitude: 0,
        title: "",
        twitterId: "",
        startDate: new Date(),
        endDate: new Date(),
        startTime: "",
        endTime: "",

        mode: "",
        openAt: null,
        breaktime: null,
        limit: null,

        mainImage: "",
        detailImage: [],
        benefits: [],
      },
    }),
}));
