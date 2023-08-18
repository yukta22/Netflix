import React, { useEffect } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const verifyTokenOnBackend = async () => {
      try {
        const response = await axios.get("/verify-token", {
          headers: {
            token: token,
          },
        });
      } catch (error) {
        navigate("/");
        console.log("Token verification failed:", error);
      }
    };

    verifyTokenOnBackend();
  }, []);
  return <Component />;
};

export default PrivateRoute;
