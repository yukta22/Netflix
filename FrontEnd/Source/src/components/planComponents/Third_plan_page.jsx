import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLock } from "@fortawesome/fontawesome-free-solid";

const Third_plan_page = () => {
  const navigate = useNavigate();

  const navigateSignin = () => {
    navigate("/signin");
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="text-white">
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
        <div className=" d-flex flex-col justify-content-center">
          <FontAwesomeIcon icon={faLock} style={{ height: "25px" }} />
        </div>
        <div className="pt-4 text-center">
          <p>STEP 3 OF 3</p>
          <h3>Choose how to pay</h3>
          <p>
            Your payment is encrypted and you can change your payment method at
            anytime
          </p>
          <p>Secure for peace of mind.</p>
          <p>Cancel easily online.</p>
          <button
            type="button"
            className="fw-bold  btn btn-danger w-25 mx-5 text-white fs-5 "
            onClick={navigateSignin}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Third_plan_page;
