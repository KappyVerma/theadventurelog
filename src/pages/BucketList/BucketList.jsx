import "./BucketList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import BucketListCards from "../../components/BucketListCards/BucketListCards";
import HeaderForHome from "../../components/HeaderForHome/HeaderForHome";

export default function BucketList({ userId, url, setUserId }) {
  const [form, setForm] = useState({
    destination: "",
    person: "",
    date: "",
  });

  const [bucketListData, setBucketListData] = useState([]);

  const getBucketListData = async () => {
    try {
      const userIdTest = localStorage.getItem("userId");
      const response = await axios.get(`${url}/user/${userIdTest}/bucketlist`);
      setBucketListData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
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
      !e.target.date.value
    ) {
      e.target.destination.style.border = "1px solid #d22d2d";
      e.target.person.style.border = "1px solid #d22d2d";
      e.target.date.style.border = "1px solid #d22d2d";
      e.target.imageFile.style.border = "1px solid #d22d2d";
      return;
    }
    try {
      const newData = {
        destination: form.destination,
        accompany: form.person,
        duedate: form.date,
        user_id: userId,
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
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <HeaderForHome />
      <section className="bucket-list">
        <div className="bucket-list__container">
          <h1 className="bucket-list__title">Create a new bucket list</h1>
          <form
            onSubmit={handleBucketList}
            className="bucket-list__form"
            id="bucketListForm"
          >
            <label className="bucket-list__label">
              Where is the destination spot
              <input
                autoComplete="off"
                type="text"
                className="bucket-list__input"
                placeholder="eg. morocco"
                name="destination"
                value={form.destination}
                onChange={handleInputChange}
              />
            </label>
            <label className="bucket-list__label">
              When do you want to travel
              <input
                autoComplete="off"
                type="date"
                className="bucket-list__input"
                name="date"
                value={form.date}
                onChange={handleInputChange}
              />
            </label>
            <label className="bucket-list__label">
              Who is your travel partner
              <input
                autoComplete="off"
                type="text"
                className="bucket-list__input"
                placeholder="eg. friends, family or travelling solo"
                name="person"
                value={form.person}
                onChange={handleInputChange}
              />
            </label>
          </form>
          <button className="bucket-list__button" form="bucketListForm">
            Save
          </button>
        </div>
        {/* Bucket List Cards Component */}
        <BucketListCards bucketListData={bucketListData} />
      </section>
    </>
  );
}
