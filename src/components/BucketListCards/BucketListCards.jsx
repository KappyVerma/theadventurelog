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
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

          dots: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
      status: bucketData.status,
    });
  }, [bucketData]);

  const handleInputChange = (event) => {
    event.target.style.border = "1px solid #034694";
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
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
    try {
      const newData = {
        destination: form.destination,
        accompany: form.person,
        duedate: form.date,
        status: false,
      };

      try {
        await axios.patch(
          `http://localhost:8080/bucketlist/${bucketData.id}`,
          newData
        );
        getBucketListData();
        closeEditBucket();
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

  const sortedBucketList = bucketListData.sort((a, b) => {
    const dueDateA = new Date(a.duedate);
    const dueDateB = new Date(b.duedate);

    return dueDateA - dueDateB;
  });

  const toDueDate = (duedate) => {
    let Result = Math.round(
      (new Date(duedate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return Result.toFixed(0);
  };

  return (
    <>
      <section className="card">
        <h2 className="card__title">Destinations</h2>

        <Modal
          sx={{ backdropFilter: "blur(10px)" }}
          open={editBucket}
          onClose={closeEditBucket}
          className="venue-list__modal"
        >
          <div className="bucket-list__container">
            <h1 className="bucket-list__title">
              Create a new bucket list item
            </h1>
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
                  placeholder="eg. morocco"
                  name="destination"
                  value={form.destination}
                  onChange={handleInputChange}
                  defaultValue={bucketData.destination}
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
                  defaultValue={bucketListData.duedate}
                />
              </label>
              <label className="bucket-list__label bucket-list__label--mod">
                Already visited
                <input
                  type="checkbox"
                  className="bucket-list__checkbox"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  defaultValue={bucketData.status}
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
                  defaultValue={bucketData.accompany}
                />
              </label>
            </form>
            <button className="bucket-list__button" form="editBucketList">
              Save
            </button>
          </div>
        </Modal>
        <Slider {...settings} className="card__slider">
          {sortedBucketList?.map((data) => (
            <>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => handleEditBucket(data)}
                sx={{ fontSize: "1rem" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleDeleteBucket(data.id)}
                sx={{ fontSize: "1rem" }}
              >
                <DeleteIcon />
              </IconButton>
              <Link
                to={`/bucketlist/venue`}
                onClick={() => setBucketId(data.id)}
                key={data.id}
                className="card__link"
              >
                <div
                  className="card__container"
                  style={
                    data.status === 1 || toDueDate(data.duedate) < 0
                      ? { filter: "grayscale(1)" }
                      : {}
                  }
                >
                  <p className="card__duedate">
                    {data.status === 0 && toDueDate(data.duedate) >= 0
                      ? `${toDueDate(data.duedate)} days to go`
                      : "Visited"}
                  </p>
                  <div className="card__details">
                    <p className="card__destination">{data.destination}</p>
                    <p className="card__">
                      {data.accompany === "solo" ? "  " : "with"}{" "}
                      {data.accompany}
                    </p>
                    <p className="card__due"> {data.duedate}</p>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </Slider>
      </section>
    </>
  );
}
