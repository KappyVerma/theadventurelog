import "./BucketList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateBucketList from "../../components/CreateBucketList/CreateBucketList";
import HeaderHome from "../../components/HeaderHome/HeaderHome";

export default function BucketList({ userId }) {
  const [form, setForm] = useState({
    destination: "",
    person: "",
    date: "",
    image: "",
  });

  const [bucketListData, setBucketListData] = useState([]);

  const getBucketListData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/${userId}/bucketlist`
      );
      setBucketListData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getBucketListData();
  }, []);

  const handleInputChange = (event) => {
    event.target.style.border = "1px solid #034694";
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleBucketList = async (e) => {
    e.preventDefault();
    if (
      !e.target.destination.value ||
      !e.target.person.value ||
      !e.target.date.value ||
      !e.target.image.value
    ) {
      e.target.destination.style.border = "1px solid #d22d2d";
      e.target.person.style.border = "1px solid #d22d2d";
      e.target.date.style.border = "1px solid #d22d2d";
      e.target.image.style.border = "1px solid #d22d2d";
      return;
    }
    try {
      const newData = {
        destination: form.destination,
        accompany: form.person,
        duedate: form.date,
        image_url: form.image,
        user_id: 1,
        status: false,
      };

      try {
        await axios.post("http://localhost:8080/bucketlist", newData);
        getBucketListData();
      } catch (e) {
        console.error(e);
      }

      setForm({
        destination: "",
        person: "",
        date: "",
        image: "",
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <HeaderHome />
      <section className="bucket-List">
        <div className="goal">
          <h1 className="goal__title">Create new bucket list</h1>
          <form
            onSubmit={handleBucketList}
            className="goal__form"
            id="bucketListForm"
          >
            <label className="goal__label">
              where do you want to travel
              <input
                autoComplete="off"
                type="text"
                className="goal__input"
                name="destination"
                value={form.destination}
                onChange={handleInputChange}
              />
            </label>
            <label className="goal__label">
              When do you want to travel
              <input
                autoComplete="off"
                type="date"
                className="goal__input"
                name="date"
                value={form.date}
                onChange={handleInputChange}
              />
            </label>
            <label className="goal__label">
              With who would you be traveling
              <input
                autoComplete="off"
                type="text"
                className="goal__input"
                name="person"
                value={form.person}
                onChange={handleInputChange}
              />
            </label>
            <label className="goal__label">
              upload card photo
              <input
                autoComplete="off"
                type="file"
                className="goal__input"
                name="image"
                value={form.image}
                onChange={handleInputChange}
              />
            </label>
          </form>
          <button className="goal__button" form="bucketListForm">
            Save
          </button>
        </div>

        <CreateBucketList bucketListData={bucketListData} />
      </section>
    </>
  );
}
