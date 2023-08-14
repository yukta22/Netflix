import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [data, setData] = useState();
  const [deleteflag, setDeleteflag] = useState(false);
  const [pageno, setPageno] = useState(1);
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("/subscriptions", {
        headers: {
          pageno: pageno,
        },
      })
      .then((response) => {
        setData(response.data);
      });
  }, [deleteflag, pageno]);
  // console.log(data);

  const handleEdit = async (ele) => {
    // console.log(ele);
    navigate("/admin/updateUser", { state: ele });
  };

  const handleDelete = async (id) => {
    let text = "Are you sure you want to delete?";
    if (confirm(text) == true) {
      setDeleteflag(true);
      const res = await axios.delete(`/subscriptions/${id}`, {
        headers: {
          token: token,
          pageno: pageno,
        },
      });
      console.log(res);
      setDeleteflag(false);
    } else {
      text = "You canceled!";
    }
  };

  const prevPage = () => {
    if (pageno == 1) {
      setBtn(false);
    }
    if (pageno <= 1) {
      setPageno(1);
    } else {
      setPageno(pageno - 1);
    }
  };
  const nextPage = () => {
    const len = data?.length;
    if (data?.length > 4) {
      // setBtn(false);
      setPageno(pageno + 1);
    } else {
      // setBtn(true);
    }
    // console.log(btn);
  };

  return (
    <>
      <AdminNavbar />
      <div className="m-5 ">
        <div className="mx-5 p-2 px-4 ">
          <div
            className="horizonal_line"
            style={{
              backgroundColor: "rgb(202, 209, 222)",
              margin: "1px 1px",
              height: "1px",
            }}
          ></div>
          <div style={{ height: "550px" }}>
            <table className="text-white  table">
              <thead>
                <tr className="fw-bold ">
                  <td className="text-center py-3 ">User Name</td>
                  <td className="text-center py-3 ">User Email</td>
                  <td className="text-center py-3">Buy Plan</td>
                  <td className="text-center py-3">Expire Plan</td>
                  <td className="text-center py-3">Plan Name</td>
                  <td className="text-center py-3">Update</td>
                  <td className="text-center py-3">Delete</td>
                </tr>
              </thead>
              <tbody>
                {data?.map((ele) => {
                  return (
                    <tr key={ele._id}>
                      <td className="py-4">{ele.user?.userName}</td>
                      <td className="py-4">{ele.user?.userEmail}</td>
                      <td className="py-4">
                        {dateFormat(new Date(ele.startDate), "mmmm dS, yyyy")}
                      </td>
                      <td className="py-4">
                        {dateFormat(new Date(ele.endDate), "mmmm dS, yyyy")}
                      </td>
                      <td className="py-4">{ele.plan?.name}</td>
                      <td
                        className="text-center py-4"
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className=""
                          onClick={() => handleEdit(ele)}
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#008040",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </td>
                      <td
                        className="text-center py-4"
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className=""
                          onClick={() => handleDelete(ele._id)}
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#e63900",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mx-auto pb-4 pagination">
            <button
              type="button"
              className="btn btn-primary m-2 text-white px-3 rounded"
              onClick={prevPage}
            >
              Prev
            </button>
            <div className="m-2 my-3 text-white">{pageno}</div>
            <button
              type="button"
              className="btn btn-primary m-2 text-white px-3 rounded"
              disabled={btn}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
