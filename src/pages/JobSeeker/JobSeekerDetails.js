import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postJobSeekerProfile } from '../../features/profileDetailSlice';
import { jwtDecode } from 'jwt-decode';

function JobSeekerDetails() {
  const dispatch = useDispatch();
    const [id,setID]=useState();
  const { profile } = useSelector((state) => state.profileDetail);

  const [formData, setFormData] = useState({
    resumeLink: '',
    skills: '',
  });
  useEffect(()=>{
    const token=localStorage.getItem("jwtToken");
    if(token){
      const decode=jwtDecode(token);
      setID(decode.id);
     
    }
  },[])


  useEffect(() => {
    if (profile) {
      setFormData({
        resumeLink: profile.resumeLink || '',
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
    dispatch(postJobSeekerProfile({ id, formData }));
  };

  return (
    <div className="h-100 w-100 text-black">
      <div className="page-content" id="content">
        <div className="d-flex justify-content-center vh-100">
          <div className="col-10">
            <h1>Job Seeker Information</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="resumeLink">Resume Link:</label>
                <input
                  type="url"
                  className="form-control"
                  id="resumeLink"
                  name="resumeLink"
                  value={formData.resumeLink}
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
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerDetails;
