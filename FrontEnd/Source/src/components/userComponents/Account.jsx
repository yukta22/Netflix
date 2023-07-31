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

const Account = () => {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
  // const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:9000/subscriptions").then((response) => {
      setPost(response.data);
    });
  }, []);
  let user = localStorage.getItem("user");
  user = user.substring(1, user.length - 1);
  // console.log(user);
  const userSubscriptionData = post?.find((e) => e.user?.userEmail == user);
  console.log(userSubscriptionData?.user);

  return (
    <div>
      <div className="d-flex justify-content-between  ">
        <div className="text-danger">
          <h1 className="ms-3 ">Netflix</h1>
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
          </Link>
        </div>
      </div>

      <div className="text-white pt-4">
        <h1 className="ps-5">Account</h1>
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      <div className="row text-white px-5 ">
        <div className="col">
          <div className="fs-3 justify-content-start">MEMBERSHIP & BILLING</div>
          <button className="btn btn-secondary mt-4 px-4 py-2">
            Cancel Membership
          </button>
        </div>
        <div className="col">
          <div>
            <div className="fw-bold fs-5">
              {userSubscriptionData?.user.userEmail}
            </div>
            <div className="fs-5">
              User Name:{" "}
              <span className="ps-2">
                {" "}
                {userSubscriptionData?.user.userName}
              </span>
            </div>
            <div className="fs-5">
              Password: <span className="ps-2"> ********</span>
            </div>
          </div>
        </div>
        <div className="col justify-content-end">
          <div className="ps-5">
            <div className="fs-5">
              <Link className="dropdown-item text-primary fs-5" to="#">
                Change Email
              </Link>
            </div>
            <div className="fs-5">
              <Link className="dropdown-item text-primary fs-5" to="#">
                Change UserName
              </Link>
            </div>
            <div className="fs-5">
              <Link className="dropdown-item text-primary fs-5" to="#">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      <div className="row text-white px-5">
        <div className="col">
          <div className="fs-3 justify-content-start">PLAN DETAILS</div>
        </div>
        <div className="col fs-5">
          <div>{userSubscriptionData?.plan.name}</div>
        </div>
        <div className="col ">
          <div className="fs-5 ps-5">
            <Link className="dropdown-item text-primary fs-5" to="#">
              Change Plan
            </Link>
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
        <div className="col ">
          <div className="fs-5 ps-5">
            <Link className="dropdown-item text-primary fs-5" to="#">
              Manage access and devices
            </Link>
          </div>
          <div className="fs-5 ps-5">
            <Link className="dropdown-item text-primary fs-5" to="#">
              Sign out of all devices
            </Link>
          </div>
        </div>
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      <div className="row text-white px-5">
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
                  <div className="fw-bold fs-6">
                    {userSubscriptionData?.user.userName}
                  </div>
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
      </div>
      <div className="horizonal_line" style={{ margin: "1.5rem 3rem" }} />
      <div className="row text-white px-5">
        <div className="col-4">
          <div className="fs-3 justify-content-start">SETTINGS</div>
        </div>
        <div className="col-8 ">
          <div>
            <Link className="dropdown-item text-primary fs-5" to="#">
              Turn off profile transfer
            </Link>
          </div>
          <div>
            <Link className="dropdown-item text-primary fs-5" to="#">
              Test participation
            </Link>
          </div>
          <div>
            <Link className="dropdown-item text-primary fs-5" to="#">
              Manage download devvices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
