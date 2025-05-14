import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";

export const createStar = async (starData: CreateStarDto, imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("stageName", starData.stageName);
  formData.append("realName", starData.realName || "");
  formData.append("group", starData.group || "");
  formData.append("birthday", starData.birthday.toISOString());

  const response: Response = await fetch("/api/star", {
    method: "POST",
    body: formData, // JSON 형식이 아닌 form-data로 전송
  });

  try {
    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 JSON 파싱 오류:", error);
    }
    throw new Error("서버에서 올바른 JSON 응답을 반환하지 않았습니다.");
  }
};
