import styles from "./List.module.scss";

type ListProps = {
  image: string;
};

const List: React.FC<ListProps> = ({ image }) => {
  return (
    <div className={styles.listItem}>
      <img src={image} alt="Wishlist item" className={styles.image} />
    </div>
  );
};

export default List;
