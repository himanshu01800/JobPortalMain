import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getJobSeekerProfile } from "../../features/profileDetailSlice";
import {jwtDecode} from "jwt-decode";

const JobseekerLayout = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate('/');
  };


  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      setId(decoded.id);
      setFirstName(decoded.firstName);
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getJobSeekerProfile(id));
      fetchProfileImage(id);
    }
  }, [id, dispatch]);

  const fetchProfileImage = async (userId) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`http://localhost:8080/${userId}/profileImage`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        setImageURL(URL.createObjectURL(blob));
      } else {
        console.error("Failed to fetch profile image");
      }
    } catch (error) {
      console.error("Error fetching profile image", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const token = localStorage.getItem('jwtToken');

      try {
        const response = await fetch(`http://localhost:8080/${id}/uploadProfileImage`, {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchProfileImage(id); // Fetch the updated image after upload
          setSelectedFile(null);
          event.target.reset(); // Clear the file input
          console.log("Profile image uploaded successfully");
        } else {
          console.error("Failed to upload profile image");
        }
      } catch (error) {
        console.error("Error uploading profile image", error);
      }
    }
  };

  return (
    <div className="full-screen">
      <div className="row full-screen">
        <div className="col col-3">
          <div className="col-3 d-flex-col bg-white border w-100 h-100">
            <div className="text-center border">
              <h6>Welcome {firstName}</h6>
            </div>
            <div className="container text-center">
              {imageURL ? (
                <img
                  src={imageURL}
                  className="img-fluid"
                  alt="Profile"
                  width="200px" // Increase the width
                  height="200px" // Increase the height
                />
              ) : (
                <div>No profile image</div>
              )}
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                {selectedFile && <button type="submit">Upload</button>}
              </form>
            </div>
            <div className="my-1 border">
              <div className="text-center my-1 border">
                <Link to="/jobseeker/Myaccount">My Account</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/jobseeker/findjob">Find Jobs</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/profileMatch">Profile Match</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/jobseeker/appliedjob">Applied Job</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/company/changepassword">Change Password</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col text-white col-5">
          <div className="scrollable-content">
            <Outlet />
          </div>
        </div>
        <div className="col col-3">
          <div className="w-100 d-flex-col bg-white border">
            <div className="text-center my-2 border">
            <div className="text-center my-2 border">
              <button onClick={handleLogout} className="btn btn-link">Log Out</button>
            </div>
            </div>
            <div className="text-center my-2 border">
              <Link to="#">My Message</Link>
            </div>
            <div className="text-center my-2 border">
              <Link to="#">My Inbox</Link>
            </div>
            <div className="text-center my-2 border">
              <Link to="#">My Sent</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerLayout;
