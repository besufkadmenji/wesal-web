import { redirect } from "next/navigation";

const AuthPage = () => {
  redirect("/en/auth/choose-type");
};

export default AuthPage;
