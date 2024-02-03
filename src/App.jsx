import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import BucketList from "./pages/BucketList/BucketList";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import NewVenueCard from "./components/NewVenueCard/NewVenueCard";
import VenueCards from "./components/VenueCards/VenueCards";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState();
  const [bucketId, setBucketId] = useState();

  const url = process.env.REACT_APP_API_URL;

  const updateUserId = (userId) => {
    setUserId(userId);
  };

  const updateBucketId = (bucketId) => {
    setBucketId(bucketId);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<LogIn updateUserId={updateUserId} />} />
        <Route path="signup" element={<SignUp />} />
        {/* ignore home route */}
        <Route path="home" element={<Home />} />
        <Route
          path="bucketlist"
          element={
            <BucketList
              userId={userId}
              setUserId={setUserId}
              url={url}
              setBucketId={updateBucketId}
            />
          }
        />
        {/* <Route
          path="bucketlist/:id/venue"
          element={<NewVenueCard url={url} />}
        /> */}
        <Route
          path="bucketlist/venue"
          element={<VenueCards url={url} bucketId={bucketId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
