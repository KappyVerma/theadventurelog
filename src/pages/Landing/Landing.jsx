import "./Landing.scss";
import HeaderForLogin from "../../components/HeaderForLogin/HeaderForLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      Navigate("/bucketlist");
    }
  }, []);

  return (
    <section className="login-page">
      <HeaderForLogin />
      <div className="login-page__background"></div>
      <p className="login-page__text">
        Share you travel stories from far and wide
      </p>
    </section>
  );
}
