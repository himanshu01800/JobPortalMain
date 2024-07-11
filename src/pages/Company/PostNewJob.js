import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployerProfile } from '../../features/profileDetailSlice';
import { getJobs } from '../../features/jobDetailSlice';

const PostNewJob = () => {
    const { id } = useSelector((state) => state.profileDetail.profile) || {};
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        position: '',
        location: '',
        experience: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Assuming the JWT is stored in local storage with key 'jwt'
        try {
            const response = await fetch(`http://localhost:8080/company/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                dispatch(getEmployerProfile(id));
                dispatch(getJobs());
                // Handle success
            } else {
                console.error('Error:', response.statusText);
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className="container mt-2 text-black d-flex flex-column align-items-center">
            <h2>Post New Job</h2>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default PostNewJob;
