import "./BucketList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import BucketListCards from "../../components/BucketListCards/BucketListCards";
import HeaderForHome from "../../components/HeaderForHome/HeaderForHome";
import { getCurrentDate } from "../../utils";

export default function BucketList({ userId, url, setUserId, setBucketId }) {
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
    if (event.target.type === "checkbox") {
      setForm({
        ...form,
        [event.target.name]: event.target.checked,
      });
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleBucketList = async (e) => {
    e.preventDefault();
    if (
      !e.target.destination.value ||
      !e.target.person.value ||
      (!e.target.date.value && !e.target.status.checked)
    ) {
      e.target.destination.style.border = "1px solid #d22d2d";
      e.target.person.style.border = "1px solid #d22d2d";
      e.target.date.style.border = "1px solid #d22d2d";

      return;
    }
    try {
      const newData = {
        destination: form.destination,
        accompany: form.person,
        duedate: form.date,
        user_id: userId,
        status: form.status,
      };

      try {
        await axios.post(`${url}/bucketlist`, newData);
        getBucketListData();
        e.target.destination.style.border = "";
        e.target.person.style.border = "";
        e.target.date.style.border = "";
      } catch (e) {
        console.error(e);
      }

      setForm({
        destination: "",
        person: "",
        date: "",
        status: false,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  let user = localStorage.getItem("username");
  user = user[0].toUpperCase() + user.slice(1).toLocaleLowerCase();

  return (
    <>
      <HeaderForHome />
      <section className="bucket-list">
        <div className="bucket-list__container">
          <h4 style={{ marginBottom: "1em" }}>Welcome: {user}</h4>
          <h1 className="bucket-list__title">Create a destination card</h1>
          <form
            onSubmit={handleBucketList}
            className="bucket-list__form"
            id="bucketListForm"
          >
            <label className="bucket-list__label">
              Destination Name
              <input
                autoComplete="off"
                type="text"
                className="bucket-list__input"
                placeholder="eg. Morocco"
                name="destination"
                value={form.destination}
                onChange={handleInputChange}
              />
            </label>
            <label className="bucket-list__label">
              Date of Travel
              <input
                autoComplete="off"
                type="date"
                min={getCurrentDate()}
                className="bucket-list__input "
                placeholder="yyyy-MM-dd"
                name="date"
                value={form.date}
                onChange={handleInputChange}
                disabled={form.status === true}
              />
            </label>
            <label className="bucket-list__label bucket-list__label--mod">
              Already visited
              <input
                type="checkbox"
                className="bucket-list__checkbox"
                name="status"
                checked={form.status}
                onChange={handleInputChange}
              />
            </label>
            <label className="bucket-list__label">
              Travel Companion(s)
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
        <BucketListCards
          bucketListData={bucketListData}
          setBucketId={setBucketId}
          getBucketListData={getBucketListData}
          url={url}
        />
      </section>
    </>
  );
}
