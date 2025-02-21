import { ChangeEvent } from "react";
import styles from "./SearchInput.module.scss";
import Icon from "@/components/Icon/Icon";

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
}: SearchInputProps) => {
  return (
    <div className={styles.searchInputContainer}>
      <Icon id="search" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default SearchInput;
