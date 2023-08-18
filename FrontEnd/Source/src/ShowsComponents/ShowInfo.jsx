import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowInfo = ({ showData, setFlag }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const ref = useRef(null);
  // console.log(showData);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    let config = {
      method: "get",
      url: "/movie",
      headers: {
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setFlag(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const navigateToVideo = (showData) => {
    navigate("/home/movie", { state: showData });
  };
  const filterData = data?.filter(
    (ele) =>
      ele.title !== showData?.title &&
      (ele.genre
        .toLowerCase()
        .includes(showData?.genre.toLowerCase().split(" ")[0]) ||
        ele.genre
          .toLowerCase()
          .includes(showData?.genre.toLowerCase().split(" ")[1]) ||
        ele.genre
          .toLowerCase()
          .includes(showData?.genre.toLowerCase().split(",")[0]) ||
        ele.genre
          .toLowerCase()
          .includes(showData?.genre.toLowerCase().split(",")[1]))
  );

  return (
    <>
      <div
        ref={ref}
        className="front_page position-relative rounded pb-5"
        style={{
          margin: "12px",
          marginLeft: "400px",
          marginRight: "410px",
          overflowY: "auto",
        }}
      >
        <div
          className="text-white"
          style={{
            backgroundImage: `url(${showData?.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            height: "650px",
            width: "55vw",
            objectFit: "contain",
          }}
        >
          <div className="p-5">
            <h1
              className="display-1 fw-bold"
              style={{ paddingTop: "330px", paddingLeft: "20px" }}
            >
              {showData?.title}
            </h1>
            <div
              className="d-flex "
              style={{ paddingTop: "20px", paddingLeft: "20px" }}
            >
              <div className="position-relative">
                <button
                  className="btn btn-light ms-1 px-5  ps-5"
                  onClick={() => navigateToVideo(showData)}
                >
                  Play
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-dark position-absolute ps-2"
                  style={{ left: 18, paddingTop: "6px", paddingRight: "6px" }}
                  height="30px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="text-light p-2 ps-4">
          <div className="d-flex ">
            <div className="p-2 w-75">{showData?.description}</div>
            <div>
              <div className="p-2 ">
                <span className="text-secondary">Cast:</span>{" "}
                {showData?.cast.join(",")}
              </div>
              <div className="p-2">
                <span className="text-secondary">Genre:</span> {showData?.genre}
              </div>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-light position-absolute p-2"
          style={{ height: "60px", top: "0", right: "1", cursor: "pointer" }}
          onClick={() => setFlag(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {showData?.episode && (
          <>
            <h3 className="text-light ps-4 ms-2  ">Episodes</h3>
            {showData.episode.map((ele) => {
              return (
                <div
                  key={ele._id}
                  className="text-light ms-3"
                  onClick={() => navigateToVideo(ele)}
                >
                  <div className="d-flex p-3">
                    <img
                      src={ele.image}
                      width="200px"
                      style={{ cursor: "pointer" }}
                    ></img>
                    <div>
                      <div className="fw-bold ps-5">{ele.title}</div>
                      <div className="ps-5">{ele.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {filterData?.length > 0 && (
          <div className="text-light">
            <div className="fs-4 fw-bold ps-4 ms-2 mt-4">More Like This</div>
            <div className="mx-3 d-flex flex-wrap">
              {filterData?.map((ele) => {
                return (
                  <div
                    className="card m-3 "
                    style={{
                      width: "18rem",
                      cursor: "pointer",
                    }}
                    key={ele._id}
                    onClick={() => navigateToVideo(ele)}
                  >
                    <img
                      src={ele.image}
                      style={{ height: "240px" }}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body showmore">
                      <h5 className="card-title">{ele.title}</h5>
                      <p className="card-text">{ele.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowInfo;
