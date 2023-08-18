import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faPencilAlt,
} from "@fortawesome/fontawesome-free-solid";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
const Account = () => {
  const [post, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/");
      return;
    }
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.id);
    axios
      .get(`/subscriptions/${user.id}`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setPost(response.data);
      });
  }, []);

  const handleClick = () => {
    navigate("/changePlan", { state: post });
  };
  // console.log(post);

  // user = user.substring(1, user.length - 1);
  // console.log(user);
  // const userSubscriptionData = post?.find((e) => e.user?.userEmail == user);
  // console.log(userSubscriptionData?.user);
  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="d-flex justify-content-between  ">
        <div className="text-danger">
          <h1
            className="ms-3 "
            onClick={navigateToHome}
            style={{ cursor: "pointer" }}
          >
            Netflix
          </h1>
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
                <li className="">
                  <Link
                    to="/home/profile-manage"
                    className="d-flex dropdown-item text-decoration-none text-dark ps-2"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} className="p-1 ps-3" />
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
                <li>
                  <hr className="dropdown-divider bg-white" />
                </li>
                <li>
                  <Link
                    to="/"
                    className="dropdown-item text-decoration-none text-dark"
                  >
                    Sign out of Netflix
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-white pt-4">
        <h1 className="ps-5">Account</h1>
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      <div className="row text-white px-5 ">
        <div className="col">
          <div className="fs-3 justify-content-start">MEMBERSHIP</div>
        </div>
        <div className="col">
          <div>
            <div className="fw-bold fs-5">{post?.user.userEmail}</div>
            <div className="fs-5">
              User Name: <span className="ps-2"> {post?.user.userName}</span>
            </div>
            <div className="fs-5">
              Password: <span className="ps-2"> ********</span>
            </div>
          </div>
        </div>
        <div className="col justify-content-end">
          <div className="ps-5"></div>
        </div>
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      <div className="row text-white px-5">
        <div className="col">
          <div className="fs-3 justify-content-start">PLAN DETAILS</div>
        </div>
        <div className="col fs-5">
          <div>{post?.plan.name}</div>
        </div>
        <div className="col ">
          <div className="fs-5 ps-5">
            <p
              className="dropdown-item text-primary fs-5"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              Change Plan
            </p>
          </div>
        </div>
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      <div className="row text-white px-5">
        <div className="col">
          <div className="fs-3 justify-content-start">SECURITY & PRIVACY</div>
        </div>
        <div className="col fs-5">
          <div>
            Control access to this account, view the most recetly active devices
            and more.
          </div>
        </div>
        <div className="col "></div>
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      {/* <div className="row text-white px-5">
        <div className="col-4">
          <div className="fs-3 justify-content-start">
            PROFILE & PARENTAL CONTROLS
          </div>
        </div>
        <div className="col-8 ">
          <div className="dropdown ">
            <button
              className="btn btn-secondary dropdown-toggle d-flex justify-content-between w-75 bg-white text-dark"
              type="button"
              data-bs-display="static"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex">
                <FontAwesomeIcon icon={faUser} />
                <div className="ms-3">
                  <div className="fw-bold fs-6">{post?.user.userName}</div>
                </div>
              </div>
            </button>
            <ul
              className="dropdown-menu profile_control"
              style={{ width: "966px" }}
            >
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Language</div>
                    <div className="fs-7">English</div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Change
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Viewing Restriction</div>
                    <div className="fs-7">No Restriction</div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Change
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Profile Lock</div>
                    <div className="fs-7">Off</div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Change
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Transfer This Profile</div>
                    <div className="fs-7"></div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Transfer
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Viewing activity</div>
                    <div className="fs-7"></div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      View
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Rating</div>
                    <div className="fs-7"></div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      View
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Subtitle apperence</div>
                    <div className="fs-7"></div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Change
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Playback settings</div>
                    <div className="fs-7">
                      Autoplay next episode. Autoplay preview. Basic video and
                      audio quality
                    </div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Change
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">Communication settings</div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Change
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="ms-5 ">
                    <div className="fs-6 fw-bold">
                      Privacy and data settings
                    </div>
                  </div>
                  <div>
                    <Link className="dropdown-item text-primary" to="#">
                      Change
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider ms-5" />
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="form-check ms-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Default checkbox
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default Account;
