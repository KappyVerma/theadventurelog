import "./CreateBucketList.scss";
import { Link } from "react-router-dom";

export default function CreateBucketList({ bucketListData }) {
  return (
    <section className="card">
      <h2 className="card__title">Bucket List</h2>
      <ul className="card__block">
        {bucketListData?.map((data) => (
          <Link to={`/bucketlist/${data.id}`}>
            <li key={data.id} className="card__container">
              <div className="card__details">
                <p className="card__destination">{`${data.destination} with ${data.accompany}`}</p>
                <p className="card__due">{data.duedate}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
