import React from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const validateToken = async () => {
    try {
      const response = await axios.get("/validate-token");
      return response.data.valid;
    } catch (error) {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        validateToken() ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default PrivateRoute;
