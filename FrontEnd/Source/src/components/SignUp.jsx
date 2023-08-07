import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [arr, setArr] = useState([]);
  const [flag, setFlag] = useState(false);
  const [formerr, setFormerr] = useState();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
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
    } else if (data?.userPassword.length < 8) {
      err.userPassword = "Password must be at least 8 characters!";
      valflag = true;
    } else if (!data?.userPassword.match(lowerCase)) {
      err.userPassword = "Password should contains lowercase letters!";
      valflag = true;
    } else if (!data?.userPassword.match(upperCase)) {
      err.userPassword = "Password should contain uppercase letters!";
      valflag = true;
    } else if (!data?.userPassword.match(specialChar)) {
      err.userPassword = "Password should contain specialChar letters!";
      valflag = true;
    }

    setFormerr(err);

    return valflag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      setArr([...arr, data]);
      const res = await registerUser();
      console.log(res.data._i);
      if (res.status == 201) {
        setFlag(false);
        // localStorage.setItem("registerUser", res.data.userName);
        navigate("/signUp/plan");
      } else {
        setFlag(true);
      }
    }
    // console.log(flag);
  };

  const registerUser = async () => {
    const res = await axios.post("/register/user", data);
    localStorage.setItem("registerUser", res.data._id);
    return res;
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
          className="bg-dark w-50 mx-auto position-absolute p-5"
          style={{ top: "70px", left: "400px" }}
        >
          <p className="px-5">STEP 1 OF 3</p>
          <div className="px-5 fw-bolder fs-3">Sign Up</div>
          {flag && (
            <div className="text-danger">
              <p className="px-5 pt-4">User is already exists</p>
            </div>
          )}
          <form className="px-5 py-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="User Name"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                name="userName"
                onChange={handleChange}
              />
              <div className="text-danger">{formerr?.userName}</div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Email or phone number"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                name="userEmail"
                onChange={handleChange}
              />
              <div className="text-danger">{formerr?.userEmail}</div>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                id="formGroupExampleInput2"
                placeholder="password"
                name="userPassword"
                onChange={handleChange}
              />
              <div className="text-danger">{formerr?.userPassword}</div>
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

export default SignUp;
