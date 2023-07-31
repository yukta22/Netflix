import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const First_plan_page = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const navigateSecondPage = () => {
    navigate("/signUp/plan2");
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
      <div className="ms-5  text-white  bg-image ms-2   position-relative">
        <div
          className="bg-dark w-50 mx-auto position-absolute p-5"
          style={{ top: "70px", left: "500px" }}
        >
          <div className="px-5 mx-auto">
            <p className="px-5">STEP 2 OF 3</p>
            <h2 className="px-5 ">Choose your plan</h2>
            <div className="pt-3">
              <p className="px-5">No commitments, cancel anytime.</p>
              <p className="px-5">Everything on Netflix for one low price.</p>
              <p className="px-5">No ads and no extra fees. Ever.</p>
            </div>
            <button
              type="button"
              className="fw-bold  btn btn-danger  px-5 text-white fs-5 w-100"
              onClick={navigateSecondPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default First_plan_page;
