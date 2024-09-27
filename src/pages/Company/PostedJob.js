import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ECustomModel from './ECustomModel';
import { getJobs, removeJob } from '../../features/jobDetailSlice';
import { getEmployerProfile } from '../../features/profileDetailSlice';
import { jwtDecode } from 'jwt-decode';

const PostedJobs = () => {
  const profile = useSelector((state) => state.profileDetail.profile);
  const jobs = profile?.jobs || []; // Safeguard against null profile
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState('');
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Fetch the token on mount
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id); // Set the user ID from the token
    }
  }, []);

  const handleRemove = async (jobId) => {
    const confirmed = window.confirm("Do you want to delete this job?"); // Confirmation dialog
    if (confirmed) {
      await dispatch(removeJob(jobId)); // First, remove the job
      console.log('Job removed');

      await dispatch(getEmployerProfile(userId)); // Then fetch the updated profile
      console.log('Profile updated');

      await dispatch(getJobs()); // Finally, fetch the updated jobs
      console.log('Jobs updated');

      // Set success message and clear it after 2 seconds
      setSuccessMessage("Job deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
  };

  return (
    <>
      {showPopup ? (
        <ECustomModel id={id} setShowPopup={setShowPopup} />
      ) : (
        <div className="AdminHome">
          <div className="page-content Adhomecon" id="content">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <div>
              {jobs.map((item) => (
                <div key={item.id} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Position - {item.position}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Location - {item.location}</h6>
                    <p className="card-text">Experience - {item.experience} Year</p>
                    <button onClick={() => [setId(item.id), setShowPopup(true)]} className="card-link">
                      View Details
                    </button>
                    <button onClick={() => handleRemove(item.id)} className="card-link">
                      Remove Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostedJobs;
