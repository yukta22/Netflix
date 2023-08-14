import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import ShowInfo from "../ShowsComponents/ShowInfo";

const Newpopular = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [showData, setShowData] = useState();
  const [flag, setFlag] = useState(false);

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
        // console.log(JSON.stringify(response.data));
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

  const newReleaseMovie = data?.filter((e) => e.typeOfMovie == "New Releases");
  const trendingNowMovie = data?.filter((e) => e.typeOfMovie == "Trending Now");
  const handleShowInfo = async (ele) => {
    setFlag(true);
    setShowData(ele);
  };
  return (
    <>
      <Navbar />
      {flag && (
        <div
          className="position-absolute bottom-0 top-0 pt-3 left-50 "
          style={{ zIndex: 1 }}
        >
          <ShowInfo showData={showData} setFlag={setFlag} />
        </div>
      )}
      {newReleaseMovie?.length > 0 && (
        <div>
          <h5 className="text-white ms-5 mb-3 fs-4">New Release</h5>
          <div className="mx-5">
            {newReleaseMovie?.length > 5 ? (
              <Slider className="" {...settings}>
                {newReleaseMovie?.map((ele, ind) => (
                  <div
                    className="cards"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                  >
                    <img src={ele.image} alt="image" />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="d-flex">
                {newReleaseMovie?.map((ele, ind) => (
                  <div
                    className="cards mx-2"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                  >
                    <img src={ele.image} alt="image" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {trendingNowMovie?.length > 0 && (
        <div>
          <h5 className="text-white ms-5 my-3 fs-4">Trending Now</h5>
          <div className="mx-5">
            {trendingNowMovie.length > 5 ? (
              <Slider className="" {...settings}>
                {trendingNowMovie?.map((ele, ind) => (
                  <div
                    className="cards"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                  >
                    <div className="w-25">
                      <img src={ele.image} alt="image" />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="d-flex">
                {trendingNowMovie?.map((ele, ind) => (
                  <div
                    className="cards mx-2"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                  >
                    <div className="w-25">
                      <img src={ele.image} alt="image" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Newpopular;
