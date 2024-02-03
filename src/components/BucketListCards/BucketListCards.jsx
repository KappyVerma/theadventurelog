import "./BucketListCards.scss";
import { Link } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CreateBucketList({ bucketListData }) {
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

  return (
    <>
      <section className="card">
        <h2 className="card__title">Bucket List</h2>
        <Slider {...settings}>
          {sortedBucketList?.map((data) => (
            <Link
              to={`/bucketlist/${data.id}`}
              key={data.id}
              className="card__link"
            >
              <div className="card__container">
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
