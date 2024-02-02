import "./HeaderForLogin.scss";
import { Link } from "react-router-dom";

export default function HeaderForLogin() {
  return (
    <header className="login-page-navBar">
      <Link to="/" className="login-page-navBar__logo"></Link>
      <nav className="login-page-navBar__list">
        <Link to="/signin" className="login-page-navBar__links">
          Log in
        </Link>
        <Link
          to="signup"
          className="login-page-navBar__links login-page-navBar__links--mod"
        >
          Sign up
        </Link>
      </nav>
    </header>
  );
}
