import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faPencilAlt,
  faInfoCircle,
} from "@fortawesome/fontawesome-free-solid";
import Showsitem from "../ShowsComponents/Showsitem";

const Search = () => {
  const [post, setPost] = useState();
  const [data, setData] = useState();
  const [shows, setShows] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/movie", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setPost(response.data);
      });

    axios
      .get("/shows", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setShows(response.data);
      });
  }, [data]);
  // console.log(shows);
  const searchChange = (e) => {
    const filterData = post?.filter(
      (ele) =>
        ele.title.toLowerCase().includes(e.target.value) ||
        ele.genre.toLowerCase().includes(e.target.value)
    );
    const filterShowData = shows?.filter(
      (ele) =>
        ele.title.toLowerCase().includes(e.target.value) ||
        ele.genre.toLowerCase().includes(e.target.value)
    );
    // console.log(filterShowData);
    setData([...filterData, ...filterShowData]);
  };
  return (
    <>
      <div className="text-white ">
        <nav className="navbar navbar-expand-lg navbar-dark ">
          <a className="navbar-brand text-danger fs-4 ps-2" href="#">
            NETFLIX
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-white " : "nav-link "
                  }
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-white " : "nav-link "
                  }
                  to="/tvShows"
                >
                  Tv Shows
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-white " : "nav-link "
                  }
                  to="/movie"
                >
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-white " : "nav-link "
                  }
                  to="/new"
                >
                  New & Popular
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-white " : "nav-link "
                  }
                  to="/watchHistory"
                >
                  Watch History
                </NavLink>
              </li>
            </ul>
            <div className="d-flex ">
              <div className="mx-3 mt-1 pt-1">
                <div className="search-container">
                  <form>
                    <input
                      className="search expandright"
                      id="searchright"
                      type="search"
                      name="search"
                      placeholder="Search"
                      onChange={searchChange}
                    />
                    <label
                      className="button searchbutton"
                      htmlFor="searchright"
                    >
                      <span className="mglass">&#9906;</span>
                    </label>
                  </form>
                </div>
              </div>

              <div className="mx-3 my-1">
                <Link className="text-white" to="#">
                  <FontAwesomeIcon icon={faUser} />
                  <div className="btn-group  me-2">
                    <button
                      type="button"
                      className="btn text-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul className="dropdown-menu ">
                      <li className="">
                        <Link
                          to="/home/profile-manage"
                          className="d-flex dropdown-item text-decoration-none text-dark ps-2"
                        >
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            className="p-1 ps-3"
                          />
                          <p className="mb-0 ps-1">Manage Profile</p>
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/home/account"
                          className="d-flex dropdown-item text-decoration-none text-dark ps-2"
                        >
                          <FontAwesomeIcon icon={faUser} className="p-1 ps-3" />
                          <p className="mb-0 ps-2">Account</p>
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/home/helpPage"
                          className="d-flex dropdown-item text-decoration-none text-dark ps-2"
                        >
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="p-1 ps-3"
                          />
                          <p className="mb-0 ps-1">Help Center</p>
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider bg-white" />
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="dropdown-item text-decoration-none text-dark"
                          onClick={() => {
                            localStorage.clear();
                          }}
                        >
                          Sign out of Netflix
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Showsitem data={data}></Showsitem>
    </>
  );
};

export default Search;