import "./VenueCards.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import HeaderForHome from "../HeaderForHome/HeaderForHome";
import Modal from "@mui/material/Modal";
import NewVenueCard from "../NewVenueCard/NewVenueCard";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

export default function Venue({ url, bucketId }) {
  const [venue, setVenue] = useState([]);
  const [addVenue, setAddVenue] = useState(false);

  const navigate = useNavigate();

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
    if (bucketId) {
      getVenueData();
    } else {
      navigate("/bucketlist");
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
                <h3 className="venue-list__sub-title">{v.visitedplaces}</h3>
                <h4 className="venue-list__date">
                  On {v.when} in {v.visitedplaces}{" "}
                </h4>

                <Rating name="read-only" value={v.ratings} readOnly />
                <div className="venue-list__image-container">
                  <img
                    src={`${url}/${v.image_url}`}
                    alt={v.image_url}
                    className="venue-list__image"
                  />
                </div>
                <p className="venue_list__text">{v.content}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleAddVenue}>Add a new venue card</button>
        </section>
      </section>
    </>
  );
}
