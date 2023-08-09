import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const WatchHistory = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    let data = JSON.stringify({
      userId: user.id,
    });

    let config = {
      method: "post",
      url: "/watchHistory/data",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);

        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigateToVideo = (showData) => {
    navigate("/home/movie", { state: showData });
  };

  return (
    <>
      <Navbar />
      <div className="m-2 py-4 ">
        <div>
          <h5 className="text-white ms-5 mb-3 fs-4">My List</h5>
          <div className="mx-4">
            <div className="ms-3 d-flex flex-wrap">
              {data?.map((ele, ind) => (
                <div
                  className="m-2 cards"
                  key={ele._id}
                  onClick={() => navigateToVideo(ele.movie)}
                >
                  <img
                    src={
                      ele.movie?.image ||
                      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vdmllfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                    }
                    alt="image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchHistory;
