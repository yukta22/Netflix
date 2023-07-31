import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLoginCredentials } from "../redux/loginSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest();
  };

  const postRequest = async () => {
    const login = await axios.post("http://localhost:9000/login/user", data);
    if (login.data.findData === undefined) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("token", login.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(login.data.findData.userEmail)
      );
      dispatch(addLoginCredentials(login.data.findData));
      if (login.data.findData.role == "admin") {
        navigate("/adminPage");
      } else {
        navigate("/home");
      }
    }
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="text-danger">
          <h1 className="ms-3 ">Netflix</h1>
        </div>
      </div>
      <div className="ms-5  text-white  bg-image ms-2  front_page_background_image position-relative">
        <div
          className="bg-dark w-50 mx-auto position-absolute p-5"
          style={{ top: "70px", left: "500px" }}
        >
          <div className="px-5 fw-bolder fs-3">Sign In</div>
          {flag && (
            <div
              className="text-white mx-5 mt-3"
              style={{ backgroundColor: "#FF7F50" }}
            >
              <p className="px-5 py-3 ">
                Sorry, we can't find an account with this email address. Please
                try again{" "}
                <a
                  className="text-decoration-none text-white text-decoration-underline"
                  href="#"
                  onClick={navigateHome}
                >
                  Create a new account
                </a>
              </p>
            </div>
          )}
          <form className="px-5 py-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Email or phone number"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                id="formGroupExampleInput"
                name="userEmail"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                id="formGroupExampleInput2"
                placeholder="password"
                name="userPassword"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="fw-bold  btn btn-danger  px-5 text-white fs-5 w-100"
            >
              Sign In
            </button>
          </form>
          {/* <div className="px-5">
            <p className="text-muted">
              <a className="fs-6" href="#" onClick={navigateForgetPassword}>
                Forget Password?
              </a>
            </p>
          </div> */}
          <div className="d-flex justify-content-between px-5">
            <div className="form-check">
              <input
                className="form-check-input bg-secondary text-dark border-0"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Remember me
              </label>
            </div>
            <div>
              <p>Need help?</p>
            </div>
          </div>
          <div className="px-5">
            <p className="text-muted">
              New to Netflix?{" "}
              <a
                className="text-decoration-none text-white"
                href="#"
                onClick={navigateHome}
              >
                Sign up now.
              </a>
            </p>
            <p className="style-none">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <a href="#">Learn more.</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
