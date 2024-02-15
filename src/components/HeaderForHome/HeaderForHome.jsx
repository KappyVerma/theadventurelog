import "./HeaderForHome.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HeaderForHome() {
  const Navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    Navigate("/");
  };
  return (
    <header className="navBar">
      <Link to="/bucketlist" className="navBar__logo"></Link>

      <nav className="navBar__list">
        <Link to={"/bucketlist/maps"} className="navBar__links ">
          My Map
        </Link>
        <Link to={"/bucketlist"} className="navBar__links ">
          Bucket List
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
