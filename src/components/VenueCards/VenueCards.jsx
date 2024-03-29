import "./VenueCards.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import HeaderForHome from "../HeaderForHome/HeaderForHome";
import Modal from "@mui/material/Modal";
import NewVenueCard from "../NewVenueCard/NewVenueCard";
import { useNavigate } from "react-router-dom";
import { IconButton, Rating } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Todo from "../CreateTodo/CreateTodo";

export default function Venue({ url, bucketId }) {
  const [venue, setVenue] = useState([]);
  const [addVenue, setAddVenue] = useState(false);
  const [editVenue, setEditVenue] = useState(false);
  const [venueData, setVenueData] = useState({});
  const [destinations, setDestinations] = useState({});

  const navigate = useNavigate();

  const handleAddVenue = () => {
    setAddVenue(true);
  };
  const handleEditVenue = (venueData) => {
    setEditVenue(true);
    setVenueData(venueData);
  };
  const closeAddVenue = () => {
    setAddVenue(false);
    setEditVenue(false);
  };

  const handleDeleteVenue = async (venueId) => {
    try {
      await axios.delete(`${url}/venue/${venueId}`);
      getVenueData();
    } catch (err) {
      console.error(err);
    }
  };

  const getVenueData = async () => {
    const response = await axios.get(`${url}/bucketlist/${bucketId}/venue`);
    setVenue(response.data);
  };

  const getSingleBucketListData = async () => {
    const response = await axios.get(`${url}/bucketlist/${bucketId}`);
    setDestinations(response.data[0]);
  };

  useEffect(() => {
    if (bucketId) {
      getVenueData();
      getSingleBucketListData();
    } else {
      navigate("/home");
    }
  }, [bucketId]);

  return (
    <>
      <section>
        <HeaderForHome />
        <section className="box">
          <div className="box__component">
            <Todo url={url} bucketId={bucketId} destinations={destinations} />
          </div>

          <div className="venue-list">
            <div className="venue-list__add">
              <p className="venue-list__add-button" onClick={handleAddVenue}>
                Add Memories
              </p>
            </div>
            <Modal
              sx={{ backdropFilter: "blur(10px)" }}
              open={addVenue || editVenue}
              onClose={closeAddVenue}
              className="venue-list__modal"
            >
              <NewVenueCard
                url={url}
                bucketId={bucketId}
                isEdit={editVenue}
                handleCloseModal={closeAddVenue}
                getVenueData={getVenueData}
                venueData={venueData}
              />
            </Modal>

            <ul>
              {venue.map((v) => (
                <li key={v.id} className="venue-list__container">
                  <div className="venue-list__block">
                    <div className="venue-list__flex">
                      <h3 className="venue-list__title">{v.visitedplaces}</h3>
                      <div className="venue-list__action">
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => handleEditVenue(v)}
                          sx={{ fontSize: "1rem" }}
                        >
                          <EditIcon
                            sx={{
                              fontSize: "18px",
                            }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleDeleteVenue(v.id)}
                          sx={{ fontSize: "1rem" }}
                        >
                          <DeleteIcon
                            sx={{
                              fontSize: "18px",
                            }}
                          />
                        </IconButton>
                      </div>
                    </div>
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
            {!venue.length && (
              <div className="venue-list__heading">
                <p className="venue-list__text">
                  By clicking "add memories" button fill your{" "}
                  <span className="venue-list__text--mod">
                    {destinations.destination}
                  </span>{" "}
                  card with experiences and memories to cherish forever.
                </p>
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
