import React, { useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowInfo from "./ShowInfo";

const Showsitem = ({ data }) => {
  // console.log(data);
  const [flag, setFlag] = useState(false);
  const [showData, setShowData] = useState();

  const newReleaseMovie = data?.filter((e) => e.typeOfMovie == "New Releases");
  const trendingNowMovie = data?.filter((e) => e.typeOfMovie == "Trending Now");
  const Thriller = data?.filter((e) =>
    e.genre?.toLowerCase().includes("thriller")
  );
  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleShowInfo = async (ele) => {
    // console.log("asdqwe");
    setFlag(true);
    setShowData(ele);
  };

  return (
    <div className="m-2 py-4 ">
      {flag && (
        <div
          className="position-absolute bottom-0 top-0 pt-3 left-50 rounded mb-3"
          style={{ zIndex: 1 }}
        >
          <ShowInfo showData={showData} setFlag={setFlag} />
        </div>
      )}
      {newReleaseMovie?.length > 0 && (
        <div>
          <h5 className="text-white ms-2">New Release</h5>
          <div className="">
            <Slider className="" {...settings}>
              {newReleaseMovie?.map((ele, ind) => (
                <div
                  className="cards"
                  key={crypto.randomUUID()}
                  onClick={() => handleShowInfo(ele)}
                >
                  <img src={ele.image} alt="image" />
                  <div className="moviecard">
                    <img src={ele.image} alt="image" />
                    <div className="d-flex p-1">
                      <button className="">Play</button>

                      <button className="">Watch now</button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
      {trendingNowMovie?.length > 0 && (
        <div>
          <h5 className="text-white ms-2">Trending Now</h5>
          <div className="">
            <Slider className="" {...settings}>
              {trendingNowMovie?.map((ele, ind) => (
                <div
                  className="cards"
                  key={crypto.randomUUID()}
                  onClick={() => handleShowInfo(ele)}
                >
                  <div className="w-25">
                    <img src={ele.image} alt="image" />
                  </div>
                  {/* <div className="moviecard" >
                  <img src={ele.image} alt="image" className="home-image" />
                  <div className="d-flex p-1">
                    <button className="rounded-3 col-10">Play</button>

                    <button className="btn btn-secondary ms-1 col-2">
                      Watch now
                    </button>
                  </div>
                </div> */}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
      {Thriller?.length > 0 && (
        <div>
          <h5 className="text-white ms-2">Thriller Movie</h5>
          <div className="">
            <Slider className="" {...settings}>
              {Thriller?.map((ele, ind) => (
                <div
                  className="cards"
                  key={crypto.randomUUID()}
                  onClick={() => handleShowInfo(ele)}
                >
                  <div className="w-25">
                    <img src={ele.image} alt="image" />
                  </div>
                  {/* <div className="moviecard" >
                  <img src={ele.image} alt="image" className="home-image" />
                  <div className="d-flex p-1">
                    <button className="rounded-3 col-10">Play</button>

                    <button className="btn btn-secondary ms-1 col-2">
                      Watch now
                    </button>
                  </div>
                </div> */}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};
export default Showsitem;
