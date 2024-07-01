import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CustomModel = ( {id,Setshowpopup}) => {

  const allJobs =useSelector((state)=> state.profileDetail.profile.jobs )
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
     <div className="d-flex flex-column align-items-center h-75 mt-4 justify-content-evenly text-black">
         <p>Job Title: {singleJob[0].position}</p>
          <p>Location: {singleJob[0].location}</p>
          <p>Description: {singleJob[0].description}</p>
          <p>Experience: {singleJob[0].experience}</p>
  
       
    </div>
    <div className="w-100 d-flex justify-content-center mt-3">
    <button className=" btn btn-primary w-50">Remove Job</button>
    </div>
    

      </div>
    </div>
  );
};

export default CustomModel;