import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
const SignIn = () => {
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
  const [formerr, setFormerr] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validation = () => {
    let lowerCase = /[a-z]/g;
    let upperCase = /[A-Z]/g;
    let specialChar = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/g;
    const err = {};
    let valflag = false;

    if (!data?.userName) {
      err.userName = "User name is required";
      valflag = true;
    }
    if (!data?.userEmail) {
      err.userEmail = "User email is required";
      valflag = true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data?.userEmail)
    ) {
      err.userEmail = "Invalid email address";
      valflag = true;
    }

    if (!data?.userPassword) {
      err.userPassword = "User password is required";
      valflag = true;
    } else if (data?.userPassword.length < 7) {
      err.userPassword = "Password must be at least 8 characters!";
      valflag = true;
    } else if (!data?.userPassword.match(lowerCase)) {
      err.userPassword = "Password should contains lowercase letters!";
      valflag = true;
    }
    // else if (!data?.userPassword.match(upperCase)) {
    //   err.userPassword = "Password should contain uppercase letters!";
    //   valflag = true;
    // }
    else if (!data?.userPassword.match(specialChar)) {
      err.userPassword = "Password should contain specialChar letters!";
      valflag = true;
    }

    setFormerr(err);

    return valflag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      await postRequest();
    }
  };

  const postRequest = async () => {
    const login = await axios.post("/login/user", data);
    console.log(login);
    if (login.data.findData === undefined) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("token", login.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: login.data.findData._id,
          email: login.data.findData.userEmail,
        })
      );

      if (login.data.findData.role == "admin") {
        navigate("/admin/dashboard");
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
      <div className="text-white  bg-image ms-2  front_page_background_image position-relative">
        <div className="bg-dark mx-auto position-absolute p-5 me-2 userBox">
          <div className="px-2 fw-bolder fs-3">Sign In</div>
          {flag && (
            <div
              className="text-white mx-5 mt-3"
              style={{ backgroundColor: "#FF7F50" }}
            >
              <p className="px-2   py-3 ">
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
          <form className="px-3 py-4 form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter Email"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                id="formGroupExampleInput"
                name="userEmail"
                onBlur={() => validation()}
                onChange={handleChange}
              />
              <div className="text-danger">{formerr?.userEmail}</div>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                id="formGroupExampleInput2"
                placeholder="Enter Password"
                name="userPassword"
                onChange={handleChange}
              />
              <div className="text-danger">{formerr?.userPassword}</div>
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
          {/* <div className="d-flex justify-content-between px-5 ">
            <div className="form-check d-sm-none d-md-block">
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
            <div className="d-sm-none d-md-block">
              <p>Need help?</p>
            </div>
          </div> */}
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
              bot. Learn more.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
