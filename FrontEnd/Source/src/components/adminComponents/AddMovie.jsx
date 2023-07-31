import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Select from "react-select";
import axios from "axios";

const AddMovie = () => {
  const options = [
    { value: "sharuku_khan", label: "Sharukh Khan" },
    { value: "Hrithil Roshan", label: "Hrithil Roshan" },
    { value: "Farhan Akhtar", label: "Farhan Akhtar" },
    { value: "Abhay Deol", label: "Abhay Deol" },
    { value: "Katrina Kaif", label: "Katrina Kaif" },
    { value: "Kalki Koechlin", label: "Kalki Koechlin" },
    { value: "ranveer_kapur", label: "Ranveer Kapur" },
    { value: "ranbir_singh", label: "Ranbir Singh" },
  ];

  const [data, setData] = useState();
  const [img, setImg] = useState();
  const [video_360p, setVideo_360p] = useState();
  const [video_480p, setVideo_480p] = useState();
  const [video_720p, setVideo_720p] = useState();
  const [video_1080p, setVideo_1080p] = useState();
  const [cast, setCast] = useState();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(data);
    const formdata = new FormData();
    formdata.append("title", data?.title);
    formdata.append("description", data?.description);
    formdata.append("genre", data?.genre);
    formdata.append("image", img);
    formdata.append("video_360p", video_360p);
    formdata.append("video_480p", video_480p);
    formdata.append("video_720p", video_720p);
    formdata.append("video_1080p", video_1080p);

    for (let i = 0; i < cast.length; i++) {
      formdata.append("cast", cast[i].value);
    }
    const res = await axios.post("http://localhost:9000/movie", formdata, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };

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
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="formGroupExampleInput2"
              className="form-label text-light"
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Description"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-1 mt-3 ">
            <label htmlFor="formFile" className="form-label text-light">
              Upload Cover Image
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>

          <div className="d-flex">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 360p
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setVideo_360p(e.target.files[0])}
              />
            </div>
            <div className="mb-1 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 480p
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setVideo_480p(e.target.files[0])}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 720p
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setVideo_720p(e.target.files[0])}
              />
            </div>
            <div className="mb-1 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 1080p
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setVideo_1080p(e.target.files[0])}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Genre
              </label>
              <input
                className="form-control"
                type="text"
                id="formFile"
                name="genre"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light ">
                Release Date
              </label>
              <input
                className="form-control"
                type="date"
                id="formFile"
                name="releaseDate"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-1 mt-3 w-100">
            <label htmlFor="formFile" className="form-label text-light">
              Cast
            </label>
            <Select
              isMulti
              name="cast"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setCast(e);
              }}
            />
          </div>
          <button className="btn btn-primary m-5 mx-auto" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMovie;
