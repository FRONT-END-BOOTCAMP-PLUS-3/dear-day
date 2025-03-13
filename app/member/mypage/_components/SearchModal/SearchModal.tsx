import styles from "@/app/member/mypage/page.module.scss";
import Icon from "@/components/Icon/Icon";
import SearchStar from "@/components/SearchStar/SearchStar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshStars: () => void; // 찜한 스타 목록을 갱신하는 함수 추가
}

const SearchModal = ({ isOpen, onClose, refreshStars }: SearchModalProps) => {
  const handleSelectStar = async (starId: number) => {
    try {
      const response = await fetch(`/api/mypage/create-liked-star`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ starId }),
      });

      if (!response.ok) throw new Error("Failed to add star");

      await refreshStars();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 스타 선택 중 오류:", error);
      }
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <Icon id="close" />
        </button>
        <SearchStar onSelectStarId={handleSelectStar} />
      </div>
    </div>
  );
};

export default SearchModal;
