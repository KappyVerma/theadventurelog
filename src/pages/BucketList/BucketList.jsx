import "./BucketList.scss";

import CreateBucketList from "../../components/CreateBucketList/CreateBucketList";

export default function BucketList() {
  return (
    <>
      <section className="goal">
        <h1 className="goal__title">Create new bucket list</h1>
        <form action="" className="goal__form" id="bucketListForm">
          <label className="goal__label">
            where do you want to travel
            <input type="text" className="goal__input" />
          </label>
          <label className="goal__label">
            When do you want to travel
            <input type="text" className="goal__input" />
          </label>
          <label className="goal__label">
            With who would you be traveling
            <input type="text" className="goal__input" />
          </label>
          <label className="goal__label">
            upload card photo
            <input type="text" className="goal__input" />
          </label>
        </form>
        <button className="goal__button" form="bucketListForm">
          Save
        </button>
      </section>
      <section>
        <CreateBucketList />
      </section>
    </>
  );
}
