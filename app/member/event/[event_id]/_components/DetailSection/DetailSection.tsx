import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import Image from "next/image";

interface Props {
  eventData: ShowEventDetailDto;
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
