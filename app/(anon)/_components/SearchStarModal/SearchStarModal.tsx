import styles from "./SearchStarModal.module.scss";
import Icon from "@/components/Icon/Icon";
import SearchStar from "@/components/SearchStar/SearchStar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface SearchStarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchStarModalProps) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSelectStar = async (starId: number) => {
    if (user) {
      router.push(`/member/search_star/${starId}`);
    } else {
      router.push(`/search_star/${starId}`);
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
