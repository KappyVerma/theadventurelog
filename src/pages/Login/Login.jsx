import "./Login.scss";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      Navigate("/bucketlist");
    }
  }, []);

  return (
    <section className="login-page">
      <Header />
      <div className="login-page__background"></div>
      <p className="login-page__text">
        Share you travel stories from far and wide
      </p>
    </section>
  );
}
