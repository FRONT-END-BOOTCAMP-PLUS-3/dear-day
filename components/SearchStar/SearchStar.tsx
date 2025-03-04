"use client";

import styles from "./SearchStar.module.scss";
import SearchInput from "../Input/SearchInput/SearchInput";
import StarView from "../StarView/StarView";
import { searchStarListDto } from "@/application/usecases/star/dto/SearchStarListDto";
import { useEffect, useState } from "react";
import { searchStarByKeyword } from "@/app/member/search_star/_api/searchStarByKeyword";

interface SearchStarProps {
  onSelectStar?: (id: number) => void;
  onSelectId?: (id: number) => void;
}

const SearchStar: React.FC<SearchStarProps> = ({
  onSelectStar,
  onSelectId,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<searchStarListDto[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchStarByKeyword(debouncedQuery);
        setResults(data);
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

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
            results.map((item: any) => (
              <li
                key={item.id}
                className={styles.searchStarItem}
                onClick={() => {
                  onSelectStar?.(item.id);
                  onSelectId?.(item.id);
                }}
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
