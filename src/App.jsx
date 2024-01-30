import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import BucketList from "./pages/BucketList/BucketList";
import Destinations from "./pages/Destinations/Destinations";

const url = process.env.REACT_APP_API_URL;

function App() {
  console.log(url);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bucket-list" element={<BucketList />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
