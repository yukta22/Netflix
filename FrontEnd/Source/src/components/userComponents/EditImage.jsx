import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditImage = () => {
  const [file, setFile] = useState();
  console.log(file);
  const navigate = useNavigate();
  const navigateToManageProfile = () => {
    navigate("/home/profile-manage", { state: file });
  };

  return (
    <div>
      <div className="text-white m-5 w-50">
        <h1>Edit Profile Image</h1>
        <form className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            name="userProfile"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="button"
            className="btn btn-light text-dark px-4 mt-3"
            onClick={navigateToManageProfile}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditImage;
