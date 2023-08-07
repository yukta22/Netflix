import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobile,
  faTablet,
  faDesktop,
  faTv,
} from "@fortawesome/fontawesome-free-solid";
import { useEffect } from "react";

const Second_plan_page = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const registerUser = localStorage.getItem("registerUser");
  useEffect(() => {
    if (!registerUser) {
      navigate("/");
      return;
    }
    axios.get("/plan").then((response) => {
      setData(response.data);
    });
  }, []);
  const navigateThirdPage = () => {
    navigate("/signUp/plan3");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleClick = (ele) => {
    console.log(registerUser);
    setSelected(ele._id);
    // alert("You have Selected " + ele.name + " Plan");
    const dt = new Date();

    let subdata = {
      startDate: Date.now(),
      endDate: dt.setMonth(dt.getMonth() + 1),
      userId: registerUser,
      planId: ele._id,
    };
    registerPlan(subdata);
  };

  const registerPlan = async (subdata) => {
    console.log(subdata);
    const res = await axios.post("/subscriptions", subdata);
    console.log(res);
  };

  return (
    <>
      <div className="d-flex justify-content-between  ">
        <div className="text-danger">
          <h1 className="ms-3 ">Netflix</h1>
        </div>
        <button
          type="button"
          className="btn btn-danger text-white m-3 me-5  "
          onClick={navigateHome}
        >
          Sign Out
        </button>
      </div>
      <div className="text-white ms-5 ps-3">
        <p>STEP 2 OF 3</p>
        <h3>Choose the plan that's right for you</h3>
        <div className="pt-3">
          <p>Watch all you want. Ad-free</p>
          <p>Recommendations just for you.</p>
          <p>Change or cancel your plan anytime.</p>
        </div>
      </div>
      <div>
        {data?.map((ele, key) => {
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

      <div className="text-white container w-75 ">
        <div className="mx-auto pt-3">
          <p>
            HD(720p), Full HD(1080p), ultra HD(4k) and HDR Availability subject
            to your internet service and device capabilities. Not all content is
            available in all resolutions. See our Terms of Use for more deatails
          </p>
          <p>
            Only peple who live with you may use your account. Watcg on 4
            different devices st the same time with Premium, 2 with Standard,
            and 1 with Basic and Mobile.
          </p>
        </div>
        <div className="mx-auto" style={{ paddingLeft: "510px" }}>
          <button
            type="button"
            className="fw-bold  btn btn-danger w-25 mx-5 text-white fs-5 mb-5"
            onClick={navigateThirdPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Second_plan_page;
