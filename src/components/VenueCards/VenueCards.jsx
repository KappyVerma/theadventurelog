import "./VenueCards.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import HeaderForHome from "../HeaderForHome/HeaderForHome";
import Modal from "@mui/material/Modal";
import NewVenueCard from "../NewVenueCard/NewVenueCard";
import { useNavigate } from "react-router-dom";
import { IconButton, Rating } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
          <button className="venue-list__button" onClick={handleAddVenue}>
            {" "}
            <span className="venue-list__add-icon"></span>Local Attractions
          </button>
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

          <ul>
            {venue.map((v) => (
              <li key={v.id} className="venue-list__container">
                <IconButton aria-label="close" onclick={v.id}>
                  <EditIcon />
                </IconButton>
                <div className="venue-list__block">
                  <h3 className="venue-list__title">{v.visitedplaces}</h3>
                  <h4 className="venue-list__date">
                    {v.when} in {v.destination}
                  </h4>

                  <Rating name="read-only" value={v.ratings} readOnly />
                </div>
                <div className="venue-list__image-container">
                  <img
                    src={`${url}/${v.image_url}`}
                    alt={v.image_url}
                    className="venue-list__image"
                  />
                </div>
                <div className="venue-list__block">
                  <p className="venue-list__block--fonts">{v.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}
