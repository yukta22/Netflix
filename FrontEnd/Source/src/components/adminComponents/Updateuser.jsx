import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";

const Updateuser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState();
  const [plan, setPlan] = useState();
  const [selected, setSelected] = useState(state.plan._id);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios.get("/plan").then((response) => {
      setPlan(response.data);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const res = await axios.put(`/user/${state?.user._id}`, data, {
      headers: {
        token: token,
      },
    });
    const dt = new Date();
    let updatedata = {
      id: state._id,
      startDate: Date.now(),
      endDate: dt.setMonth(dt.getMonth() + 1),
      userId: state?.user._id,
      planId: selected,
    };
    const resSub = await axios.put(`/subscriptions/`, updatedata, {
      headers: {
        token: token,
      },
    });
    console.log(resSub);

    if (res.data) {
      navigate("/admin/users");
    }
  };

  const handleClick = (ele) => {
    console.log(ele);
    setSelected(ele._id);
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
            placeholder={state?.user?.userName || ""}
            name="userName"
            // value={state?.user?.userName || ""}
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
            placeholder={state?.user?.userEmail || ""}
            name="userEmail"
            // value={data?.user.userName || ""}
            onChange={handleChange}
          />
          <label className="form-label text-light pt-4">Change Plan</label>
          <div>
            {plan?.map((ele, key) => {
              return (
                <div key={ele._id}>
                  <div className="container" onClick={() => handleClick(ele)}>
                    <div
                      style={{
                        border:
                          `${ele._id}` == `${selected}`
                            ? "3px solid violet"
                            : "none",
                      }}
                      className="card mx-auto m-3 w-100 mt-3 hover-shadow"
                    >
                      <div className="card-header cardName">{ele.name}</div>
                      <div className="card-body d-flex justify-content-between">
                        <div>Monthly Price:</div>
                        <div>{ele.charges}</div>
                      </div>
                      <div className="card-body d-flex justify-content-between">
                        <div>Quality:</div>
                        <div>{ele.quality}</div>
                      </div>
                      <div className="card-body d-flex justify-content-between">
                        <div>Resolution:</div>
                        <div>{ele.resolution}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginLeft: "360px" }}>
            <button className="btn btn-primary m-5 px-5" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updateuser;
