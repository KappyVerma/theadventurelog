import "./VenueCards.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import HeaderForHome from "../HeaderForHome/HeaderForHome";
import { Link } from "react-router-dom";

export default function Venue() {
  const [venue, setVenue] = useState([]);

  const params = useParams();

  useEffect(() => {
    const getVenueData = async () => {
      const response = await axios.get(
        `http://localhost:8080/bucketlist/${params.id}/venue`
      );
      setVenue(response.data);
    };
    localStorage.setItem("bucketId", params.id);
    if (params) {
      getVenueData();
    }
  }, [params]);

  return (
    <>
      <HeaderForHome />
      <section className="venue">
        <ul>
          {venue.map((v) => (
            <li key={v.id}>
              <h2>{v.visitedplaces}</h2>
              <p>{v.content}</p>
              <p>Rating : {v.ratings}/5 </p>
              <img src={`http://localhost:8080/${v.image_url}`} alt="" />
            </li>
          ))}
        </ul>
        <Link to={`/bucketlist/${params.id}/venue`}>Add a new venue card</Link>
      </section>
    </>
  );
}
