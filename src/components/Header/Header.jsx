import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

export default function Header(props) {
  return (
    <header className="navBar">
      <div className="navBar__logo-container">
        <Link to="/" className="navBar__logo"></Link>
      </div>
      <nav className="navBar__list">
        <NavLink to={props.routeOne} className="navBar__links">
          {props.linkOne}
        </NavLink>
        <NavLink
          to={props.routeTwo}
          className="navBar__links navBar__links--mod"
        >
          {props.linkTwo}
        </NavLink>
      </nav>
    </header>
  );
}
