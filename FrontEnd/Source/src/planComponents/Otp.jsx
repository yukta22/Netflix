import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const { state } = useLocation();
  const [otpdata, setOtpdata] = useState();
  const [flag, setFlag] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleVerifyOTP = async (otp) => {
    const response = await axios.post("/verifyOtp", {
      phoneNumber: state,
      enteredOTP: otp,
    });
    console.log(response.data);

    return response;
  };

  const handleClick = async () => {
    const response = await axios.post("/sendOtp", { phoneNumber: state });
    console.log(response);
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
      setText("Incorrect OTP");
      //   alert("Incorrect OTP");
    } else if (res.data == "OTP has expired") {
      setFlag(true);
      setText("OTP has expired");
    }
  };
  const navigateTolandingPage = () => {
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-between  ">
        <div
          className="text-danger"
          onClick={navigateTolandingPage}
          style={{ cursor: "pointer" }}
        >
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
              <p className="ps-3 ms-2 pt-4">{text}</p>
            </div>
          )}
          <form className="px-2 py-4 form" onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                placeholder="Otp Number"
                name="otpnumber"
                onChange={(e) => setOtpdata(e.target.value)}
              />
            </div>
            <div
              className="pb-3 d-flex justify-content-end"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick()}
            >
              Resend Otp
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
