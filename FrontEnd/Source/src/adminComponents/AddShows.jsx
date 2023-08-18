import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Select from "react-select";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLocation, useNavigate } from "react-router-dom";

const AddShows = () => {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [submitflag, setSubmitflag] = useState(false);
  const [episode_arr, setEpisode_arr] = useState([]);
  const [cast, setCast] = useState([]);
  const [img, setImg] = useState("");
  const [video_360p, setVideo_360p] = useState("");
  const [video_480p, setVideo_480p] = useState("");
  const [video_720p, setVideo_720p] = useState("");
  const [video_1080p, setVideo_1080p] = useState("");
  const [epi_img, setEpi_img] = useState([]);
  const [epi_video_360p, setEpi_video_360p] = useState([]);
  const [epi_video_480p, setEpi_video_480p] = useState([]);
  const [epi_video_720p, setEpi_video_720p] = useState([]);
  const [epi_video_1080p, setEpi_video_1080p] = useState([]);
  const [formErr, setFormErr] = useState();
  const [flag, setFlag] = useState(true);

  const [option, setOption] = useState([]);
  const { state } = useLocation();
  console.log("line 31", state);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(epi_img);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    if (state) {
      console.log("asd", state.episode);
      setFlag(false);
      // setStateflag(true);
      // console.log(state);
      setData(state);
      setEpisode_arr(state.episode);
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

  const handleChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange = (i, e) => {
    let newFormValues = [...episode_arr];
    newFormValues[i][e?.target?.name] = e?.target?.value;
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

  const validation = () => {
    const err = {};
    let supportedFile = "mp4";
    let imgSupportedFile = ["jpg", "jpeg", "png"];
    let imgName = img.name?.toLowerCase();
    let imgExtension = imgName?.split(".").pop();
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
    if (!img) {
      err.img = "Image is Required";
    } else if (!imgSupportedFile.includes(imgExtension)) {
      err.img = "Image must be a jpg, jpeg, or png format";
    }
    if (!video_360p) {
      err.video_360p = "Video is Required";
    } else if (!video_360p.name.includes(supportedFile)) {
      err.video_360p = "Video must be a mp4 Format";
    }
    if (!video_480p) {
      err.video_480p = "Video is Required";
    } else if (!video_480p.name.includes(supportedFile)) {
      err.video_480p = "Video must be a mp4 Format";
    }
    if (!video_720p) {
      err.video_720p = "Video is Required";
    } else if (!video_720p.name.includes(supportedFile)) {
      err.video_720p = "Video must be a mp4 Format";
    }
    if (!video_1080p) {
      err.video_1080p = "Video is Required";
    } else if (!video_1080p.name.includes(supportedFile)) {
      err.video_1080p = "Video must be a mp4 Format";
    }
    if (!data?.releaseDate) {
      err.releaseDate = "Release Date is Required";
    }
    if (cast.length < 1) {
      err.cast = "Cast is required";
    }

    setFormErr(err);

    return valflag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      setLoader(true);
      // console.log(episode_arr);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("genre", data.genre);
      formData.append("image", img);
      formData.append("releaseDate", data?.releaseDate);
      formData.append("video_360p", video_360p);
      formData.append("video_480p", video_480p);
      formData.append("video_720p", video_720p);
      formData.append("video_1080p", video_1080p);
      for (const element of cast) {
        formData.append("cast", element.value);
      }
      formData.append("episode_arr", JSON.stringify(episode_arr));
      episode_arr.forEach((episode, index) => {
        // console.log(`episode_video_360p_${index}`, epi_video_360p[index]);
        // console.log(`episode_video_480p_${index}`, epi_video_480p[index]);
        // console.log(`episode_video_720p_${index}`, epi_video_720p[index]);
        // console.log(`episode_video_1080p_${index}`, epi_video_1080p[index]);
        formData.append(`episode_image_${index}`, epi_img[index]);
        formData.append(`episode_video_360p_${index}`, epi_video_360p[index]);
        formData.append(`episode_video_480p_${index}`, epi_video_480p[index]);
        formData.append(`episode_video_720p_${index}`, epi_video_720p[index]);
        formData.append(`episode_video_1080p_${index}`, epi_video_1080p[index]);
      });

      const token = localStorage.getItem("token");

      const res = await axios.post("/shows", formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        setLoader(false);
        setSubmitflag(true);
        toast.success("Data Submitted", {
          onClose: () => {
            navigate("/admin/series");
          },
        });
      }
      console.log(res);
      setData({});
    }
  };

  const editData = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("id", state?._id);
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("genre", data?.genre);
    formData.append("releaseDate", data?.releaseDate);
    formData.append("image", img);
    formData.append("video_360p", video_360p);
    formData.append("video_480p", video_480p);
    formData.append("video_720p", video_720p);
    formData.append("video_1080p", video_1080p);
    for (const element of cast) {
      formData.append("cast", element.value);
    }
    formData.append("episode_arr", JSON.stringify(episode_arr));
    console.log("epi_arr", episode_arr);
    episode_arr.forEach((episode, index) => {
      // console.log(`episode_video_360p_${index}`, epi_video_360p[index]);
      // console.log(`episode_video_480p_${index}`, epi_video_480p[index]);
      // console.log(`episode_video_720p_${index}`, epi_video_720p[index]);
      // console.log(`episode_video_1080p_${index}`, epi_video_1080p[index]);
      formData.append(`episode_image_${index}`, epi_img[index]);
      formData.append(`episode_video_360p_${index}`, epi_video_360p[index]);
      formData.append(`episode_video_480p_${index}`, epi_video_480p[index]);
      formData.append(`episode_video_720p_${index}`, epi_video_720p[index]);
      formData.append(`episode_video_1080p_${index}`, epi_video_1080p[index]);
    });

    const token = localStorage.getItem("token");
    console.log(formData);

    const res = await axios.put("/shows", formData, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });
    if (res) {
      setLoader(false);
      setSubmitflag(true);
      toast.success("Data Submitted", {
        onClose: () => {
          navigate("/admin/series");
        },
      });
    }
    console.log(res);
    setData({});
  };

  let curr = new Date();
  curr.setDate(curr.getDate() + 3);
  let date = curr.toISOString().substring(0, 10);
  return (
    <>
      <AdminNavbar />
      {state ? (
        <div className="fs-3 text-white text-center ps-3">Edit Show</div>
      ) : (
        <div className="fs-3 text-white text-center ps-3">Add New Item</div>
      )}

      <div className="w-50 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label
              htmlFor="formGroupExampleInput"
              className="form-label text-light"
            >
              Show Title
            </label>
            <span className="text-danger ms-1">*</span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Title"
              name="title"
              onChange={handleChangeData}
              value={data?.title || ""}
              // required
            />
            <div className="text-danger">{formErr?.title}</div>
          </div>
          <div className="mb-1">
            <label
              htmlFor="formGroupExampleInput2"
              className="form-label text-light"
            >
              Show Description
            </label>
            <span className="text-danger ms-1">*</span>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Description"
              name="description"
              onChange={handleChangeData}
              value={data?.description || ""}
              // required
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
                    // required
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
                  // required
                />
              )}
            </div>
            <div className="text-danger">{formErr?.img}</div>
          </div>
          <div className="d-flex">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 360p
              </label>
              <span className="text-danger ms-1">*</span>
              <div className="d-flex">
                {/* {state ? (
                  <>
                    <video
                      src={`${
                        typeof video_360p === "string"
                          ? video_360p
                          : URL.createObjectURL(video_360p)
                      }`}
                      width="90px"
                      height="40px"
                      className="me-3"
                      required
                    />
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => setVideo_360p(e.target.files[0])}
                      required
                    />
                  </>
                ) : ( */}
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setVideo_360p(e.target.files[0])}
                  // required
                />
                {/* )} */}
              </div>
              <div className="text-danger">{formErr?.video_360p}</div>
            </div>
            <div className="mb-1 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 480p
              </label>
              <span className="text-danger ms-1">*</span>
              <div className="d-flex">
                {/* {state ? (
                  <>
                    <video
                      src={`${
                        typeof video_360p === "string"
                          ? video_360p
                          : URL.createObjectURL(video_360p)
                      }`}
                      width="90px"
                      height="40px"
                      className="me-3"
                      required
                    />
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => setVideo_480p(e.target.files[0])}
                      required
                    />
                  </>
                ) : ( */}
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setVideo_480p(e.target.files[0])}
                  // required
                />
                {/* )} */}
              </div>
              <div className="text-danger">{formErr?.video_480p}</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 720p
              </label>
              <span className="text-danger ms-1">*</span>
              <div className="d-flex">
                {/* {state ? (
                  <>
                    <video
                      src={`${
                        typeof video_360p === "string"
                          ? video_360p
                          : URL.createObjectURL(video_360p)
                      }`}
                      width="90px"
                      height="40px"
                      className="me-3"
                      required
                    />
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => setVideo_720p(e.target.files[0])}
                      required
                    />
                  </>
                ) : ( */}
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setVideo_720p(e.target.files[0])}
                  // required
                />
                {/* )} */}
              </div>
              <div className="text-danger">{formErr?.video_720p}</div>
            </div>
            <div className="mb-1 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Upload Video 1080p
              </label>
              <span className="text-danger ms-1">*</span>
              <div className="d-flex">
                {/* {state ? (
                  <>
                    <video
                      src={`${
                        typeof video_360p === "string"
                          ? video_360p
                          : URL.createObjectURL(video_360p)
                      }`}
                      width="90px"
                      height="40px"
                      className="me-3"
                      required
                    />
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => setVideo_1080p(e.target.files[0])}
                      required
                    />
                  </>
                ) : ( */}
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setVideo_1080p(e.target.files[0])}
                  // required
                />
                {/* )} */}
              </div>
              <div className="text-danger">{formErr?.video_1080p}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-1 mt-3 w-50">
              <label htmlFor="formFile" className="form-label text-light">
                Genre
              </label>
              <span className="text-danger ms-1">*</span>
              <input
                className="form-control"
                type="text"
                name="genre"
                placeholder="genre"
                value={data?.genre || ""}
                onChange={handleChangeData}
                // required
              />
              <div className="text-danger">{formErr?.genre}</div>
            </div>
            <div className="mb-3 mt-3 ms-2 w-50">
              <label htmlFor="formFile" className="form-label text-light ">
                Release Date
              </label>
              <span className="text-danger ms-1">*</span>
              <input
                className="form-control"
                type="date"
                id="formFile"
                name="releaseDate"
                max={date}
                value={data?.releaseDate?.substring(0, 10) || ""}
                onChange={handleChangeData}
                // required
              />
              <div className="text-danger">{formErr?.releaseDate}</div>
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
              onChange={(e) => {
                setCast(e);
              }}
            />
            <div className="text-danger">{formErr?.cast}</div>
          </div>

          {episode_arr?.map((element, index) => {
            console.log(element);
            return (
              <div key={index}>
                <h3 className="text-light my-4"> Episode {index + 1}</h3>
                <div className="mb-1">
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label text-light"
                  >
                    Episode Title
                  </label>
                  <span className="text-danger ms-1">*</span>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Title"
                    name="title"
                    value={element.title || ""}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label text-light"
                  >
                    Episode Description
                  </label>
                  <span className="text-danger ms-1">*</span>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Description"
                    name="description"
                    value={element.description || ""}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div className="mb-1 mt-3 ">
                  <label htmlFor="formFile" className="form-label text-light">
                    Upload Cover Image
                  </label>
                  <span className="text-danger ms-1">*</span>
                  <div className="d-flex">
                    {/* {state ? (
                    <>
                      <img
                        src={`${
                          typeof element.image === "string"
                            ? element.image
                            : URL.createObjectURL(epi_img[index])
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
                        onChange={(e) =>
                          setEpi_img((prev) => [...prev, e.target.files[0]])
                        }
                      />
                    </>
                  ) : ( */}
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={(e) =>
                        setEpi_img((prev) => [...prev, e.target.files[0]])
                      }
                      required
                    />
                    {/* )} */}
                  </div>
                </div>

                <div className="d-flex">
                  <div className="mb-1 mt-3 w-50">
                    <label htmlFor="formFile" className="form-label text-light">
                      Upload Video 360p
                    </label>
                    <span className="text-danger ms-1">*</span>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) =>
                        setEpi_video_360p((prev) => [
                          ...prev,
                          e.target.files[0],
                        ])
                      }
                      required
                    />
                  </div>
                  <div className="mb-1 mt-3 ms-2 w-50">
                    <label htmlFor="formFile" className="form-label text-light">
                      Upload Video 480p
                    </label>
                    <span className="text-danger ms-1">*</span>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) =>
                        setEpi_video_480p((prev) => [
                          ...prev,
                          e.target.files[0],
                        ])
                      }
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
                      onChange={(e) =>
                        setEpi_video_720p((prev) => [
                          ...prev,
                          e.target.files[0],
                        ])
                      }
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
                      onChange={(e) =>
                        setEpi_video_1080p((prev) => [
                          ...prev,
                          e.target.files[0],
                        ])
                      }
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 mt-3 ms-2 ">
                  <label htmlFor="formFile" className="form-label text-light ">
                    Release Date
                  </label>
                  <span className="text-danger ms-1">*</span>
                  <input
                    className="form-control"
                    type="date"
                    name="releaseDate"
                    max={date}
                    onChange={handleChange}
                    required
                  />
                </div>
                {index - 1 || index ? (
                  <button
                    type="button"
                    className="btn btn-danger align-items-end mx-2"
                    onClick={() => removeFormFields(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            );
          })}
          <button
            className="btn btn-primary my-5 mx-2"
            type="button"
            onClick={() => addFormFields()}
          >
            Add Episode
          </button>
          {flag ? (
            <button className="btn btn-primary my-5 mx-auto" type="submit">
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
          <div className="w-100 ">
            <div
              className=" spinner-border text-white text-center mb-5  "
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
      <ToastContainer />
    </>
  );
};

export default AddShows;
