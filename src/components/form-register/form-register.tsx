"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styles from "./form-register.module.css";
import { TypeUserForm } from "@/types/types";
import { addUser } from "@/services/user";
import { useAppDispatch } from "@/hooks/hooks";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";

export default function FormRegister(): React.JSX.Element {
  const router = useRouter();

  const SignupSchema = yup.object().shape({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
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
            {...register("firstName")}
          />
          <span className={styles.form_register__error}>
            {errors.firstName && <p>{errors.firstName.message}</p>}
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
            {...register("email")}
            aria-invalid={errors.email ? true : false}
          />
          <span className={styles.form_register__error}>
            {errors.email && <p>{errors.email.message}</p>}
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
            {...register("password")}
            aria-invalid={errors.password ? true : false}
          />
          <div className={styles.form_register__error}>
            {errors.password && <p>{errors.password.message}</p>}
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
