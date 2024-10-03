"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styles from "./form-note.module.css";
import { TypeNoteForm } from "@/types/types";
import { addNote } from "@/services/notes";
import { useAppDispatch } from "@/hooks/hooks";

export default function FormNote(): React.JSX.Element {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TypeNoteForm>({ mode: "onChange" });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<TypeNoteForm> = (data) =>
    dispatch(addNote({ ...data, key: uuidv4() }));

  return (
    <form className={styles.form_note} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.form_note__title}>Note Form</h1>

      <div className={styles.form_note__inputs_container}>
        <div className={styles.form_note__input_container}>
          <label className={styles.form_note__input_label}>Note Title</label>
          <input
            className={`${styles.form_note__input} ${
              errors.title ? styles.form_note__input_error : ""
            }`}
            type="text"
            placeholder="Enter note title"
            {...register("title", {
              required: {
                value: true,
                message: "title is required",
              },
            })}
            aria-invalid={errors.title ? true : false}
          />
          <span className={styles.form_note__error}>
            {errors.title && <a role="alert">{errors.title.message}</a>}
          </span>
        </div>

        <div className={styles.form_note__input_container}>
          <label className={styles.form_note__input_label}>
            Note Description
          </label>
          <input
            className={`${styles.form_note__input} ${
              errors.description ? styles.form_note__input_error : ""
            }`}
            type="text"
            placeholder="Enter note description"
            {...register("description", {
              required: {
                value: true,
                message: "description is required",
              },
            })}
            aria-invalid={errors.description ? true : false}
          />
          <span className={styles.form_note__error}>
            {errors.description && (
              <a role="alert">{errors.description.message}</a>
            )}
          </span>
        </div>
      </div>

      <button
        className={
          isValid ? styles.form_note__button : styles.form_note__button_disable
        }
        type="submit"
        disabled={!isValid}
      >
        Save Note
      </button>
    </form>
  );
}
