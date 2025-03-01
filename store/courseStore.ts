import { CourseEventProps } from "@/app/member/course/create/page";
import { create } from "zustand";

interface CourseState {
  name: string;
  date: Date;
  courseEvent: CourseEventProps[];
  setName: (name: string) => void;
  setDate: (date: Date) => void;
  setCourseEvent: (events: CourseEventProps[]) => void;
  removeCourseEvent: (eventId: number) => void;
  reset: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  name: "",
  date: new Date(),
  courseEvent: [],
  setName: (name: string) => set(() => ({ name })),
  setDate: (date: Date) => set(() => ({ date })),
  setCourseEvent: (events: CourseEventProps[]) =>
    set(() => ({
      courseEvent: events,
    })),
  removeCourseEvent: (eventId: number) =>
    set((state) => ({
      courseEvent: state.courseEvent.filter((event) => event.id !== eventId),
    })),
  reset: () => set(() => ({ name: "", date: new Date(), courseEvent: [] })),
}));
