import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import BucketList from "./pages/BucketList/BucketList";
import Places from "./pages/Places/Places";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="bucketlist" element={<BucketList />} />
        <Route path="places" element={<Places />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
