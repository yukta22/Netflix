import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Select from "react-select";
import axios from "axios";
// import options from "./option.json";

import { useLocation, useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  // console.log(state);
  const [loader, setLoader] = useState(false);
  const [submitflag, setSubmitflag] = useState(false);
  const [data, setData] = useState();
  const [flag, setFlag] = useState(true);
  const [img, setImg] = useState("");
  const [video_360p, setVideo_360p] = useState();
  const [video_480p, setVideo_480p] = useState();
  const [video_720p, setVideo_720p] = useState();
  const [video_1080p, setVideo_1080p] = useState();
  const [cast, setCast] = useState([]);
  const [option, setOption] = useState([]);
  const [formErr, setFormErr] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    if (state) {
      setFlag(false);
      setData(state);
      // setStateflag(true);
      setImg(state.image);
      setVideo_360p(state.video_360p);
      setVideo_480p(state.video_480p);
      setVideo_720p(state.video_720p);
      setVideo_1080p(state.video_1080p);
      setCast(state.cast);
    } else {
      setFlag(true);
    }

    axios.get("/getActor").then((response) => {
      setOption(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const err = {};
    let valflag = false;
    if (!data?.title) {
      err.title = "Title is required";
      valflag = true;
    } else if (!isNaN(data?.title)) {
      err.title = "Title should not be a number";
      valflag = true;
    }
    if (!data?.description) {
      err.description = "Description is required";
      valflag = true;
    } else if (!isNaN(data?.description)) {
      err.description = "Description should not be a number";
      valflag = true;
    }
    if (!data?.genre) {
      err.genre = "Genre is required";
      valflag = true;
    } else if (!isNaN(data?.genre)) {
      err.genre = "Genre should not be a number";
      valflag = true;
    }
    setFormErr(err);

    return valflag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      setLoader(true);
      const token = localStorage.getItem("token");
      console.log(data);
      const formdata = new FormData();
      formdata.append("title", data?.title);
      formdata.append("description", data?.description);
      formdata.append("genre", data?.genre);
      formdata.append("releaseDate", data?.releaseDate);
      formdata.append("image", img);
      formdata.append("video_360p", video_360p);
      formdata.append("video_480p", video_480p);
      formdata.append("video_720p", video_720p);
      formdata.append("video_1080p", video_1080p);

      for (const element of cast) {
        formdata.append("cast", element.value);
      }
      const res = await axios.post("/movie", formdata, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res) {
        setLoader(false);
        setSubmitflag(true);
      }
      setData({});
    }
  };

  const editData = async () => {
    const token = localStorage.getItem("token");
    setLoader(true);
    const formdata = new FormData();
    formdata.append("id", state?._id);
    formdata.append("title", data?.title);
    formdata.append("description", data?.description);
    formdata.append("genre", data?.genre);
    formdata.append("releaseDate", data?.releaseDate);
    formdata.append("image", img);
    formdata.append("video_360p", video_360p);
    formdata.append("video_480p", video_480p);
    formdata.append("video_720p", video_720p);
    formdata.append("video_1080p", video_1080p);

    for (let i = 0; i < cast.length; i++) {
      formdata.append("cast", cast[i].value);
    }
    const res = await axios.put("/movie", formdata, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    if (res) {
      setLoader(false);
      setSubmitflag(true);
    }
    setData({});
  };

  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let date = curr.toISOString().substring(0, 10);

  return (
    <>
      <AdminNavbar />
      <div className="fs-3 text-white text-center ps-3">Add New Item</div>
      <div className="w-50 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label
              htmlFor="formGroupExampleInput"
              className="form-label text-light"
            >
              Title
            </label>
            <span className="text-danger ms-1">*</span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Title"
              name="title"
              value={data?.title || ""}
              onChange={handleChange}
            />
            <div className="text-danger">{formErr?.title}</div>
          </div>
          <div className="mb-1">
            <label
              htmlFor="formGroupExampleInput2"
              className="form-label text-light"
            >
              Description
            </label>
            <span className="text-danger ms-1">*</span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Description"
              name="description"
              value={data?.description || ""}
              onChange={handleChange}
            />
            <div className="text-danger">{formErr?.description}</div>
          </div>

          <div className="mb-1 mt-3 ">
            <label htmlFor="formFile" className="form-label text-light">
              Upload Cover Image
            </label>
            <span className="text-danger ms-1">*</span>
            <div className="d-flex">
              {state ? (
                <>
                  <img
                    src={`${
                      typeof img === "string" ? img : URL.createObjectURL(img)
                    }`}
                    alt="..."
                    width="90px"
                    height="40px"
                    className="me-3"
                    loading="lazy"
                    required
                  />
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </>
              ) : (
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => setImg(e.target.files[0])}
                  required
                />
              )}
            </div>
          </div>

          <div className="d-flex">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 360p
              </label>
              <span className="text-danger ms-1">*</span>
              <div className="d-flex">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => setVideo_360p(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <div className="mb-1 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 480p
              </label>
              <span className="text-danger ms-1">*</span>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setVideo_480p(e.target.files[0])}
                required
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 720p
              </label>
              <span className="text-danger ms-1">*</span>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setVideo_720p(e.target.files[0])}
                required
              />
            </div>
            <div className="mb-1 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 1080p
              </label>
              <span className="text-danger ms-1">*</span>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setVideo_1080p(e.target.files[0])}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-1 mt-3 w-50">
              <label className="form-label text-light">Genre</label>
              <span className="text-danger ms-1">*</span>
              <input
                className="form-control"
                type="text"
                name="genre"
                placeholder="genre"
                value={data?.genre || ""}
                onChange={handleChange}
              />
              <div className="text-danger">{formErr?.genre}</div>
            </div>
            <div className="mb-3 mt-3 ms-2 w-50">
              <label className="form-label text-light ">Release Date</label>
              <span className="text-danger ms-1">*</span>
              <input
                className="form-control"
                type="date"
                name="releaseDate"
                max={date}
                value={data?.releaseDate?.substring(0, 10) || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-1 mt-3 w-100">
            <label htmlFor="formFile" className="form-label text-light">
              Cast
            </label>
            <span className="text-danger ms-1">*</span>
            <Select
              isMulti
              name="cast"
              options={option}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder={cast?.join(", ") || ""}
              // value={cast || ""}
              onChange={(e) => {
                setCast(e);
              }}
              required
            />
          </div>
          {flag ? (
            <button className="btn btn-primary m-5 mx-auto" type="submit">
              Submit
            </button>
          ) : (
            <button
              className="btn btn-primary m-5 mx-auto"
              type="button"
              onClick={() => editData()}
            >
              Update
            </button>
          )}
        </form>
        {loader ? (
          <div className="w-100">
            <div
              className=" spinner-border text-white text-center mb-5"
              role="status"
              style={{ marginLeft: "450px" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          submitflag && (
            <div className="text-white text-center mb-5 fs-4">
              Data Submitted
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AddMovie;
