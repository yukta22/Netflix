import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ManageProfile = () => {
  const [userdata, setUserdata] = useState();
  const navigate = useNavigate();
  // const { state } = useLocation();

  const navigateEditImage = () => {
    navigate("/home/profile-manage/editImage");
  };
  // const user = useSelector((state) => state.login.user);
  let user = JSON.parse(localStorage.getItem("user"));
  user = user?.email;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    if (userdata) {
      setUserdata(user);
    }
  }, []);

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    console.log(state);
    // console.log(userdata?.userName);

    const formData = new FormData();
    formData.append("userName", userdata.userName);
    formData.append("userEmail", userdata.userEmail);
    formData.append("userProfile", state);
    editUser(formData);
  };

  const editUser = async (formData) => {
    const res = await axios.put("/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };

  return (
    <div>
      <div className="text-white m-5">
        <form onSubmit={handleSubmit}>
          <h1>Manage Profile</h1>
          <div
            className="horizonal_line "
            style={{
              margin: "1rem 0rem",
              backgroundColor: "rgb(87, 90, 92)",
            }}
          ></div>
          <div className="d-flex m-5">
            <div className="ms-3 w-75">
              <div className="fs-5 mt-3">Language:</div>
              <select
                className="form-select w-25 bg-secondary text-white"
                aria-label="Default select example"
              >
                <option defaultValue>English</option>
                <option>Bahasa Indonesia</option>
                <option>Bahasa Melayu</option>
                <option>Dansk</option>
                <option>Desutsch</option>
                <option>English</option>
                <option>Fillipino</option>
                <option>Francais</option>
                <option>Hrvatski</option>
                <option>Hindi</option>
                <option>Italianp</option>
                <option>Magyar</option>
                <option>Nederlands</option>
                <option>Norsk bokmai</option>
                <option>Polski</option>
                <option>Portugues</option>
              </select>
              <div className="fs-5 mt-3">Game Handle:</div>
              <div className="mt-3">
                Your handle is a unique name that'll be used for playing with
                other Netflix members scross all Netflix Games.
              </div>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                id="exampleFormControlInput1"
                placeholder="Create Game Handle"
              />
              <div
                className="horizonal_line "
                style={{
                  margin: "2rem 0rem",
                  backgroundColor: "rgb(87, 90, 92)",
                }}
              ></div>
              <div className="fs-5 mt-3">Maturity Settings:</div>
              <button className="btn btn-secondary my-3">
                All Maturity Ratings
              </button>
              <div>Show titles of all maturity ratings for this profile.</div>
              <button className="btn btn-secondary my-3">Edit</button>
              <div
                className="horizonal_line "
                style={{
                  margin: "2rem 0rem",
                  backgroundColor: "rgb(87, 90, 92)",
                }}
              ></div>
              <div className="fs-5 mt-3">Autoplay controls</div>
              <div className="form-check">
                <input
                  className="form-check-input text-white bg-secondary p-3"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label mt-2 ms-2 "
                  htmlFor="flexCheckDefault"
                >
                  Autoplay next episode in a series on all devices.
                </label>
              </div>
              {/* <div className="form-check mt-3">
                <input
                  className="form-check-input text-white bg-secondary p-3"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
              <label
                className="form-check-label ms-2 mt-0"
                htmlhtmlFor="flexCheckDefault1"
              >
                Autoplay previews while browsing on all devices.
              </label> */}
            </div>
          </div>
          <div
            className="horizonal_line "
            style={{
              margin: "1rem 0rem",
              backgroundColor: "rgb(87, 90, 92)",
            }}
          ></div>
          <button type="submit" className="btn btn-light text-dark px-4">
            Save
          </button>
          <button className="btn btn-secondary text-dark px-4 ms-3">
            Cancle
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;
