import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faPencilAlt,
} from "@fortawesome/fontawesome-free-solid";
import axios from "axios";

const Changeplan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [post, setPost] = useState();
  const [selected, setSelected] = useState(state.plan._id);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    axios.get("/plan").then((response) => {
      setPost(response.data);
    });
  }, []);

  const handleClick = (ele) => {
    console.log(ele);
    setSelected(ele._id);
    const dt = new Date();
    console.log(user.id);
    let data = {
      id: state._id,
      startDate: Date.now(),
      endDate: dt.setMonth(dt.getMonth() + 1),
      userId: user.id,
      planId: ele._id,
    };
    console.log(data);
    registerPlan(data);
  };
  const registerPlan = async (data) => {
    const res = await axios.put("/subscriptions", data);
    console.log(res);
  };

  const handleSubmitbtn = () => {
    alert("Your plan has Changed");
    navigate("/home");
  };

  return (
    <>
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
      <div>
        <div className="text-center text-light fs-1">Change Streaming Plan</div>
        <div>
          {post?.map((ele, key) => {
            return (
              <div key={ele._id}>
                <div className="container" onClick={() => handleClick(ele)}>
                  <div
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid violet"
                          : "none",
                    }}
                    className="card mx-auto m-4 w-50 mt-3 hover-shadow"
                  >
                    <div className="card-header cardName">{ele.name}</div>
                    <div className="card-body d-flex justify-content-between">
                      <div>Monthly Price:</div>
                      <div>{ele.charges}</div>
                    </div>
                    <div className="card-body d-flex justify-content-between">
                      <div>Quality:</div>
                      <div>{ele.quality}</div>
                    </div>
                    <div className="card-body d-flex justify-content-between">
                      <div>Resolution:</div>
                      <div>{ele.resolution}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center mb-5">
          <button
            type="button "
            className="btn btn-primary"
            onClick={handleSubmitbtn}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Changeplan;
