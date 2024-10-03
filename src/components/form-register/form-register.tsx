"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styles from "./form-register.module.css";
import { TypeUserForm } from "@/types/types";
import { addUser } from "@/services/user";
import { useAppDispatch } from "@/hooks/hooks";

export default function FormRegister(): React.JSX.Element {
  const router = useRouter();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TypeUserForm>({ mode: "onChange" });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<TypeUserForm> = (data) => {
    dispatch(addUser({ firstName: data.firstName, email: data.email }));
    sessionStorage.setItem("token", uuidv4());
    sessionStorage.setItem("userName", data.firstName);
    sessionStorage.setItem("userEmail", data.email);
    router.push("/profile");
  };

  return (
    <form className={styles.form_register} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.form_register__title}>Register Form</h1>
      <div className={styles.form_register__inputs_container}>
        <div className={styles.form_register__input_container}>
          <label className={styles.form_register__input_label}>Name</label>
          <input
            className={`${styles.form_register__input} ${
              errors.firstName ? styles.form_register__input_error : ""
            }`}
            type="text"
            placeholder="Enter your name"
            {...register("firstName", {
              required: {
                value: true,
                message: "name is required",
              },
            })}
            aria-invalid={errors.firstName ? true : false}
          />
          <span className={styles.form_register__error}>
            {errors.firstName && <a role="alert">{errors.firstName.message}</a>}
          </span>
        </div>

        <div className={styles.form_register__input_container}>
          <label className={styles.form_register__input_label}>E-mail</label>
          <input
            className={`${styles.form_register__input} ${
              errors.email ? styles.form_register__input_error : ""
            }`}
            type="email"
            placeholder="Enter your e-mail"
            {...register("email", {
              required: {
                value: true,
                message: "e-mail is required",
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                message: "Invalid e-mail format",
              },
            })}
            aria-invalid={errors.email ? true : false}
          />
          <span className={styles.form_register__error}>
            {errors.email && <a role="alert">{errors.email.message}</a>}
          </span>
        </div>

        <div className={styles.form_register__input_container}>
          <label className={styles.form_register__input_label}>Password</label>
          <input
            className={`${styles.form_register__input} ${
              errors.password ? styles.input_error : ""
            }`}
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
              minLength: {
                value: 6,
                message: "min 6 simbols allowed",
              },
            })}
            aria-invalid={errors.password ? true : false}
          />
          <div className={styles.form_register__error}>
            {errors.password && <a role="alert">{errors.password.message}</a>}
          </div>
        </div>
      </div>

      <button
        className={
          isValid
            ? styles.form_register__button
            : styles.form_register__button_disable
        }
        type="submit"
        disabled={!isValid}
      >
        Register
      </button>
    </form>
  );
}
