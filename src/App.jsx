import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import BucketList from "./pages/BucketList/BucketList";
import Places from "./pages/Places/Places";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bucketListData, setBucketListData] = useState([]);

  useEffect(() => {
    const getBucketListData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bucketlist");
        setBucketListData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getBucketListData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="homepage" element={<HomePage />} />
        <Route
          path="bucketlist"
          element={<BucketList bucketListData={bucketListData} />}
        />
        <Route path="places" element={<Places />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
