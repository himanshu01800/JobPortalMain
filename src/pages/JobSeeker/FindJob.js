import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JCustomModel from './JCustomModel';
import { getJobSeekerProfile } from '../../features/profileDetailSlice';
import { jwtDecode } from 'jwt-decode';

const FindJob = () => {
    const { jobs } = useSelector((state) => state.JobsDetail);
    const { user } = useSelector((state) => state.userDetail);
    const { profile } = useSelector((state) => state.profileDetail);
    const [showpopup, Setshowpopup] = useState(false);
    const [id, setId] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");

    const applyJob = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:8080/jobseeker/${profile.id}/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Called");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${response.statusText}, ${errorText}`);
            }

            const userid = jwtDecode(token).id;
            dispatch(getJobSeekerProfile(userid));

            // Set the success message
            setSuccessMessage('Job application submitted successfully!');

            // Clear the message after a few seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return response;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <>
            {showpopup ? (
                <JCustomModel
                    id={id}
                    Setshowpopup={Setshowpopup}
                />
            ) : (
                <div className="AdminHome">
                    <div className="page-content Adhomecon" id="content">
                        {/* Display success message */}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <div>
                            {jobs && jobs.map((items) => (
                                <div key={items.id} className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Position - {items.position}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Location - {items.location}</h6>
                                        <p className="card-text">Experience - {items.experince} Years</p>
                                        <button onClick={() => [setId(items.id), Setshowpopup(true)]} className="card-link">View Details</button>
                                        <button onClick={() => applyJob(items.id)} className="card-link">Apply</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FindJob;
