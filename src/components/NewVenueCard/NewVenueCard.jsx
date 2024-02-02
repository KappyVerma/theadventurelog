import "./NewVenueCard.scss";
import axios from "axios";
import HeaderForHome from "../HeaderForHome/HeaderForHome";
import { useState } from "react";

export default function NewVenueCard({ url }) {
  const [fileInput, setFileInput] = useState(null);

  const handleFileInputChange = (event) => {
    setFileInput(event.target.files[0]); // Use files[0] to get the selected file);
  };

  const createVenueCard = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    const bucketId = localStorage.getItem("bucketId"); // chanfing this to state variable

    console.log("Creating", event.target.files);

    const formData = new FormData();
    formData.append("visitedplaces", event.target.visitedplaces.value);
    formData.append("content", event.target.content.value);
    formData.append("ratings", event.target.ratings.value);
    formData.append("imageFile", fileInput);
    formData.append("user_id", userId);
    formData.append("bucketlist_id", bucketId);

    const response = await axios.post(`${url}/venue`, formData, {
      headers: {
        contentType: "multipart/form-data",
      },
    });
    console.log(response);
  };
  return (
    <>
      <HeaderForHome />
      <section className="newVenue">
        <h2 className="newVenue__title">Create a new venue card</h2>
        <form
          onSubmit={createVenueCard}
          className="newVenue__form"
          id="venueForm"
        >
          <label className="newVenue__label">
            Venue Name
            <input
              type="text"
              className="newVenue__input"
              name="visitedplaces"
            />
          </label>
          <label className="newVenue__label">
            Share your experience
            <textarea
              type="text"
              className="newVenue__input newVenue__input--height"
              name="content"
            />
          </label>
          <label className="newVenue__label">
            Ratings
            <input type="number" className="newVenue__input " name="ratings" />
          </label>
          <label className="newVenue__label">
            Add a image of the venue
            <input
              type="file"
              className="newVenue__input"
              name="imageFile"
              onChange={handleFileInputChange}
            />
          </label>
        </form>
        <button className="newVenue__button" form="venueForm">
          Post
        </button>
      </section>
    </>
  );
}
