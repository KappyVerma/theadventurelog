import "./NewVenueCard.scss";
import axios from "axios";
import { useState } from "react";
import { IconButton, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewVenueCard({
  url,
  bucketId,
  handleCloseModal,
  getVenueData,
  venueData,
  isEdit,
}) {
  const [fileInput, setFileInput] = useState(null);
  const [ratingValue, setRatingValue] = useState(
    isEdit ? venueData?.ratings : 0
  );

  const handleFileInputChange = (event) => {
    setFileInput(event.target.files[0]); // Use files[0] to get the selected file);
  };

  const createVenueCard = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("when", event.target.date.value);
    formData.append("visitedplaces", event.target.visitedplaces.value);
    formData.append("content", event.target.content.value);
    formData.append("ratings", ratingValue);
    formData.append("imageFile", fileInput);
    formData.append("user_id", userId);
    formData.append("bucketlist_id", bucketId);

    if (!isEdit) {
      if (
        !event.target.date.value ||
        !event.target.visitedplaces.value ||
        !event.target.content.value
      ) {
        event.target.date.style.border = "1px solid #d22d2d";
        event.target.visitedplaces.style.border = "1px solid #d22d2d";
        event.target.content.style.border = "1px solid #d22d2d";

        return;
      }
    }

    const editData = {
      when: event.target.date.value,
      visitedplaces: event.target.visitedplaces.value,
      content: event.target.content.value,
      ratings: ratingValue,
    };
    try {
      isEdit
        ? await axios.patch(`${url}/venue/${venueData.id}`, editData, {
            headers: {
              contentType: "application/json",
            },
          })
        : await axios.post(`${url}/venue`, formData, {
            headers: {
              contentType: "multipart/form-data",
            },
          });
      handleCloseModal();
      getVenueData();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <section className="newVenue">
        <div className="newVenue__flex">
          <h2 className="newVenue__title">Add a new memory</h2>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ padding: "0" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <form
          onSubmit={createVenueCard}
          className="newVenue__form"
          id="venueForm"
        >
          <h6 style={{ marginBottom: ".675em" }}>*all fields are required</h6>
          <label className="newVenue__label">
            When
            <input
              type="date"
              className="newVenue__input"
              name="date"
              defaultValue={isEdit ? venueData.when : null}
            />
          </label>
          <label className="newVenue__label">
            Memory Title
            <input
              autoComplete="off"
              type="text"
              className="newVenue__input"
              name="visitedplaces"
              defaultValue={isEdit ? venueData.visitedplaces : ""}
            />
          </label>
          <label className="newVenue__label">
            Share your experience
            <textarea
              type="text"
              className="newVenue__input newVenue__input--height"
              name="content"
              defaultValue={isEdit ? venueData.content : ""}
            />
          </label>
          <label className="newVenue__label newVenue__label--mod">
            {"Rating "}
            <Rating
              sx={{ paddingLeft: "5px" }}
              name="simple-controlled"
              value={ratingValue}
              onChange={(_event, newValue) => {
                setRatingValue(newValue);
              }}
            />
          </label>
          {!isEdit && (
            <label className="newVenue__label">
              Add a image of the venue
              <input
                type="file"
                className="newVenue__input"
                name="imageFile"
                onChange={handleFileInputChange}
              />
            </label>
          )}
          <h6 style={{ marginBottom: ".675em" }}>
            Only JPG, PNG and GIF files are allowed{" "}
          </h6>
        </form>
        <button className="newVenue__button" form="venueForm">
          Submit
        </button>
      </section>
    </>
  );
}
