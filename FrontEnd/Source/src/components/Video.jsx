import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Video = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedQuality, setSelectedQuality] = useState("360p");
  const [videoUrl, setVideoUrl] = useState(state?.video_360p);
  const [flag, setFlag] = useState(false);
  const [qualityFlag, setQualityflag] = useState(false);
  const [post, setPost] = useState();

  // const user = useSelector((state) => state.login.user);
  // console.log(user);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:9000/subscriptions").then((response) => {
      setPost(response.data);
    });
  }, [selectedQuality]);

  let user = localStorage.getItem("user");
  user = user.substring(1, user.length - 1);

  const userSubscriptionData = post?.find((e) => e.user?.userEmail == user);
  // console.log(userSubscriptionData?.plan.name);
  const handleQualityChange = (e) => {
    console.log(selectedQuality);
    const quality = e.target.value;
    setSelectedQuality(quality);
    if (selectedQuality == "360p") {
      setVideoUrl(state?.video_360p);
    } else if (selectedQuality == "480p") {
      setVideoUrl(state?.video_480p);
    } else if (selectedQuality == "720p") {
      setVideoUrl(state?.video_720p);
    } else if (selectedQuality == "1080p") {
      setVideoUrl(state?.video_1080p);
    }
    setFlag(false);
    setQualityflag(false);
  };

  const handleSetting = () => {
    setFlag(!flag);
    setQualityflag(!qualityFlag);
  };
  // const handleQualitySetting = () => {
  //   setQualityflag(!qualityFlag);
  // };

  return (
    <>
      <div>
        <video
          src={videoUrl}
          controls
          style={{ width: "100%", height: "auto" }}
          className="position-relative"
        ></video>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-white position-absolute"
          style={{
            width: "30px",
            height: "30px",
            top: 964,
            right: 225,
            cursor: "pointer",
          }}
          onClick={handleSetting}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        {flag && (
          <div
            className="bg-dark text-white position-absolute"
            style={{ top: 800, right: 210 }}
            // onClick={handleQualitySetting}
          >
            <div className="d-flex  py-3 px-5" style={{ cursor: "pointer" }}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-white position-absolute"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="ps-5">Quality</div>
            </div>
            <div className="d-flex  py-3 px-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-white position-absolute"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>
              </div>
              <div className="ps-5">Report</div>
            </div>
            <div className="d-flex  py-3 px-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-white position-absolute"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
              <div className="ps-5">Help & feedback</div>
            </div>
          </div>
        )}
        {qualityFlag && (
          <select
            onChange={handleQualityChange}
            className="position-absolute bg-dark text-light"
            style={{
              top: 818,
              right: 240,
              border: "none",
              cursor: "pointer",
              width: "140px",
            }}
          >
            {(() => {
              if (userSubscriptionData?.plan.name == "Mobile") {
                return (
                  <>
                    <option value="select">Quality</option>
                    <option value="360p">360p</option>
                    <option value="480p">480p</option>
                  </>
                );
              } else if (userSubscriptionData?.plan.name == "Basic") {
                return (
                  <>
                    <option value="select">Quality</option>
                    <option value="360p">360p</option>
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                  </>
                );
              } else if (userSubscriptionData?.plan.name == "Standard") {
                return (
                  <>
                    <option value="select">Quality</option>
                    <option value="360p">360p</option>
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                  </>
                );
              } else if (userSubscriptionData?.plan.name == "Premium") {
                return (
                  <>
                    <option value="Quality">Quality</option>
                    <option value="360p">360p</option>
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="1080p">4k</option>
                  </>
                );
              }

              return null;
            })()}
          </select>
        )}
      </div>
    </>
  );
};

export default Video;
