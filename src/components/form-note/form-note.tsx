"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styles from "./form-note.module.css";
import { TypeNoteForm } from "@/types/types";
import { addNote } from "@/services/notes";
import { useAppDispatch } from "@/hooks/hooks";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";

export default function FormNote(): React.JSX.Element {
  const SignupSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  type Schema = InferType<typeof SignupSchema>;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<Schema>({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<TypeNoteForm> = (data: TypeNoteForm) =>
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
            {...register("title")}
          />
          <span className={styles.form_note__error}>
            {errors.title && <p>{errors.title.message}</p>}
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
            {...register("description")}
          />
          <span className={styles.form_note__error}>
            {errors.description && <p>{errors.description.message}</p>}
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
