import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Front_page = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // const foundUser = JSON.parse(loggedInUser);
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <>
      <div>
        <div className="ms-5  text-white  bg-image ms-2  front_page_background_image">
          <div className="ms-5 ps-4  w-100 pb-5 ">
            <p
              className="fw-bold ms-5 "
              style={{ paddingTop: "220px", fontSize: "46px" }}
            >
              Unlimited Movies, TV s and more
            </p>
            <p className="fs-5 ms-5">Watch anywhare. Cancel anytime</p>
            <p className="pt-3 fs-5 ms-5">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="d-flex ms-5 pb-5">
              {/* <input
                type="text"
                className="bg-none p-1 text-white"
                placeholder="Email Address"
                name="userEmail"
                style={{
                  background: "transparent",
                  fontWeight: "bold",
                  border: "1px solid gray",
                }}
              ></input> */}
              <button
                type="button"
                className="fw-bold btn btn-danger p-2 px-5 text-white fs-5 "
              >
                <Link to="/SignUp" className="text-decoration-none text-white">
                  Get Started
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div
          className=" d-flex  justify-content-center p-5 "
          style={{ marginTop: "190px" }}
        >
          <div className="d-flex  flex-row   justify-content-between align-items-center ps-2  py-3 text-white">
            <div className="pe-4">
              <p className="fs-3 fw-bold ">Enjoy on your TV</p>
              <p>
                Watch on smart TV, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more.
              </p>
            </div>
            <div className="mx-5  d-none d-md-block">
              <img
                src="https://t4.ftcdn.net/jpg/04/33/09/25/240_F_433092533_6yA8KufgoMuiRoSxYLmL9KXfD1klO8CL.jpg"
                alt="..."
                width="100%"
                height="200px"
              />
            </div>
          </div>
        </div>
        <div className="horizonal_line" />
        <div className=" d-flex  justify-content-center p-5">
          <div className="d-flex  justify-content-between align-items-center  text-white">
            <div className="mx-5  d-none d-md-block">
              <img
                src="https://t4.ftcdn.net/jpg/03/88/28/09/240_F_388280980_m3cM90Reol12o34WTVLl87HteezWZezB.jpg"
                alt="..."
                width="300px"
                height="200px"
              />
            </div>
            <div className=" pe-4">
              <p className="fs-3 fw-bold ">Watch everywhere</p>
              <p>
                Stream Unlimited movies and TV s on your phone, tablet, laptop,
                and TV.
              </p>
            </div>
          </div>
        </div>
        <div className="horizonal_line" />
        <div className=" d-flex  justify-content-center p-5">
          <div className="d-flex justify-content-between align-items-center text-white">
            <div className="pe-2 ">
              <p className="fs-3  fw-bold ">Create profile for Kids</p>
              <p>
                Send children on adventures with there favourite characters in a
                space made just for them-free with your membership.
              </p>
            </div>
            <div className="mx-2  d-none d-md-block">
              <img
                src="https://t4.ftcdn.net/jpg/04/71/79/29/240_F_471792969_ijZyg1Vvyr48fIpXorctMTkSiuN2UYzm.jpg"
                alt="..."
                width="300px"
                height="200px"
              />
            </div>
          </div>
        </div>
        <div className="horizonal_line" />
        <div className=" d-flex justify-content-center p-5">
          <div className="d-flex justify-content-between align-items-center   text-white">
            <div className="mx-5   d-none d-md-block">
              <img
                src="https://t3.ftcdn.net/jpg/01/58/73/90/240_F_158739054_HCLkZaMcebEGaAVseiRxU0VMmkmoeXXl.jpg"
                alt="..."
                width="300px"
                height="200px"
              />
            </div>
            <div className="pe-4">
              <p className="fs-3 fw-bold ">
                Download your shows to watch offline
              </p>
              <p>
                Save your favourites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="front_page_accordion d-none d-md-block  pt-5 pb-5">
        <h1 className="text-white ms-5 px-5">Frequenty Asked Questions</h1>
        <div className="accordion " id="accordionExample">
          <div className="accordion-item m-3 accordion-item-background ">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button accordion-item-background  "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is Netflix?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse accordion-item-background  collapse  "
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                n by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the ing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the , though the transition
                does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item m-3 accordion-item-background ">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button accordion-item-background collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                How much does Netflix cost?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse accordion-item-background  collapse  "
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                n by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the ing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the , though the transition
                does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item m-3 accordion-item-background ">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button accordion-item-background collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                Where can I watch?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse accordion-item-background  collapse  "
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                n by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the ing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the , though the transition
                does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item m-3 accordion-item-background ">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button accordion-item-background collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
              >
                How do I cancel?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse accordion-item-background  collapse  "
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                n by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the ing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the , though the transition
                does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item m-3 accordion-item-background ">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button accordion-item-background collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="true"
                aria-controls="collapseFive"
              >
                What can I watch on Netflix?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse accordion-item-background  collapse  "
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                n by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the ing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the , though the transition
                does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item m-3 accordion-item-background ">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button accordion-item-background collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="true"
                aria-controls="collapseSix"
              >
                Is Netflix is good for kids?
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse accordion-item-background  collapse  "
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                n by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the ing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the , though the transition
                does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none d-md-block text-white textForMembership pt-4 ">
        <div className="">
          Ready to Watch? Enter your email to create or restart your membership.
        </div>
        <div className="d-flex py-3">
          <button
            type="button"
            className="fw-bold ms-2 btn btn-danger  px-3 text-white fs-5"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="footer ps-5 ms-5  py-5 mt-5 text-muted">
        <div>
          <p>
            Questions? Call{" "}
            <span className="text-underline">
              <u>000-800-919-1694</u>
            </span>
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 pt-4 mb-md-0">
            <ul className="list-unstyled mb-0 ">
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  FAQ
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Media Center
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Ways to Watch
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Cookie Preferences
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Speed Test
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pt-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Help Center
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Investor Relations
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted">
                  Terms of Use
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Corporate Information
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Legal Notices
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pt-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Account
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Jobs
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Privacy
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Contact Us
                </a>
              </li>
              <li className="py-1">
                <a href="#!" className="text-muted ">
                  Only on Netflix
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="d-none d-md-block dropdown py-3"
        style={{ paddingLeft: "320px" }}
      >
        <button
          className="btn bg-transparent text-white border border-white  dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          English
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Hindi
            </a>
          </li>
        </ul>
        <div className="py-4">
          <p className="text-muted">Netflix India</p>
        </div>
      </div>
    </>
  );
};

export default Front_page;
