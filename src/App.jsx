import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import BucketList from "./pages/BucketList/BucketList";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Venue from "./pages/Venue/Venue";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState();

  const updateUserId = (userId) => {
    setUserId(userId);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signin" element={<SignIn updateUserId={updateUserId} />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="homepage" element={<HomePage />} />
        <Route
          path="bucketlist"
          element={<BucketList userId={userId} setUserId={setUserId} />}
        />
        <Route path="bucketlist/:id" element={<Venue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
