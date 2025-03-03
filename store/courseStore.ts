import { create } from "zustand";

interface CourseState {
  name: string;
  date: Date;
  courseId: number;
  courseEvent: number[];
  setName: (name: string) => void;
  setDate: (date: Date) => void;
  setCourseEvent: (events: number[]) => void;
  setCourseId: (id: number) => void;
  reset: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  name: "",
  date: new Date(),
  courseEvent: [],
  courseId: 1,
  setName: (name: string) => set(() => ({ name })),
  setDate: (date: Date) => set(() => ({ date })),
  setCourseEvent: (events: number[]) =>
    set(() => ({
      courseEvent: events,
    })),
  setCourseId: (id: number) => set(() => ({ courseId: id })),
  reset: () =>
    set(() => ({
      name: "",
      date: new Date(),
      courseEvent: [],
      courseId: 1,
    })),
}));
