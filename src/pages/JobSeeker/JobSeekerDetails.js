import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postJobSeekerProfile } from '../../features/profileDetailSlice';
import { jwtDecode } from 'jwt-decode';

function JobSeekerDetails() {
  const dispatch = useDispatch();
  const [id, setID] = useState();
  const { profile } = useSelector((state) => state.profileDetail);
  const [formData, setFormData] = useState({
    resume: '',
    skills: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decode = jwtDecode(token);
      setID(decode.id);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      console.log(profile);
      setFormData({
        resume: profile.resume || '',
        skills: profile.skills || '',
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postJobSeekerProfile({ id, formData }))
      .then(() => {
        setSuccessMessage('Profile updated successfully!');
        // Clear the message after a few seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        // Handle error if needed
      });
  };

  return (
    <div className="h-100 w-100 text-black">
      <div className="page-content" id="content">
        <div className="d-flex justify-content-center vh-100">
          <div className="col-10">
            <h1>Job Seeker Information</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="resume">Resume Link:</label>
                <input
                  type="url"
                  className="form-control"
                  id="resume"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills">Skills:</label>
                <textarea
                  className="form-control"
                  id="skills"
                  name="skills"
                  rows="4"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary ms-5 mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerDetails;
