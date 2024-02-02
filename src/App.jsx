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

  const updateUserId = (userId) => {
    setUserId(userId);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signin" element={<LogIn updateUserId={updateUserId} />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<Home />} />
        <Route
          path="bucketlist"
          element={<BucketList userId={userId} setUserId={setUserId} />}
        />
        <Route path="venue" element={<NewVenueCard />} />
        <Route path="bucketlist/:id" element={<VenueCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
