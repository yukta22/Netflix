import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faPencilAlt,
  faInfoCircle,
} from "@fortawesome/fontawesome-free-solid";

const AdminNavbar = () => {
  return (
    <div className="text-white ">
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <Link className="navbar-brand text-danger fs-4 ps-2" to="/home">
          NETFLIX
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
              <Link
                className="nav-link"
                aria-current="page"
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/addMovie">
                Add Movie
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/addShows">
                Add Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/catalog">
                Catalog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/series">
                Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                Users
              </Link>
            </li>
          </ul>
          <div className="d-flex ">
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
  );
};

export default AdminNavbar;
