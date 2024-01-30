import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header(props) {
  return (
    <header className="navBar">
      <div className="navBar__logo-container">
        <p className="navBar__logo"></p>
      </div>
      <nav className="navBar__list">
        <NavLink to="home" className="navBar__links">
          {props.signIn}
        </NavLink>
        <NavLink to="home" className="navBar__links navBar__links--mod">
          {props.signOut}
        </NavLink>
      </nav>
    </header>
  );
}
