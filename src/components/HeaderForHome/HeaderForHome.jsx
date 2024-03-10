import "./HeaderForHome.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HeaderForHome({ user, userId }) {
  const Navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("userId");
    Navigate("/");
  };
  return (
    <header className="navBar">
      <Link to="/home" className="navBar__logo" />

      <nav className="navBar__list">
        {userId ? (
          <p className="navBar__links navBar__links--user">Welcome: {user}</p>
        ) : (
          <Link to={"/home"} className="navBar__links ">
            Home
          </Link>
        )}
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
