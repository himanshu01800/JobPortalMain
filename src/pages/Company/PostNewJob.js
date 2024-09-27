import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployerProfile } from '../../features/profileDetailSlice';
import { getJobs } from '../../features/jobDetailSlice';
import { jwtDecode } from 'jwt-decode';

const PostNewJob = () => {
    const profile = useSelector((state) => state.profileDetail.profile);
    const dispatch = useDispatch();

    const [userid, setUserId] = useState("");
    const [formData, setFormData] = useState({
        position: '',
        location: '',
        experience: '',
        description: ''
    });
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Fetch the token on mount
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id); // Set the user ID from the token
        }
    }, []); // This effect runs once on mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token || !userid) {
                console.error('Token or user ID missing');
                return; // Exit if there's no token or userid
            }

            const response = await fetch(`http://localhost:8080/company/${profile?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token in header
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);

                // Dispatch actions to update profile and jobs after job is posted
                await dispatch(getEmployerProfile(userid));
                console.log(userid + " is the user id");
                await dispatch(getJobs());

                // Set success message and clear it after 1 second
                setSuccessMessage("Job posted successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 1000);

                // Reset form after successful submission
                setFormData({
                    position: '',
                    location: '',
                    experience: '',
                    description: ''
                });
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-2 text-black d-flex flex-column align-items-center">
            <h2>Post New Job</h2>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-100">
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="position" 
                        name="position" 
                        placeholder="Enter position" 
                        value={formData.position} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="location" 
                        name="location" 
                        placeholder="Enter location" 
                        value={formData.location} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="experience">Experience</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="experience" 
                        name="experience" 
                        placeholder="Enter experience in years" 
                        value={formData.experience} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Job Details</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        rows="3" 
                        placeholder="Enter job details" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="btn btn-primary ms-5 mt-3">Submit</button>
            </form>
        </div>
    );
};

export default PostNewJob;
