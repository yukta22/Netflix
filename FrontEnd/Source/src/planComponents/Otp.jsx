import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const { state } = useLocation();
  const [otpdata, setOtpdata] = useState();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOTP = async (otp) => {
    const response = await axios.post("/verifyOtp", {
      phoneNumber: state,
      enteredOTP: otp,
    });
    console.log(response.data);

    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otpdata);
    const res = await handleVerifyOTP(otpdata);
    if (res.data == "OTP verified successfully") {
      setFlag(false);
      navigate("/signUp/plan");
    } else if (res.data == "Incorrect OTP") {
      setFlag(true);
      //   alert("Incorrect OTP");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between  ">
        <div className="text-danger">
          <h1 className="ms-3 ">Netflix</h1>
        </div>
      </div>
      <div className="  text-white  bg-image  position-relative">
        <div
          className="bg-dark  mx-auto position-absolute p-5 userBox"
          // style={{ top: "70px", left: "400px" }}
        >
          <p className="px-2 ps-4">STEP 1 OF 3</p>
          <div className="px-2 ps-4 fw-bolder fs-3">Please Enter OTP:</div>
          {flag && (
            <div className="text-danger">
              <p className="px-2 pt-4">Incorrect OTP</p>
            </div>
          )}
          <form className="px-2 py-4 form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                placeholder="Otp Number"
                name="otpnumber"
                onChange={(e) => setOtpdata(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="fw-bold  btn btn-danger  px-5 text-white fs-5 w-100"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;
