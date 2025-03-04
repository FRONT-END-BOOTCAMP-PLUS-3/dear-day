"use client";

import styles from "./SearchStar.module.scss";
import SearchInput from "../Input/SearchInput/SearchInput";
import StarView from "../StarView/StarView";
import { searchStarListDto } from "@/application/usecases/star/dto/SearchStarListDto";

interface SearchStarProps {
  query: string;
  setQuery: (query: string) => void;
  results: searchStarListDto[];
  onSelectStar?: (id: number) => void;
  onSelectId?: (id: number) => void;
  isLoading: boolean;
}

const SearchStar: React.FC<SearchStarProps> = ({
  query,
  setQuery,
  results,
  onSelectStar,
  isLoading,
}) => {
  return (
    <>
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"스타의 이름을 검색하세요"}
      />

      {query.trim() !== "" && (
        <ul className={styles.searchStarContainer}>
          {isLoading ? (
            <li className={styles.searchStarNoItem}>
              <p>검색 중...</p>
            </li>
          ) : results.length > 0 ? (
            results.map((item) => (
              <li
                key={item.id}
                className={styles.searchStarItem}
                onClick={() => onSelectStar(item.id)}
              >
                <StarView starImage={item.image} starName={item.name} />
              </li>
            ))
          ) : (
            !isLoading &&
            query.trim() !== "" && (
              <li className={styles.searchStarNoItem}>
                <p>결과 없음</p>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};

export default SearchStar;
