import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './CompanyLayout.css'; // Assuming you have your custom CSS in this file
import { getEmployerProfile } from "../../features/profileDetailSlice";

const CompanyLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState();
  const { profile } = useSelector((state) => state.profileDetail) || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
      dispatch(getEmployerProfile(id));
      fetchProfileImage(id);
    }
  }, [id, dispatch]);

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

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate('/');
  };

  const checkProfileCompletion = (e, link) => {
    if (!profile || Object.keys(profile).length === 0) {
      e.preventDefault();
      setShowPopup(true);
    } else {
      navigate(link);
    }
  };

  const redirectToMyAccount = () => {
    setShowPopup(false);
    navigate('/company/companyAccount');
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
                  width="100px"
                  height="100px"
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
                <button onClick={() => navigate('/company/companyAccount')}>My Account</button>
              </div>
              <div className="text-center my-1 border">
                <button onClick={(e) => checkProfileCompletion(e, '/company/postNewJob')}>Post New Job</button>
              </div>
              <div className="text-center my-1 border">
                <button onClick={(e) => checkProfileCompletion(e, '/company/profilematch')}>Profile Match</button>
              </div>
              <div className="text-center my-1 border">
                <button onClick={(e) => checkProfileCompletion(e, '/company/postedjob')}>Posted Job</button>
              </div>
              <div className="text-center my-1 border">
                <button onClick={(e) => checkProfileCompletion(e, '/company/changepassword')}>Change Password</button>
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
              <button onClick={handleLogout} className="btn btn-link">Log Out</button>
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
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Your profile is incomplete. Please complete your profile before proceeding.</p>
            <button onClick={redirectToMyAccount} className="btn btn-primary">Complete Profile</button>
            <button onClick={() => setShowPopup(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLayout;
