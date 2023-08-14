import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const First_plan_page = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  useEffect(() => {
    const registerUser = localStorage.getItem("registerUser");
    if (!registerUser) {
      navigate("/");
      return;
    }
  }, []);
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
      <div className="text-white  bg-image ms-2   position-relative">
        <div className="bg-dark  mx-auto position-absolute p-5 userBox">
          <div className="px-2 mx-auto">
            <p className="px-2">STEP 2 OF 3</p>
            <h2 className="px-2 ">Choose your plan</h2>
            <div className="pt-3">
              <p className="px-2">No commitments, cancel anytime.</p>
              <p className="px-2">Everything on Netflix for one low price.</p>
              <p className="px-2">No ads and no extra fees. Ever.</p>
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
