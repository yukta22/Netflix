import React from "react";

const Footer = () => {
  return (
    <>
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
              <li>
                <p className="text-muted ">FAQ</p>
              </li>
              <li>
                <p className="text-muted ">Media Center</p>
              </li>
              <li>
                <p className="text-muted ">Ways to Watch</p>
              </li>
              <li>
                <p className="text-muted ">Cookie Preferences</p>
              </li>
              <li>
                <p className="text-muted ">Speed Test</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pt-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-muted ">Help Center</p>
              </li>
              <li>
                <p className="text-muted ">Investor Relations</p>
              </li>
              <li>
                <p className="text-muted">Terms of Use</p>
              </li>
              <li>
                <p className="text-muted ">Corporate Information</p>
              </li>
              <li>
                <p className="text-muted ">Legal Notices</p>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 pt-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li className="">
                <p className="text-muted ">Account</p>
              </li>
              <li className="">
                <p className="text-muted ">Jobs</p>
              </li>
              <li className="">
                <p className="text-muted ">Privacy</p>
              </li>
              <li className="">
                <p className="text-muted ">Contact Us</p>
              </li>
              <li className="">
                <p className="text-muted ">Only on Netflix</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="d-none d-md-block dropdown ps-5">
        <div className="py-5 ms-5">
          <p className="text-muted">Netflix India</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
