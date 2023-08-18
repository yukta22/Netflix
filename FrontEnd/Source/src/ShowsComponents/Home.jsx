import React, { useEffect, useState } from "react";
import axios from "axios";
import Showsitem from "./Showsitem";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShowInfo from "./ShowInfo";
import Footer from "../components/Footer";
const Home = () => {
  const [userFlag, setUserFlag] = useState(false);
  const [data, setData] = useState();
  const [randomMovie, setRandomMovie] = useState();
  const [flag, setFlag] = useState(false);

  const [showData, setShowData] = useState();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    console.log(userData);

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

    const findData = async () => {
      const res = await axios.get(`/subscriptions/${userData.id}`);
      console.log(res);
      if (res.data == "Data not found") {
        setUserFlag(true);
      }
    };
    findData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      url: "/randommovie",
      headers: {
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setRandomMovie(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const findMovie =
    randomMovie && randomMovie.length > 0
      ? data?.find((e) => e.title === randomMovie[0]?.title)
      : undefined;
  // const findMovie = data?.find((e) => e.title == "Suits");

  const navigateToVideo = (showData) => {
    navigate("/home/movie", { state: showData });
  };
  const handleShowInfo = async (ele) => {
    setFlag(true);
    setShowData(ele);
  };

  const navigateToplan = () => {
    navigate("/signUp/plan2", { state: userData });
  };

  return (
    <>
      {userFlag ? (
        <>
          <div className="text-white text-center m-5 bg-dark ">
            <div className="mx-5 p-5">
              <p>To watch Free movie please buy a subscription plan.</p>
              <p
                className="text-primary"
                onClick={navigateToplan}
                style={{ cursor: "pointer", color: "" }}
              >
                Buy Plan
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div
            className="text-white pb-5"
            style={{
              backgroundImage: `url(${findMovie?.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              height: "900px",
              width: "99%",
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
            <div className="p-5 w-50 ">
              <h1
                className="display-1 fw-bold"
                style={{ paddingTop: "260px", paddingLeft: "120px" }}
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
              <div className="d-none d-xxl-block ps-5 pt-4 ms-1 fw-bold fs-3 text-justify">
                <p style={{ paddingLeft: "70px" }}>{findMovie?.description}</p>
              </div>
            </div>
          </div>
          <Showsitem data={data}></Showsitem>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
