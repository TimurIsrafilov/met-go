import styles from "@/styles/register.module.css";
import FormRegister from "@/components/form-register/form-register";

function Register(): React.JSX.Element {
  return (
    <div className={styles.register}>
      <FormRegister />
    </div>
  );
}

export default Register;
