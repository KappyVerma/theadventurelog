import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import BucketList from "./pages/BucketList/BucketList";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import VenueCards from "./components/VenueCards/VenueCards";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState();
  const [bucketId, setBucketId] = useState();
  const [signupSuccess, setSignupSuccess] = useState(false);

  const closeSignupSuccess = () => {
    setSignupSuccess(false);
  };

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };

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

        <Route
          path="login"
          element={
            <LogIn
              url={url}
              updateUserId={updateUserId}
              signupSuccess={signupSuccess}
              closeSignupSuccess={closeSignupSuccess}
            />
          }
        />
        <Route
          path="signup"
          element={
            <SignUp handleSignupSuccess={handleSignupSuccess} url={url} />
          }
        />
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
        <Route
          path="bucketlist/venue"
          element={<VenueCards url={url} bucketId={bucketId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
