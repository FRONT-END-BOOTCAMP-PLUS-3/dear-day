import { create } from "zustand";

interface ReservationState {
  date: string | null;
  time: string | null;
  setReservation: (date: string, time?: string) => void; // time은 선택적으로 받음
  clearReservation: () => void;
}

const useReservationStore = create<ReservationState>((set) => ({
  date: null,
  time: null,

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
}));

export default useReservationStore;
