import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readJobs } from '../../features/jobDetailSlice';

import { readUsers } from '../../features/userDetailSlice';
import ACustomModel from './ACustomModel';


const JobSeekerDetailsA = () => {
    const dispatch=useDispatch();
    const [showpopup,Setshowpopup]=useState(false);
    const [id,Setid]=useState();
    const[jobseeker,setAllJobSeeker]=useState([]);
    const {users,loading}=  useSelector((state)=>state.userListDetail)
    useEffect(() => {
        if (users) {
            const jobseeker = users.filter(user => user.role === 'jobseeker');
            setAllJobSeeker(jobseeker);
        }
    }, [users]);
    if(loading){
        return(
            <div className="AdminHome">
          
          <div className="page-content   Adhomecon" id="content">
            <h1 className="">Loding....</h1>
            </div>
            </div>
        )
    }
  return (
    <>
    { showpopup ? <ACustomModel
    id={id}
     Setshowpopup={Setshowpopup}
    /> :
    <div className="AdminHome">
  <div className="page-content   Adhomecon" id="content">
    <div className=' ' >
        {jobseeker && jobseeker.map((items)=>(
        <div  key ={items.id}class="card " >
        <div class="card-body">
          <h5 class="card-title">{items.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{items.email}</h6>
          <p class="card-text">{items.role}</p>
          <button  onClick={()=>[Setid(items.id),Setshowpopup(true)] }  class="card-link">View Details</button>
          <a href="#" class="card-link">Remove User</a>
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

export default JobSeekerDetailsA
