import React, { useEffect, useState } from 'react';
import Chat from './Chat'; // Import your Chat component

const ProfileMatch = () => {
  const [jobseekers, setJobSeekers] = useState([]);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const getJobseekers = async () => {
      try {
        console.log('Fetching job seekers...');
        console.log('Token:', token);

        const response = await fetch("http://localhost:8080/company/getjobseekers", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorMessage}`);
        }

        const result = await response.json();
        console.log('Job seekers data:', result);
        setJobSeekers(result);
      } catch (error) {
        console.error('Error fetching job seekers:', error);
      }
    };

    getJobseekers();
  }, [token]);

  const handleChatClick = (jobseeker) => {
    setSelectedJobSeeker(jobseeker);
    setIsChatVisible(true);
  };

  const handleBack = () => {
    setIsChatVisible(false);
    setSelectedJobSeeker(null);
  };

  return (
    <div className='text-black'>
      <h1>Profile Match</h1>
      {isChatVisible ? (
        <Chat jobseeker={selectedJobSeeker} onBack={handleBack} />
      ) : (
        jobseekers.map((item) => (
          <div key={item.id} className="card">
            <div className="card-body">
              <h5 className="card-title">Name - {item.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Email - {item.email}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Skills - {item.skills}</h6>

              <button className="card-link" onClick={() => handleChatClick(item)}>
                Chat
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileMatch;
