import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";

export const createStar = async (starData: CreateStarDto) => {
  const response: Response = await fetch("/api/star", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(starData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Failed to create star:", result.error);
  }

  return result;
};
