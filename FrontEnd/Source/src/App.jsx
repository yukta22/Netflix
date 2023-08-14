import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import All_Front_page from "./frontpageComponents/All_Front_page";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import First_plan_page from "./planComponents/First_plan_page";
import Second_plan_page from "./planComponents/Second_plan_page";
import Third_plan_page from "./planComponents/Third_plan_page";
// import Main from "./components/Main";
import Shows from "./ShowsComponents/Shows";
import Home from "./ShowsComponents/Home";
import Account from "./userComponents/Account";
import ManageProfile from "./userComponents/ManageProfile";
import EditImage from "./userComponents/EditImage";
import Help from "./userComponents/Help";
import Video from "./components/Video";
import Search from "./components/Search";
import TvShow from "./TVshowsComponents/TvShow";
import Dashboard from "./adminComponents/Dashboard";
import AddMovie from "./adminComponents/AddMovie";
import AddShows from "./adminComponents/AddShows";
import Catalog from "./adminComponents/Catalog";
import Users from "./adminComponents/Users";
import axios from "axios";
import Newpopular from "./TVshowsComponents/Newpopular";
import Updateuser from "./adminComponents/Updateuser";
import WatchHistory from "./components/WatchHistory";
import Changeplan from "./userComponents/Changeplan";
// import PrivateRoute from "./components/AuthGuard/PrivateRoute";
import Otp from "./planComponents/Otp";
import Series from "./adminComponents/Series";
import PrivateRoute from "./AuthGuard/PrivateRoute";

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
        {/* <Route path="/" element={<All_Front_page />} /> */}

        <Route path="/home" element={<PrivateRoute component={Home} />} />
        <Route
          path="/movie"
          element={<PrivateRoute component={Shows} />}
        ></Route>
        <Route
          path="/home/account"
          element={<PrivateRoute component={Account} />}
        ></Route>
        <Route
          path="/home/profile-manage"
          element={<PrivateRoute component={ManageProfile} />}
        ></Route>
        <Route
          path="/home/profile-manage/editImage"
          element={<PrivateRoute component={EditImage} />}
        ></Route>
        <Route
          path="/home/helpPage"
          element={<PrivateRoute component={Help} />}
        ></Route>
        <Route
          path="/home/movie"
          element={<PrivateRoute component={Video} />}
        ></Route>
        <Route
          path="/home/search"
          element={<PrivateRoute component={Video} />}
        ></Route>
        <Route
          path="/tvShows"
          element={<PrivateRoute component={TvShow} />}
        ></Route>
        <Route
          path="/new"
          element={<PrivateRoute component={Newpopular} />}
        ></Route>
        <Route
          path="/watchHistory"
          element={<PrivateRoute component={WatchHistory} />}
        ></Route>
        <Route
          path="/changePlan"
          element={<PrivateRoute component={Changeplan} />}
        ></Route>
        <Route
          path="/admin/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        ></Route>
        <Route
          path="/admin/addMovie"
          element={<PrivateRoute component={AddMovie} />}
        ></Route>
        <Route
          path="/admin/addShows"
          element={<PrivateRoute component={AddShows} />}
        ></Route>
        <Route
          path="/admin/catalog"
          element={<PrivateRoute component={Catalog} />}
        ></Route>
        <Route
          path="/admin/users"
          element={<PrivateRoute component={Users} />}
        ></Route>
        <Route
          path="/admin/series"
          element={<PrivateRoute component={Series} />}
        ></Route>
        <Route
          path="/admin/updateUser"
          element={<PrivateRoute component={Updateuser} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
