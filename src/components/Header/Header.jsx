import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="navBar">
      <div className="navBar__logo-container">
        <Link to="/" className="navBar__logo"></Link>
      </div>
      <nav className="navBar__list">
        <Link to="/signin" className="navBar__links">
          Sign in
        </Link>
        <Link className="navBar__links navBar__links--mod">Sign up</Link>
      </nav>
    </header>
  );
}
