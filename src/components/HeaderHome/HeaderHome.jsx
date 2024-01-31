import "./HeaderHome.scss";
import { Link } from "react-router-dom";

export default function HeaderHome(props) {
  return (
    <header className="navBar">
      <div className="navBar__logo-container">
        <Link to="/" className="navBar__logo"></Link>
      </div>
      <nav className="navBar__list">
        <Link className="navBar__links">Home</Link>
        <Link to={"/bucketlist"} className="navBar__links navBar__links--mod">
          Bucket List
        </Link>
      </nav>
    </header>
  );
}
