import Icon from "@/components/Icon/Icon";
import styles from "./Profile.module.scss";

type ProfileProps = {
  username: string;
  email: string;
};
const Profile: React.FC<ProfileProps> = ({ username, email }) => {
  return (
    <div className={styles.profileSection}>
      <div className={styles.textContainer}>
        <h1>{username}</h1>
        <p>{email}</p>
      </div>
      <div className={styles.iconContainer}>
        <Icon id="setting" />
      </div>
    </div>
  );
};
export default Profile;
