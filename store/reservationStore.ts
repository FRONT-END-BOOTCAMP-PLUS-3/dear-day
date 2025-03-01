import { create } from "zustand";

interface ReservationState {
  date: string | null;
  time: string | null;
  isSoldOut: boolean;
  setReservation: (date: string, time?: string) => void; // time은 선택적으로 받음
  clearReservation: () => void;
  setSoldOut: (soldOut: boolean) => void; // 솔드아웃 상태 설정
}

const useReservationStore = create<ReservationState>((set) => ({
  date: null,
  time: null,
  isSoldOut: false, // 기본값은 false

  setReservation: (date, time) =>
    set((state) => ({
      date,
      time: state.date === date ? time || null : null, // 날짜 변경 시 시간 초기화
    })),

  clearReservation: () =>
    set(() => ({
      date: null,
      time: null,
    })),

  setSoldOut: (soldOut) =>
    set(() => ({
      isSoldOut: soldOut, // 솔드아웃 여부 업데이트
    })),
}));

export default useReservationStore;
