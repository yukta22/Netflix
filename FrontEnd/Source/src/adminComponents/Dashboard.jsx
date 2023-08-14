import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import Tabledata from "./Tabledata";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userdata, setUserdata] = useState();
  const [moviedata, setMoviedata] = useState();
  const [showdata, setShowdata] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("/getUsers", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setUserdata(response.data);
      });
    axios
      .get("/movie", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setMoviedata(response.data);
      });
    axios
      .get("/shows", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setShowdata(response.data);
      });
  }, []);

  const navigateCatalog = () => {
    navigate("/admin/catalog");
  };
  const navigateShows = () => {
    navigate("/admin/series");
  };

  const navigateUser = () => {
    navigate("/admin/users");
  };

  return (
    <>
      <AdminNavbar />
      <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-around text-light mx-3">
        <div className="dashboard_box py-2 px-5 ps-3 m-2 rounded">
          <div className="m-2">
            <div className="fs-5">Total User</div>
            <div className="d-flex justify-content-between mt-2">
              <div className="fs-4">{userdata?.length}</div>
              <div className="ms-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  width="40px"
                  height="30px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_box py-2 px-5 ps-3 m-2 rounded">
          <div className="m-2">
            <div className="fs-5">Total Movies</div>
            <div className="d-flex justify-content-between mt-2">
              <div className="fs-4">{moviedata?.length}</div>
              <div className="ms-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  width="40px"
                  height="30px"
                >
                  <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_box py-2 px-5 ps-3 m-2 rounded">
          <div className="m-2">
            <div className="fs-5">Total Shows</div>
            <div className="d-flex justify-content-between mt-2">
              <div className="fs-4">{showdata?.length}</div>
              <div className="ms-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  width="40px"
                  height="30px"
                >
                  <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 mx-3  mt-4">
        <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-around">
          <div
            className="rounded my-4 mx-3 "
            style={{ backgroundColor: "hsl(212, 92%, 21%)", width: "600px" }}
          >
            <div className="d-flex ">
              <div className="d-flex justify-content-around">
                <div className="d-flex  ms-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-light m-3"
                    width="30px"
                    height="30px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                  </svg>
                  <div className="fs-5 text-light m-3">Movies</div>
                </div>
                <div className="ms-5" style={{ cursor: "pointer" }}>
                  <span
                    className="badge rounded-pill bg-primary p-2 m-3 me-0"
                    onClick={() => navigateCatalog()}
                  >
                    View All
                  </span>
                </div>
              </div>
            </div>
            <Tabledata data={moviedata} />
          </div>
          <div
            className="rounded my-4 mx-3 "
            style={{ backgroundColor: "hsl(212, 92%, 21%)", width: "600px" }}
          >
            <div className="d-flex ">
              <div className="d-flex justify-content-around mx-2">
                <div className="d-flex me-4 ms-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-light m-3"
                    width="30px"
                    height="30px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                  </svg>
                  <div className="fs-5 text-light m-3">Tv Shows</div>
                </div>
                <div className="ms-5" style={{ cursor: "pointer" }}>
                  <span
                    className="badge rounded-pill bg-primary p-2 m-3 me-0"
                    onClick={() => navigateShows()}
                  >
                    View All
                  </span>
                </div>
              </div>
            </div>
            <Tabledata data={showdata} />
          </div>
        </div>
      </div>
      <div className="px-5 my-3 text-white" style={{ margin: "0px 99px" }}>
        <div
          className="rounded "
          style={{ backgroundColor: "hsl(212, 92%, 21%)", width: "100%" }}
        >
          <div className="d-flex ">
            <div className="d-flex justify-content-around mx-2">
              <div className="d-flex me-4 ms-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-light m-3"
                  width="30px"
                  height="30px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                  />
                </svg>
                <div className="fs-5 text-light m-3">Users</div>
              </div>
              <div className="ms-5" style={{ cursor: "pointer" }}>
                <span
                  className="badge rounded-pill bg-primary p-2 m-3 me-0"
                  onClick={() => navigateUser()}
                >
                  View All
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-2">
            <div
              className="horizonal_line"
              style={{
                backgroundColor: "rgb(202, 209, 222)",
                margin: "1px 1px",
                height: "1px",
              }}
            ></div>
            <table className="text-white table">
              <thead>
                <tr className="fw-bold">
                  <td>User Name</td>
                  <td>User Email</td>
                  <td>Role</td>
                </tr>
              </thead>
              <tbody>
                {userdata?.slice(0, 5).map((ele) => {
                  return (
                    <tr key={ele._id}>
                      <td>{ele.userName}</td>
                      <td>{ele.userEmail}</td>
                      <td>{ele.role}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
