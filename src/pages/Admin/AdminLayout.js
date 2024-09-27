import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { readUsers } from "../../features/userListDetailSlice";
import { jwtDecode } from "jwt-decode";

const AdminLayout = () => {
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setId(decoded.id);
        setFirstName(decoded.firstName);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        dispatch(readUsers()).catch((error) => console.error("Error reading users:", error));
        fetchProfileImage(id);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [id, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate('/');
  };

  const fetchProfileImage = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/${userId}/profileImage`);
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

      try {
        const response = await fetch(`http://localhost:8080/${id}/uploadProfileImage`, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          fetchProfileImage(id);
          setSelectedFile(null);
          event.target.reset();
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
          <div className="col-3 d-flex-col bg-white w-100 h-100">
            <div className="text-center">
              <h6>Welcome {firstName}</h6>
            </div>
            <div className="container text-center">
              {imageURL ? (
                <img
                  src={imageURL}
                  className="img-fluid"
                  alt="Profile"
                  width="200px"
                  height="200px"
                />
              ) : (
                <div>No profile image</div>
              )}
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                {selectedFile && <button type="submit" className="btn btn-upload">Upload</button>}
              </form>
            </div>
            <div className="my-1">
              <div className="text-center my-1">
                <button className="btn" onClick={() => navigate('/jobseeker/Myaccount')}>My Account</button>
              </div>
              <div className="text-center my-1">
                <button className="btn" onClick={() => navigate('/admin/companyreport')}>Employers</button>
              </div>
              <div className="text-center my-1">
                <button className="btn" onClick={() => navigate('/admin/jobseekerreport')}>JobSeekers</button>
              </div>
              <div className="text-center my-1">
                <button className="btn" onClick={() => navigate('/jobseeker/appliedjob')}>Feedback</button>
              </div>
              <div className="text-center my-1">
                <button className="btn" onClick={() => navigate('/company/changepassword')}>Change Password</button>
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
          <div className="w-100 d-flex-col bg-white">
            <div className="text-center my-2">
              <button onClick={handleLogout} className="btn btn-logout">Log Out</button>
            </div>
            <div className="text-center my-2">
              <button onClick={() => navigate('/messages')} className="btn">My Messages</button>
            </div>
            <div className="text-center my-2">
              <button onClick={() => navigate('/inbox')} className="btn">My Inbox</button>
            </div>
            <div className="text-center my-2">
              <button onClick={() => navigate('/sent')} className="btn">My Sent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
