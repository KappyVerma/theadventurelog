import "./BucketList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import BucketListCards from "../../components/BucketListCards/BucketListCards";
import HeaderForHome from "../../components/HeaderForHome/HeaderForHome";

export default function BucketList({ userId, url }) {
  const [form, setForm] = useState({
    destination: "",
    person: "",
    date: "",
    image: null,
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
    // setUserId(localStorage.getItem("userId"));
    // console.log(localStorage.getItem("userId"));
    // console.log(userId);
    getBucketListData();
  }, []);

  const handleInputChange = (event) => {
    event.target.style.border = "1px solid #034694";
    if (event.target.name === "image") {
      setForm({
        ...form,
        [event.target.name]: event.target.files[0], // Use files[0] to get the selected file
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
      !e.target.date.value
    ) {
      e.target.destination.style.border = "1px solid #d22d2d";
      e.target.person.style.border = "1px solid #d22d2d";
      e.target.date.style.border = "1px solid #d22d2d";
      e.target.imageFile.style.border = "1px solid #d22d2d";
      return;
    }
    try {
      // const newData = {
      //   destination: form.destination,
      //   accompany: form.person,
      //   duedate: form.date,
      //   image: form.image,
      //   user_id: userId,
      //   status: false,
      // };
      console.log(form.destination);
      const formData = new FormData();
      formData.append("destination", form.destination);
      formData.append("accompany", form.person);
      formData.append("duedate", form.date);
      formData.append("image", form.image);
      formData.append("user_id", userId);
      formData.append("status", false);

      console.log("formdata");
      for (const value of formData.values()) {
        console.log(value);
      }

      try {
        await axios.post("http://localhost:8080/bucketlist", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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
      <HeaderForHome />
      <section className="bucket-List">
        <div className="goal">
          <h1 className="goal__title">Create new bucket list</h1>
          <form
            onSubmit={handleBucketList}
            className="goal__form"
            id="bucketListForm"
            enctype="multipart/form-data"
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
                // value={form.image}
                onChange={handleInputChange}
              />
            </label>
          </form>
          <button className="goal__button" form="bucketListForm">
            Save
          </button>
        </div>
        {/* Bucket List Cards Component */}
        <BucketListCards bucketListData={bucketListData} />
      </section>
    </>
  );
}
