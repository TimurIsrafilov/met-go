import styles from "@/styles/profile.module.css";
import FormNote from "@/components/form-note/form-note";
import User from "@/components/user-info/user-info";

function Profile(): React.JSX.Element {
  return (
    <div className={styles.profile}>
      <User />
      <FormNote />
    </div>
  );
}

export default Profile;
