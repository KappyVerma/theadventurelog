import "./VenueCards.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import HeaderForHome from "../HeaderForHome/HeaderForHome";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import NewVenueCard from "../NewVenueCard/NewVenueCard";

export default function Venue({ url, bucketId }) {
  const [venue, setVenue] = useState([]);
  const [addVenue, setAddVenue] = useState(false);

  const handleAddVenue = () => {
    setAddVenue(true);
  };
  const closeAddVenue = () => {
    setAddVenue(false);
  };

  const getVenueData = async () => {
    const response = await axios.get(`${url}/bucketlist/${bucketId}/venue`);
    setVenue(response.data);
  };
  useEffect(() => {
    // localStorage.setItem("bucketId", params.id);

    if (bucketId) {
      getVenueData();
    }
  }, [bucketId]);

  return (
    <>
      <section>
        <HeaderForHome />
        <section className="venue-list">
          <Modal
            open={addVenue}
            onClose={closeAddVenue}
            className="venue-list__modal"
          >
            <NewVenueCard
              url={url}
              bucketId={bucketId}
              handleCloseModal={closeAddVenue}
              getVenueData={getVenueData}
            />
          </Modal>

          <ul className="venue-list__container">
            {venue.map((v) => (
              <li key={v.id}>
                <h2 className="venue-list__title">{v.visitedplaces}</h2>
                <p className="venue_list__text">{v.content}</p>
                <p className="venue-list__text">Rating : {v.ratings}/5 </p>
                <div className="venue-list__image-container">
                  <img
                    src={`${url}/${v.image_url}`}
                    alt={v.image_url}
                    className="venue-list__image"
                  />
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleAddVenue}>Add a new venue card</button>
        </section>
      </section>
    </>
  );
}
