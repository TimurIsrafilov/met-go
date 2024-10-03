import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { wrapper } from "@/services/store";
import { selectUser } from "@/services/user";
import { TypeUserForm } from "@/types/types";
import { useAppSelector } from "@/hooks/hooks";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const user: TypeUserForm | null = useAppSelector(selectUser);

  useEffect(() => {
    if (sessionStorage.getItem("token") && user) {
      router.push("/profile");
    } else {
      router.push("/register");
    }
  }, [router, user]);

  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
