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

    // Function to verify token on the backend
    const verifyTokenOnBackend = async () => {
      try {
        const response = await axios.get("/verify-token", {
          headers: {
            token: token,
          },
        });

        // Token is valid, proceed with fetching movie data
      } catch (error) {
        // Token is invalid, navigate to login or handle the error
        navigate("/");
        console.log("Token verification failed:", error);
      }
    };

    verifyTokenOnBackend();
  }, []);
  return <Component />;
};

export default PrivateRoute;
