import "./Landing.scss";
import HeaderForLogin from "../../components/HeaderForLogin/HeaderForLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      Navigate("/");
    }
  }, []);

  return (
    <section className="login-page">
      <HeaderForLogin />
      <div className="login-page__background"></div>
    </section>
  );
}
