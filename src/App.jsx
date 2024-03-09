import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing/Landing";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import BucketList from "./pages/BucketList/BucketList";
import VenueCards from "./components/VenueCards/VenueCards";

function App() {
  const [userId, setUserId] = useState();
  const [bucketId, setBucketId] = useState();
  const [signupSuccess, setSignupSuccess] = useState(false);

  const url = process.env.REACT_APP_API_URL;

  const closeSignupSuccess = () => {
    setSignupSuccess(false);
  };

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };

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
          path="home"
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
          path="home/venue"
          element={<VenueCards url={url} bucketId={bucketId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
