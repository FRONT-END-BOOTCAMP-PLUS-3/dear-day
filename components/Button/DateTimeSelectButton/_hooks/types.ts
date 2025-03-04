export interface Reservation {
  date: string;
  times: { time: string; count: number }[];
}

export interface DateTimeSelectButtonProps {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  eventId?: number;
  limit?: number;
}
