import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import BucketList from "./pages/BucketList/BucketList";
import Places from "./pages/Places/Places";
import SignIn from "./components/SignIn/SignIn";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bucketListData, setBucketListData] = useState([]);

  const getBucketListData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bucketlist");
      setBucketListData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getBucketListData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="homepage" element={<HomePage />} />
        <Route
          path="bucketlist"
          element={
            <BucketList
              bucketListData={bucketListData}
              getBucketListData={getBucketListData}
            />
          }
        />
        <Route path="places" element={<Places />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
