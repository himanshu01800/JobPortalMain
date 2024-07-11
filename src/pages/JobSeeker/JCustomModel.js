import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const JCustomModel = ( {id,Setshowpopup}) => {

  const allJobs =useSelector((state)=> state.JobsDetail.jobs )
  console.log(allJobs);
  const singleJob= allJobs.filter((ele)=> ele.id===id);
  console.log(singleJob);
  const nav=useNavigate();
 
  
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="w-100 d-flex justify-content-end">
      <button onClick={()=> Setshowpopup(false)} type="button " class="close " aria-label="Close">
     <span aria-hidden="true">&times;</span>
     </button>
     </div>
     <div className="d-flex flex-column align-items-center h-75 mt-4 justify-content-evenly text-dark">
         <p>JobTitle: {singleJob[0].position}</p>
          <p>Location: {singleJob[0].location}</p>
          <p>Experince: {singleJob[0].experience}</p>
          <p>Job Description: {singleJob[0].description}</p>
        
       
    </div>
    <div className="w-100 d-flex justify-content-center mt-3">
    <button className=" btn btn-primary w-50">Apply Job</button>
    </div>
    

      </div>
    </div>
  );
};

export default JCustomModel;