import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { getJobs, removeJob } from '../../features/jobDetailSlice';
import { getEmployerProfile } from '../../features/profileDetailSlice';
import JCustomModel from './JCustomModel';

const AppliedJobs = () => {
   

  const profile= useSelector((state)=>state.profileDetail.profile)
  const jobs=profile.appliedJobs;
  const dispatch=useDispatch();
    const [showpopup,Setshowpopup]=useState(false);
    const [id,setId]=useState("");
    
    
   
  return (
    <>
    { showpopup ? <JCustomModel
     id={id}
     Setshowpopup={Setshowpopup}
    /> :
    <div className="AdminHome">

  
  <div className="page-content   Adhomecon" id="content">
    <div className=' ' >
        {jobs && jobs.map((items)=>(
        <div key={items.id} class="card " >
        <div class="card-body">
          <h5 class="card-title">{items.position}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{items.location}</h6>
          <p class="card-text">{items.experince}</p>
          <button  onClick={()=>[setId(items.id),Setshowpopup(true)] }  class="card-link">View Details</button>
          
        </div>
      </div>
        ))}
        

    </div>
    </div>
    </div>
}
    </>
    
  )
}

export default AppliedJobs
