import { searchStarListDto } from "@/application/usecases/star/dto/SearchStarListDto";

export const searchStarByKeyword = async (keyword: string) => {
  try {
    const response: Response = await fetch(
      `/api/star/search-star?keyword=${keyword}`
    );
    const result = await response.json();

    if (response.ok) {
      return result.data.map((star: searchStarListDto) => ({
        id: star.id,
        image: star.image,
        name: star.name,
      }));
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 검색 중 오류 발생:", error);
    }
    return [];
  }
};
