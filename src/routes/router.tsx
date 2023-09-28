import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import Home from "../pages/home";
import DetailPage from '../pages/detail-books';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail-page/:id" element={<DetailPage />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
