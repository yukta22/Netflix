import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Showsitem from "../Showsitem";
import ShowInfo from "../ShowInfo";

const TvShow = () => {
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);

  const [showData, setShowData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    let config = {
      method: "get",
      url: "http://localhost:9000/shows",
      headers: {
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // console.log(data);
  const findMovie = data?.find((e) => e.title == "Money Heist");
  const navigateToVideo = (showData) => {
    navigate("/home/movie", { state: showData });
  };

  const handleShowInfo = async (ele) => {
    // console.log("asdqwe");
    setFlag(true);
    setShowData(ele);
  };

  return (
    <>
      <Navbar />
      <div
        className="text-white"
        style={{
          backgroundImage: `url(${findMovie?.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "950px",
          width: "1800px",
          margin: "12px",
          marginTop: "0px",
        }}
      >
        {flag && (
          <div
            className="position-absolute bottom-0 top-0 pt-3 left-50 "
            style={{ zIndex: 1 }}
          >
            <ShowInfo showData={showData} setFlag={setFlag} />
          </div>
        )}
        <div className="p-5 w-50">
          <h1
            className="display-1 fw-bold"
            style={{ paddingTop: "250px", paddingLeft: "120px" }}
          >
            {findMovie?.title}
          </h1>
          <div
            className="d-flex "
            style={{ paddingTop: "20px", paddingLeft: "120px" }}
          >
            <div className="position-relative">
              <button
                className="btn btn-light ms-1 px-5  ps-5"
                onClick={() => navigateToVideo(findMovie)}
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
            <div className="position-relative">
              <button
                className="btn btn-secondary ms-3 px-5 "
                onClick={() => handleShowInfo(findMovie)}
              >
                More Info
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-white position-absolute ps-2"
                style={{ left: 18, paddingTop: "6px" }}
                height="30px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
          </div>
          <div className="ps-5 pt-4 ms-1 fw-bold fs-3 ">
            <p className="text-justify" style={{ paddingLeft: "70px" }}>
              {findMovie?.description}
            </p>
          </div>
        </div>
      </div>
      <Showsitem data={data}></Showsitem>
    </>
  );
};

export default TvShow;
