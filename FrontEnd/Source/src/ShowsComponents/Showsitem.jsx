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
  const [selected, setSelected] = useState(false);

  const newReleaseMovie = data?.filter((e) => e.typeOfMovie == "New Releases");
  const trendingNowMovie = data?.filter((e) => e.typeOfMovie == "Trending Now");
  const Thriller = data?.filter((e) =>
    e.genre?.toLowerCase().includes("thriller")
  );
  const Comedy = data?.filter(
    (e) =>
      e.genre?.toLowerCase().includes("comedy") ||
      e.genre?.toLowerCase().includes("romance")
  );

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

  const handleShowInfo = async (ele) => {
    // console.log(ele);
    setSelected(ele._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <h5 className="text-white ms-5 mb-3 fs-4">New Release</h5>
          <div className="mx-4">
            {newReleaseMovie?.length > 5 ? (
              <Slider className="items" {...settings}>
                {newReleaseMovie?.map((ele, ind) => (
                  <div
                    className="cards "
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                  >
                    <img
                      src={ele.image}
                      alt="image"
                      style={{
                        border:
                          `${ele._id}` == `${selected}`
                            ? "3px solid red"
                            : "none",
                      }}
                    />
                    {/* <div className="moviecard">
                      <img src={ele.image} alt="image" />
                    </div> */}
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
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid red"
                          : "none",
                    }}
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
          <div className="mx-4">
            {trendingNowMovie.length > 5 ? (
              <Slider className="" {...settings}>
                {trendingNowMovie?.map((ele, ind) => (
                  <div
                    className="cards"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid red"
                          : "none",
                    }}
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
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid red"
                          : "none",
                    }}
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
      {Thriller?.length > 0 && (
        <div>
          <h5 className="text-white ms-5 my-3 fs-4">Thriller Movie</h5>
          <div className="mx-4">
            {Thriller.length > 5 ? (
              <Slider className="" {...settings}>
                {Thriller?.map((ele, ind) => (
                  <div
                    className="cards"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid red"
                          : "none",
                    }}
                  >
                    <div className="w-25">
                      <img src={ele.image} alt="image" />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="d-flex">
                {Thriller?.map((ele, ind) => (
                  <div
                    className="cards mx-2"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid red"
                          : "none",
                    }}
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
      {Comedy?.length > 0 && (
        <div>
          <h5 className="text-white ms-5 my-3 fs-4">Comedy Movie</h5>
          <div className="mx-4">
            {Comedy?.length > 5 ? (
              <Slider className="" {...settings}>
                {Comedy?.map((ele, ind) => (
                  <div
                    className="cards"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid red"
                          : "none",
                    }}
                  >
                    <div className="w-25">
                      <img src={ele.image} alt="image" />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="d-flex">
                {Comedy?.map((ele, ind) => (
                  <div
                    className="cards mx-2"
                    key={ele._id}
                    onClick={() => handleShowInfo(ele)}
                    style={{
                      border:
                        `${ele._id}` == `${selected}`
                          ? "3px solid red"
                          : "none",
                    }}
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
    </div>
  );
};
export default Showsitem;
