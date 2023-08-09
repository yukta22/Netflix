import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [arr, setArr] = useState([]);
  const [flag, setFlag] = useState(false);
  const [formerr, setFormerr] = useState();
  const [enteredOTP, setEnteredOTP] = useState("");

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
    } else if (!isNaN(data?.userName)) {
      err.userName = "User Name should not only Number";
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
    if (!phoneNumber) {
      err.phoneNumber = "Phone Number is required";
      valflag = true;
    } else if (isNaN(phoneNumber)) {
      err.phoneNumber = "Phone Number Must be 10 digits";
    } else if (phoneNumber.length !== 10) {
      err.phoneNumber = "Phone Number Must be 10 digits";
      valflag = true;
    }

    setFormerr(err);

    return valflag;
  };

  const handleVerifyOTP = async (otp) => {
    const response = await axios.post("/verifyOtp", {
      phoneNumber: phoneNumber, // You should replace this with the user's phone number
      enteredOTP: otp,
    });
    console.log(response.data);

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phoneNumber);

    if (!validation()) {
      setArr([...arr, data]);

      const response = await axios.post("/sendOtp", { phoneNumber });
      let otp = prompt("Please enter OTP");
      setEnteredOTP(otp);
      // if (res.status == 201) {
      //   setFlag(false);
      //   if ((await handleVerifyOTP(otp)) == "OTP verified successfully") {
      //     navigate("/signUp/plan");
      //   } else if ((await handleVerifyOTP(otp)) == "Incorrect OTP") {
      //     alert("Incorrect OTp");
      //   }
      // } else {
      //   setFlag(true);
      // }
      if ((await handleVerifyOTP(otp)) == "OTP verified successfully") {
        const res = await registerUser();
        console.log(res);
        if (res.status == 201) {
          setFlag(false);
          navigate("/signUp/plan");
        } else if (res.data == "User already exists") {
          setFlag(true);
        }
      } else if ((await handleVerifyOTP(otp)) == "Incorrect OTP") {
        alert("Incorrect OTP");
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
          className="bg-dark  mx-auto position-absolute p-5 userBox"
          // style={{ top: "70px", left: "400px" }}
        >
          <p className="px-2 ps-4">STEP 1 OF 3</p>
          <div className="px-2 ps-4 fw-bolder fs-3">Sign Up</div>
          {flag && (
            <div className="text-danger">
              <p className="px-2 pt-4">User is already exists</p>
            </div>
          )}
          <form className="px-2 py-4 form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="User Name"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3 "
                name="userName"
                onChange={handleChange}
              />
              <div className="text-danger">{formerr?.userName}</div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Email"
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
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-secondary signUpform text-white border-0 py-2 ps-3"
                placeholder="Contact Number"
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="text-danger">{formerr?.phoneNumber}</div>
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
