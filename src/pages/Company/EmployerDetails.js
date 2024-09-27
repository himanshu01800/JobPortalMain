import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployerProfile } from '../../features/profileDetailSlice';
import { jwtDecode } from 'jwt-decode';

function EmployerDetail() {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const { profile } = useSelector((state) => state.profileDetail) || {};
  const [formData, setFormData] = useState({
    webSiteUrl: '',
    address: '',
    description: '',
    established: 0,
  });
  
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const Decoded = jwtDecode(token);
    setId(Decoded.id);

    if (profile) {
      setFormData({
        webSiteUrl: profile.webSiteUrl,
        address: profile.address,
        description: profile.description,
        established: profile.established,
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
    dispatch(postEmployerProfile({ id, formData }))
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
            <h1>Contact Information</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="webSiteUrl">Website URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="webSiteUrl"
                  name="webSiteUrl"
                  value={formData.webSiteUrl}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="established">Established (year):</label>
                <input
                  type="number"
                  className="form-control"
                  id="established"
                  name="established"
                  value={formData.established}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary ms-5 mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDetail;
