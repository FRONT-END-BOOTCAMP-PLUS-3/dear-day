import PosterUploadButton from "../Button/PosterUploadButton/PosterUploadButton";
import Tag from "../Tag/Tag";
import styles from "./RegisterEvent.module.scss";

const RegisterEventStep3 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerItem}>
        <p>메인 이미지</p>
        <PosterUploadButton
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className={styles.containerItem}>
        <p>상세 이미지</p>
        <PosterUploadButton
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className={styles.containerItem}>
        <p>특전</p>
        <div className={styles.benefits}>
          <Tag text="컵홀더" />
          <Tag text="스티커" />
          <Tag text="포토카드" />
          <Tag text="엽서" />
        </div>
      </div>
    </div>
  );
};

export default RegisterEventStep3;
