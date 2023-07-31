import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [arr, setArr] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setArr([...arr, data]);
    const res = await registerUser();
    // console.log(res);
    localStorage.getItem("registerUser", res.data);
    if (res.status == 201) {
      setFlag(false);
      navigate("/signUp/plan");
    } else {
      setFlag(true);
    }
    // console.log(flag);
  };

  const registerUser = async () => {
    const res = await axios.post("http://localhost:9000/register/user", data);
    localStorage.setItem("registerUser", JSON.stringify(res.data));
    return res;
  };

  return (
    <>
      <div className="d-flex justify-content-between  ">
        <div className="text-danger">
          <h1 className="ms-3 ">Netflix</h1>
        </div>
      </div>
      <div className="ms-5  text-white  bg-image ms-2   position-relative">
        <div
          className="bg-dark w-50 mx-auto position-absolute p-5"
          style={{ top: "70px", left: "500px" }}
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
                id="formGroupExampleInput"
                name="userName"
                onChange={handleChange}
                required
              />
            </div>
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
              Next
              {/* <Link to="/plan">Next</Link> */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
