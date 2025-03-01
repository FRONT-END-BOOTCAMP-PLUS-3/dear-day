import Icon from "@/components/Icon/Icon";
import styles from "./Profile.module.scss";
const Profile = () => {
  return (
    <div className={styles.profileSection}>
      <div className={styles.textContainer}>
        <h1>카리나</h1>
        <p>likelion@gmail.com</p>
      </div>
      <div className={styles.iconContainer}>
        <Icon id="setting" />
      </div>
    </div>
  );
};
export default Profile;
