import "./BucketListCards.scss";
import { Link } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CreateBucketList({
  bucketListData,
  setBucketId,
  getBucketListData,
  url,
}) {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const [editBucket, setEditBucket] = useState(false);
  const [bucketData, setBucketData] = useState({});

  const [form, setForm] = useState({
    destination: "",
    person: "",
    date: "",
    status: false,
  });

  useEffect(() => {
    setForm({
      destination: bucketData.destination,
      person: bucketData.accompany,
      date: bucketData.duedate,
      status: bucketData.status === 1,
    });
  }, [bucketData]);

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

  const handleEditBucket = (bucketData) => {
    setEditBucket(true);
    setBucketData(bucketData);
  };
  const closeEditBucket = () => {
    setEditBucket(false);
  };

  const handleDeleteBucket = async (bucketId) => {
    try {
      await axios.delete(`${url}/bucketlist/${bucketId}`);
      getBucketListData();
    } catch (err) {
      console.error(err);
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
        status: form.status,
      };

      try {
        await axios.patch(`${url}/bucketlist/${bucketData.id}`, newData);
        getBucketListData();
        closeEditBucket();
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

  const toDueDate = (duedate) => {
    let Result = Math.round(
      (new Date(duedate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return Result.toFixed(0);
  };

  const sortedBucketList = bucketListData?.slice().sort((a, b) => {
    return a.status - b.status;
  });

  return (
    <>
      <section className="card">
        <h2 className={sortedBucketList.length ? "card__title" : "card__none"}>
          Destinations
        </h2>

        <Modal
          sx={{ backdropFilter: "blur(10px)" }}
          open={editBucket}
          onClose={closeEditBucket}
          className="card__modal"
        >
          <div className="card__modal--mod">
            <h1 className="bucket-list__title">Edit bucket list item</h1>
            <form
              onSubmit={handleBucketList}
              className="bucket-list__form"
              id="editBucketList"
            >
              <label className="bucket-list__label">
                Where is the destination spot
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
                When do you want to travel
                <input
                  autoComplete="off"
                  type="date"
                  className="bucket-list__input"
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
            <button className="bucket-list__button" form="editBucketList">
              Save
            </button>
          </div>
        </Modal>
        {!bucketListData.length ? (
          <div className="card__gif-heading">
            {" "}
            "Not all those who wander are lost." - J.R.R.
            <div className="card__gif"></div>
          </div>
        ) : (
          <Slider {...settings} className="card__slider">
            {sortedBucketList?.map((data) => (
              <li key={data.id}>
                <div
                  className="card__container"
                  style={
                    data.status === 1 || toDueDate(data.duedate) < 0
                      ? { opacity: ".6" }
                      : {}
                  }
                >
                  <div className="card__buttons">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => handleEditBucket(data)}
                      sx={{ fontSize: ".5em" }}
                    >
                      <EditIcon
                        sx={{
                          fontSize: "18px",
                          ":hover": { color: "white" },
                          transition: "color 0.3s linear",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDeleteBucket(data.id)}
                      sx={{ fontSize: "1rem" }}
                    >
                      <DeleteIcon
                        sx={{
                          fontSize: "18px",
                          ":hover": { color: "white" },
                          transition: "color 0.3s linear",
                        }}
                      />
                    </IconButton>
                  </div>
                  <Link
                    to={`/home/venue`}
                    onClick={() => setBucketId(data.id)}
                    className="card__link"
                  >
                    <div className="card__details">
                      <p className="card__destination">{data.destination}</p>
                      <p className="card__">
                        {data.accompany.toLowerCase() === "solo"
                          ? "  "
                          : "with"}{" "}
                        {data.accompany}
                      </p>
                      <p className="card__due"> {data.duedate}</p>
                    </div>
                    <p className="card__duedate">
                      {data.status === 0 && toDueDate(data.duedate) >= 0
                        ? `${toDueDate(data.duedate)} days to go`
                        : "Visited"}
                    </p>
                  </Link>
                </div>
              </li>
            ))}
          </Slider>
        )}
      </section>
    </>
  );
}
