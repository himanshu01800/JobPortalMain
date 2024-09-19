import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ECustomModel from './ECustomModel';
import { getJobs, removeJob } from '../../features/jobDetailSlice';
import { getEmployerProfile } from '../../features/profileDetailSlice';

const PostedJobs = () => {
  const profile = useSelector((state) => state.profileDetail.profile);
  const jobs = profile?.jobs || []; // Safeguard against null profile
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState('');

  const handleRemove = async (id) => {
    await dispatch(removeJob(id)); // First, remove the job
    console.log('Job removed');

    await dispatch(getEmployerProfile(profile.id)); // Then fetch the updated profile
    console.log('Profile updated');

    await dispatch(getJobs()); // Finally, fetch the updated jobs
    console.log('Jobs updated');
  };

  return (
    <>
      {showPopup ? (
        <ECustomModel id={id} setShowPopup={setShowPopup} />
      ) : (
        <div className="AdminHome">
          <div className="page-content Adhomecon" id="content">
            <div>
              {jobs.map((item) => (
                <div key={item.id} className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.position}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.location}</h6>
                    <p className="card-text">{item.experience}</p>
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
