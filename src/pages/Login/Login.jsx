import "./Login.scss";
import Header from "../../components/Header/Header";

export default function Login() {
  return (
    <section className="login-page">
      <Header linkOne="sign in" linkTwo="sign out" routeOne="home" />
      <div className="login-page__background"></div>
      <p className="login-page__text">
        Share you travel stories from far and wide
      </p>
    </section>
  );
}
