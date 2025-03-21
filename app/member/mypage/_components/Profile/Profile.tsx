import Icon from "@/components/Icon/Icon";
import styles from "./Profile.module.scss";
import Link from "next/link";

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
      <Link href={"/member/mypage/setting/"}>
        <div className={styles.iconContainer}>
          <Icon id="setting" />
        </div>
      </Link>
    </div>
  );
};
export default Profile;
