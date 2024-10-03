import { useRouter } from "next/navigation";
import styles from "./user-info.module.css";
import { selectUser, deleteUser } from "@/services/user";
import { selectNotes, deleteNote } from "@/services/notes";
import { TypeUserForm, TypeNoteForm } from "@/types/types";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";

function User() {
  const router = useRouter();

  const user: TypeUserForm | null = useAppSelector(selectUser);
  const notes: Array<TypeNoteForm> = useAppSelector(selectNotes);

  const dispatch = useAppDispatch();
  function handleNoteDelete(key: string): void {
    dispatch(deleteNote(key));
  }

  function handleLogout(): void {
    dispatch(deleteUser());
    sessionStorage.clear();
    router.push("/register");
  }

  return (
    <div className={styles.user_info}>
      <button
        type="button"
        className={styles.user_info__button}
        onClick={() => handleLogout()}
      >
        Logout
      </button>
      <h2 className={styles.user_info__title}>User Data:</h2>
      <h3
        className={styles.user_info__data}
      >{`User Name: ${user?.firstName}`}</h3>
      <h3 className={styles.user_info__data}>{`User Email: ${user?.email}`}</h3>
      <h3 className={styles.user_info__title}>User Notes:</h3>
      <div className={styles.user_info__note_header}>
        <h3 className={styles.user_info__note_title}>Note title:</h3>
        <h3 className={styles.user_info__note_description}>
          Note description:
        </h3>
      </div>
      
      <div className={styles.user_info__notes_container}>
        {notes.map((item: TypeNoteForm) => (
          <div className={styles.user_info__note_container} key={item.key}>
            <h4 className={styles.user_info__note_title}>{item.title}</h4>
            <p className={styles.user_info__note_description}>
              {item.description}
            </p>
            <button
              type="button"
              className={styles.user_info__note_delete}
              onClick={() => handleNoteDelete(item.key)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
