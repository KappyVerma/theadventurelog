import "./NewVenueCard.scss";
import axios from "axios";
import HeaderForHome from "../HeaderForHome/HeaderForHome";

export default function NewVenueCard({ url }) {
  const createVenueCard = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    const bucketId = localStorage.getItem("bucketId");

    const response = await axios.post(`${url}/venue`, {
      visitedplaces: event.target.venue.value,
      content: event.target.content.value,
      image_url: event.target.image.value,
      ratings: event.target.ratings.value,
      user_id: userId,
      bucketlist_id: bucketId,
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
            <input type="text" className="newVenue__input" name="venue" />
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
            <input type="text" className="newVenue__input" name="image" />
          </label>
        </form>
        <button className="newVenue__button" form="venueForm">
          Post
        </button>
      </section>
    </>
  );
}
