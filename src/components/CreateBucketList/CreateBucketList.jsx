import "./CreateBucketList.scss";

export default function CreateBucketList({ bucketListData }) {
  return (
    <section className="card">
      <h2 className="card__title">Bucket List</h2>
      <ul className="card__block">
        {bucketListData.map((data) => (
          <li key={data.id} className="card__container">
            <div className="card__details">
              <p className="card__destination">{`${data.destination} with ${data.withWho}`}</p>
              <p className="card__due">{data.dueDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
