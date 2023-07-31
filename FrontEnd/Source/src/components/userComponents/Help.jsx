import React from "react";

const Help = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div>
        <div className="text-center text-white display-5 fw-bold mt-5">
          Help Center
        </div>
        <div className="bg-light w-full">
          <div className="m-3 ">
            <h2 className="pt-4">Hi, {user.userName}</h2>
            <p>Recommended for you</p>
          </div>
          <div
            className="horizonal_line"
            style={{ backgroundColor: "black", margin: "2rem 0rem" }}
          ></div>
          <div className="d-flex">
            <div className="m-3 p-2">
              <div>
                <h4>Manage my account</h4>
                <p>Plans and Pricing</p>
                <p>
                  I received an email stating there was a new sign-in to my
                  account
                </p>
                <p>How to change your plan</p>
              </div>
              <div className="mt-4 p-2">
                <h4>Manage my account</h4>
                <p>Plans and Pricing</p>
                <p>
                  I received an email stating there was a new sign-in to my
                  account
                </p>
                <p>How to change your plan</p>
              </div>
            </div>
            <div className="m-3 p-2">
              <div>
                <h4>Can't Watch</h4>
                <p>Plans and Pricing</p>
                <p>
                  I received an email stating there was a new sign-in to my
                  account
                </p>
                <p>How to change your plan</p>
              </div>
              <div className="mt-4">
                <h4>Manage my account</h4>
                <p>Plans and Pricing</p>
                <p>
                  I received an email stating there was a new sign-in to my
                  account
                </p>
                <p>How to change your plan</p>
              </div>
            </div>
            <div className="m-3 p-2">
              <div>
                <h4>Quick Links</h4>
                <p>Request TV shows or movies</p>
                <p>Update email</p>
                <p>Update password</p>
                <p>Update payment method</p>
                <p>Cancel amount</p>
                <p>Review payment history</p>
                <p>Content Grievances in India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
