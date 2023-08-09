import React from "react";
import { Link } from "react-router-dom";

const Front_page_navbar = () => {
  return (
    <>
      <div className="d-flex justify-content-between  ">
        <div className="text-danger">
          <h1 className="ps-5 mt-3">Netflix</h1>
        </div>
        <div className="d-flex me-3 ">
          <div className="dropdown m-3">
            <button
              className="btn bg-transparent text-white border border-white dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              English
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Hindi
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="btn btn-danger text-white m-3 me-5  "
          >
            <Link to="/SignIn" className="text-decoration-none text-white">
              Sign In
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Front_page_navbar;
