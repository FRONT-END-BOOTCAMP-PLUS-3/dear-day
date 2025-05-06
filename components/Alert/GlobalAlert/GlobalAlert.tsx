import { useAlertStore } from "@/store/useAlertStore";
import { AlertContentMap } from "@/store/useAlertStore";
import Alert from "../Alert/Alert";

export default function GlobalAlert() {
  const { isOpen, type, content, closeAlert } = useAlertStore();

  if (!isOpen || !content) return null;

  let alertContent: React.ReactNode = null;

  if (type === "waiting") {
    const { title, waitingNumber, waitingAhead } =
      content as AlertContentMap["waiting"];

    if (waitingAhead === 0) {
      alertContent = (
        <>
          <span>
            {title}의 대기번호는 <strong>{waitingNumber}</strong>번입니다.
            <br />
          </span>
          <span>
            ✅ <strong>지금 바로 입장하실 수 있어요!</strong>
          </span>
        </>
      );
    } else {
      alertContent = (
        <>
          <span>
            {title}의 대기번호는 <strong>{waitingNumber}</strong>번이며,
            <br />
          </span>
          <span>
            입장까지 <strong>{waitingAhead}</strong>팀 남았습니다.
          </span>
        </>
      );
    }
  } else if (type === "info") {
    const { message } = content as AlertContentMap["info"];
    alertContent = <span>{message ?? "새로운 알림이 도착했습니다."}</span>;
  } else if (type === "reservation") {
    const { message } = content as AlertContentMap["reservation"];
    alertContent = <span>{message ?? "예약 시간이 다가오고 있습니다."}</span>;
  }

  return (
    <Alert type={type} onClose={closeAlert}>
      {alertContent}
    </Alert>
  );
}
