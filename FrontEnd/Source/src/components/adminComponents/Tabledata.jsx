import React from "react";

const Tabledata = ({ data }) => {
  // console.log(data);
  return (
    <div className="px-4">
      <div
        className="horizonal_line"
        style={{
          backgroundColor: "rgb(202, 209, 222)",
          margin: "1px 1px",
          height: "1px",
        }}
      ></div>
      <table className="text-white  table">
        <thead>
          <tr className="fw-bold">
            <td>Title</td>
            <td>Genre</td>
          </tr>
        </thead>
        <tbody>
          {data?.slice(0, 5).map((ele) => {
            return (
              <tr key={ele._id}>
                <td>{ele.title}</td>
                <td>{ele.genre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tabledata;
