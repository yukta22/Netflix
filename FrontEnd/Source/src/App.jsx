import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import All_Front_page from "./components/frontpageComponents/All_Front_page";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import First_plan_page from "./components/planComponents/First_plan_page";
import Second_plan_page from "./components/planComponents/Second_plan_page";
import Third_plan_page from "./components/planComponents/Third_plan_page";
// import Main from "./components/Main";
import Shows from "./components/ShowsComponents/Shows";
import Home from "./components/ShowsComponents/Home";
import Account from "./components/userComponents/Account";
import ManageProfile from "./components/userComponents/ManageProfile";
import EditImage from "./components/userComponents/EditImage";
import Help from "./components/userComponents/Help";
import Video from "./components/Video";
import Search from "./components/searchComponents/Search";
import TvShow from "./components/TVshowsComponents/TvShow";
import Dashboard from "./components/adminComponents/Dashboard";
import AddMovie from "./components/adminComponents/AddMovie";
import AddShows from "./components/adminComponents/AddShows";
import Catalog from "./components/adminComponents/Catalog";
import Users from "./components/adminComponents/Users";
import axios from "axios";
import Newpopular from "./components/TVshowsComponents/Newpopular";
import Updateuser from "./components/adminComponents/Updateuser";
import WatchHistory from "./components/WatchHistory";
import Changeplan from "./components/userComponents/Changeplan";
import PrivateRoute from "./components/AuthGuard/PrivateRoute";
import Otp from "./components/planComponents/Otp";

axios.defaults.baseURL = "http://192.168.101.161:9000";

function App() {
  const [data, setData] = useState({});

  return (
    <>
      <Routes>
        <Route path="/" element={<All_Front_page />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>

        <Route path="/signUp/plan" element={<First_plan_page />}></Route>
        <Route path="/signUp/planOtp" element={<Otp />}></Route>
        <Route path="/signUp/plan2" element={<Second_plan_page />}></Route>
        <Route path="/signUp/plan3" element={<Third_plan_page />}></Route>
        {/* <PrivateRoute path="/home" component={Shows} /> */}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/movie" element={<Shows />}></Route>
        <Route path="/home/account" element={<Account />}></Route>
        <Route path="/home/profile-manage" element={<ManageProfile />}></Route>
        <Route
          path="/home/profile-manage/editImage"
          element={<EditImage />}
        ></Route>
        <Route path="/home/helpPage" element={<Help />}></Route>
        <Route path="/home/movie" element={<Video />}></Route>
        <Route path="/home/search" element={<Search />}></Route>
        <Route path="/tvShows" element={<TvShow />}></Route>
        <Route path="/new" element={<Newpopular />}></Route>
        <Route path="/watchHistory" element={<WatchHistory />}></Route>
        <Route path="/changePlan" element={<Changeplan />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/addMovie" element={<AddMovie />}></Route>
        <Route path="/admin/addShows" element={<AddShows />}></Route>
        <Route path="/admin/catalog" element={<Catalog />}></Route>
        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/admin/updateUser" element={<Updateuser />}></Route>
      </Routes>
    </>
  );
}

export default App;
