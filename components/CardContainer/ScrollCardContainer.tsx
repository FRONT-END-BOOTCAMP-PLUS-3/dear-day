import styles from "./CardContainer.module.scss";

type ScrollCardContainerProps = {
  variant: "list" | "grid" | "gridStar";
  children: React.ReactNode;
};

const ScrollCardContainer: React.FC<ScrollCardContainerProps> = ({
  variant,
  children,
}) => {
  return (
    <div className={styles.scrollCardContainer}>
      <div className={styles[variant]}>{children}</div>
    </div>
  );
};
export default ScrollCardContainer;
