import { EventData } from "../../eventData";
import Image from "next/image";

interface Props {
  eventData: EventData;
}

export default function DetailSection({ eventData }: Props) {
  return (
    <div>
      {eventData.detailImage.map((img, idx) => (
        <Image key={idx} src={img} alt="Event Image" width={500} height={300} />
      ))}
    </div>
  );
}
