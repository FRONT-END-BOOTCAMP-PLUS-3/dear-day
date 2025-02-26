import DateSelectButton from "@/components/Button/DateTimeSelectButton/DateTimeSelectButton";
import { EventData } from "../../../eventData";

interface Props {
  eventData: EventData;
}

export default function SelectDateTime({ eventData }: Props) {
  return (
    <div>
      <DateSelectButton
        eventId={eventData.id}
        limit={eventData.limit}
        startDate={eventData.startDate}
        endDate={eventData.endDate}
        startTime={eventData.startTime}
        endTime={eventData.endTime}
        onSelectDate={function (date: string): void {
          throw new Error("Function not implemented.");
        }}
        onSelectTime={function (time: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
