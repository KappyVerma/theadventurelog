import "./BucketListCards.scss";
import { Link } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CreateBucketList({ bucketListData, setBucketId }) {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
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
        <h2 className="card__title">Bucket List</h2>
        <Slider {...settings} className="card__slider">
          {sortedBucketList?.map((data) => (
            <Link
              to={`/bucketlist/venue`}
              onClick={() => setBucketId(data.id)}
              key={data.id}
              className="card__link"
            >
              <div className="card__container">
                {data.status === 0
                  ? `${toDueDate(data.duedate)} days to go`
                  : "Visited"}
                <div className="card__details">
                  <p className="card__destination">{`${data.destination} ${
                    data.accompany === "solo" ? " - " : "with"
                  } ${data.accompany}`}</p>
                  <p className="card__due">{data.duedate}</p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </section>
    </>
  );
}
