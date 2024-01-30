import "./HomePage.scss";
import Header from "../../components/Header/Header";

export default function HomePage() {
  return (
    <section className="homePage">
      <Header
        linkOne="Home Page"
        linkTwo="Bucket List"
        routeTwo="bucket-list"
      />
    </section>
  );
}
