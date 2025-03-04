"use client";

import { useEffect, useState } from "react";
import styles from "./SearchStar.module.scss";
import SearchInput from "../Input/SearchInput/SearchInput";
import StarView from "../StarView/StarView";

interface Star {
  id: number;
  name: string;
  image: string;
}

interface SearchStarProps {
  onSelectStar: (star: Star) => void;
}

const SearchStar = ({ onSelectStar }: SearchStarProps) => {
  const [query, setQuery] = useState(""); // 검색어 상태
  // const [results, setResults] = useState<string[]>([]); // 검색 결과 상태
  // const [debouncedQuery, setDebouncedQuery] = useState(query);

  // 데베 연결 전 임시 데이터
  const data: Star[] = [
    { id: 1, name: "원빈", image: "/images/wonbin.jpg" },
    { id: 2, name: "윈터", image: "/images/winter.jpg" },
    { id: 3, name: "윈디", image: "/images/windy.jpg" },
    { id: 4, name: "보이넥스트도어", image: "/images/boynextdoor.jpg" },
    { id: 5, name: "워너원", image: "/images/wannaone.jpg" },
    { id: 6, name: "위너", image: "/images/winner.jpg" },
  ];

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 300);

  //   return () => clearTimeout(timer);
  // }, [query]);

  // useEffect(() => {
  //   if (debouncedQuery) {
  //     fetch(`/api/search?query=${debouncedQuery}`)
  //       .then((res) => res.json())
  //       .then((data) => setResults(data))
  //       .catch((error) => console.error("검색 오류:", error));
  //   } else {
  //     setResults([]);
  //   }
  // }, [debouncedQuery]);

  // 데베 연결 전 임시 필터링
  const filteredResults = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"스타의 이름을 검색하세요"}
      />

      {query && (
        <ul className={styles.searchStarContainer}>
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <li
                key={item.id}
                className={styles.searchStarItem}
                onClick={() => onSelectStar(item)} // 선택된 스타 전달
              >
                <StarView starImage={item.image} starName={item.name} />
              </li>
            ))
          ) : (
            <li className={styles.searchStarNoItem}>
              <p>결과 없음</p>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default SearchStar;
