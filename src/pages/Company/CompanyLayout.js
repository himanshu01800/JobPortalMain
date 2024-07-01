import { Outlet, Link } from "react-router-dom";
import './CompanyLayout.css'; // Assuming you have your custom CSS in this file
import myself from "../image/My-self Photo (2).jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerProfile } from "../../features/profileDetailSlice";



const CompanyLayout = () => {
  const dispatch=useDispatch();

  const {id,firstName} = useSelector((state) => state.userDetail.user);


  const { profile, loading } = useSelector((state) => state.profileDetail) || {};
 

  useEffect(()=>{
    console.log("pp")
   console.log(id);
   dispatch(getEmployerProfile(id));
  },[])

  
  return (
    <div className="full-screen">
      <div className="row full-screen">
        <div className="col col-3">
          <div className="col-3 d-flex-col bg-white border w-100 h-100">
            <div className="text-center border">
              <h6>Welcome {firstName}</h6>
            </div>
            <div className="container text-center">
              <img
                className="img-fluid"
                src={myself}
                alt=""
                width="100px"
                height="100px"
              />
            </div>
            <div>
              <input type="file" />
            </div>
            <div className="my-1 border">
              <div className="text-center my-1 border">
                <Link to="/company/companyAccount">My Account</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/company/postNewJob">Post New Job</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/profileMatch">Profile Match</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/company/postedjob">Posted Job</Link>
              </div>
              <div className="text-center my-1 border">
                <Link to="/company/changepassword">Change Password</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col text-white col-5">
          <div className="scrollable-content">
            <Outlet />
          </div>
        </div>
        <div className="col col-3">
          <div className="w-100 d-flex-col bg-white border">
            <div className="text-center my-2 border">
              <Link to="/">Log Out</Link>
            </div>
            <div className="text-center my-2 border">
              <Link to="#">My Message</Link>
            </div>
            <div className="text-center my-2 border">
              <Link to="#">My Inbox</Link>
            </div>
            <div className="text-center my-2 border">
              <Link to="#">My Sent</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLayout;
