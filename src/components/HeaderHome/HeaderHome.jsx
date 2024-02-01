import "./HeaderHome.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HeaderHome() {
  const Navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    Navigate("/");
  };
  return (
    <header className="navBar">
      <div className="navBar__logo-container">
        <Link to="/bucketlist" className="navBar__logo"></Link>
      </div>
      <nav className="navBar__list">
        <Link to={"/bucketlist"} className="navBar__links navBar__links--mod">
          Bucket List
        </Link>
        <button onClick={handleSignOut} className="navBar__links">
          Sign out
        </button>
      </nav>
    </header>
  );
}
