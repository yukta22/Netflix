import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLock } from "@fortawesome/fontawesome-free-solid";
import useRazorpay from "react-razorpay";

import axios from "axios";

const Third_plan_page = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { state } = useLocation();
  console.log(state.charges.substring(1));
  const createOrder = async () => {
    try {
      const response = await axios.post("/payment", {
        amount: state.charges.substring(1),
      });
      setData(response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const [Razorpay, isLoaded] = useRazorpay();

  const handlePayment = async () => {
    const order = await createOrder();

    const options = {
      key: "rzp_test_sv7bU1pVgfFyDa",
      amount: state.charges.substring(1) * 100,
      currency: "INR",
      name: "Netflix Payment",
      description: "Pay to watch movies and shows",
      // image: "https://example.com/your_logo",
      order_id: order?.id,
      handler: (res) => {
        // razoryPayorder(res);
        console.log(res);
        navigate("/signin");
      },
      prefill: {
        name: "Yukta Saraiya",
        email: "yuktasaraiya@gmail.com",
        contact: "9327807905",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  // useEffect(() => {
  //   if (isLoaded) {
  //     handlePayment();
  //   }
  // }, [isLoaded]);

  useEffect(() => {
    const registerUser = localStorage.getItem("registerUser");
    if (!registerUser) {
      navigate("/");
      return;
    }
  }, []);

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
            onClick={() => navigateHome()}
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
            className="fw-bold  btn btn-primary w-25 mx-5 text-white fs-5 "
            onClick={() => handlePayment()}
          >
            Make Payment
          </button>
          {/* <button
            type="button"
            className="fw-bold  btn btn-danger w-25 mx-5 text-white fs-5 "
            onClick={() => navigateSignin()}
          >
            Next
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Third_plan_page;
