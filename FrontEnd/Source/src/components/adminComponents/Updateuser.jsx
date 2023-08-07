import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";

const Updateuser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(data);
    const res = await axios.put(`/user/${state?.user._id}`, data, {
      headers: {
        token: token,
      },
    });
    console.log(res);
    if (res.data) {
      navigate("/users");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="fs-3 text-white text-center ps-3">Update User</div>
      <div className="w-50 mx-auto">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="formGroupExampleInput"
            className="form-label text-light pt-2"
          >
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Username"
            name="userName"
            // value={data?.user.userName || ""}
            onChange={handleChange}
          />
          <label
            htmlFor="formGroupExampleInput"
            className="form-label text-light pt-2"
          >
            User Email
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="UserEmail"
            name="userEmail"
            // value={data?.user.userEmail || ""}
            onChange={handleChange}
          />

          <button className="btn btn-primary m-5 mx-auto" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Updateuser;
