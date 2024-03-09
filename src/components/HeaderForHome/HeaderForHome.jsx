import "./HeaderForHome.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HeaderForHome() {
  const Navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("userId");
    Navigate("/");
  };
  return (
    <header className="navBar">
      <Link to="/home" className="navBar__logo" />

      <nav className="navBar__list">
        <Link to={"/home"} className="navBar__links ">
          Home
        </Link>
        <button
          onClick={handleSignOut}
          className="navBar__links navBar__links--mod"
        >
          Sign Out
        </button>
      </nav>
    </header>
  );
}
