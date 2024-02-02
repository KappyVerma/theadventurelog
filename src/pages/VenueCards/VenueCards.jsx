import "./Venue.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import HeaderForHome from "../HeaderForHome/HeaderForHome";

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
    if (params) {
      getVenueData();
    }
  }, [params]);

  return (
    <>
      <HeaderForHome />
      <section>
        <ul>
          {venue.map((v) => (
            <li key={v.id}>
              <h2>{v.visitedplaces}</h2>
              <p>{v.content}</p>
              <p>Rating : {v.ratings}/5 </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
