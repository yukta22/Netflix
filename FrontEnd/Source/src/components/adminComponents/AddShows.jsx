import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Select from "react-select";
import axios from "axios";

const AddShows = () => {
  const options = [
    { value: "sharuku_khan", label: "Sharukh Khan" },
    { value: "Hrithil Roshan", label: "Hrithil Roshan" },
    { value: "Farhan Akhtar", label: "Farhan Akhtar" },
    { value: "Abhay Deol", label: "Abhay Deol" },
    { value: "Katrina Kaif", label: "Katrina Kaif" },
    { value: "Kalki Koechlin", label: "Kalki Koechlin" },
    { value: "ranveer_kapur", label: "Ranveer Kapur" },
    { value: "ranbir_singh", label: "Ranbir Singh" },
    { value: "deepika_padukon", label: "Deepika Padukon" },
    { value: "deepika_padukon", label: "Deepika Padukon" },
  ];
  const [data, setData] = useState();
  const [episode_arr, setEpisode_arr] = useState([]);
  const [img, setImg] = useState([]);
  const [cast, setCast] = useState();
  const [video_360p, setVideo_360p] = useState([]);
  console.log(video_360p);
  const handleChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChange = (i, e) => {
    let newFormValues = [...episode_arr];
    newFormValues[i][e.target.name] = e.target.value;
    setEpisode_arr(newFormValues);
    // console.log(episode_arr);
  };
  let addFormFields = () => {
    setEpisode_arr([...episode_arr, {}]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...episode_arr];
    newFormValues.splice(i, 1);
    setEpisode_arr(newFormValues);
  };
  // console.log(episode_arr);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(episode_arr);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("genre", data.genre);
    formData.append("image", img);
    for (const element of cast) {
      formData.append("cast", element.value);
    }
    formData.append("episode_arr", JSON.stringify(episode_arr));
    const token = localStorage.getItem("token");

    const res = await axios.post("/shows", formData, {
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
              Show Title
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Title"
              name="title"
              onChange={handleChangeData}
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="formGroupExampleInput2"
              className="form-label text-light"
            >
              Show Description
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Description"
              name="description"
              onChange={handleChangeData}
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
              //   onChange={(e) => setImg(e.target.files[0])}
            />
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
                onChange={handleChangeData}
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
                onChange={handleChangeData}
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

          <h4 className="text-light my-3">Episode Details</h4>
          {episode_arr.map((element, index) => (
            <>
              <div className="mb-1" key={index}>
                <label
                  htmlFor="formGroupExampleInput"
                  className="form-label text-light"
                >
                  Episode Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Title"
                  name="title"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="mb-1">
                <label
                  htmlFor="formGroupExampleInput2"
                  className="form-label text-light"
                >
                  Episode Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Description"
                  name="description"
                  onChange={(e) => handleChange(index, e)}
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
                  onChange={(e) =>
                    setImg((prev) => [...prev, e.target.files[0]])
                  }
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
                    onChange={(e) =>
                      setVideo_360p([...video_360p, e.target.files[0]])
                    }
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

              <div className="mb-3 mt-3 ms-2 ">
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
              {index ? (
                <button
                  type="button"
                  className="btn btn-danger "
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              ) : null}
            </>
          ))}
          <button
            className="btn btn-primary m-5 mx-2"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button>
          <button className="btn btn-primary m-5 mx-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddShows;
