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
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchdata !== "") {
        fetchData();
      } else {
        setData([]);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchdata]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`/searchMovie/${searchdata}`, {
        headers: {
          token: token,
        },
      });

      const responseShow = await axios.get(`/searchShow/${searchdata}`, {
        headers: {
          token: token,
        },
      });

      setData([...response.data, ...responseShow.data]);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(data);
  return (
    <>
      <div className="text-white ">
        <nav className="navbar navbar-expand-lg navbar-dark ">
          <Link className="navbar-brand text-danger ps-2 ms-3" to="/home">
            <h3>NetFlix</h3>
          </Link>
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
                      // onChange={searchChange}
                      onChange={(e) => setSearchdata(e.target.value)}
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
                <div className="text-white" to="#">
                  <FontAwesomeIcon icon={faUser} />
                  <div className="btn-group  me-2">
                    <button
                      type="button"
                      className="btn text-white dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul className="dropdown-menu ">
                      {/* <li className="">
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
                      </li> */}
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
                </div>
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
