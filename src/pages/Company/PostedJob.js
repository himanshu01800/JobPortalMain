import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import ECustomModel from './ECustomModel';

const PostedJobs = () => {
   

  const profile= useSelector((state)=>state.profileDetail.profile)
  const jobs=profile.jobs;
    const [showpopup,Setshowpopup]=useState(false);
    const [id,setId]=useState("");
    
   
  return (
    <>
    { showpopup ? <ECustomModel
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
          <button  class="card-link">RemoveJob</button>
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

export default PostedJobs
