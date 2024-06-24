import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here
    // if (userId === "admin@gmail.com") nav("/Adminpage");
    // else if (userId === "company@gmail.com") nav("/CompanyLogin");
    // else if (userId === "jobseeker@gmail.com") nav("/JobSeekerLogin");
  };
  return (
    <>
      <div className="container my-3 border">
        <div className="row">
          <div className="col-12 d-flex-col">
            <div className="d-flex align-item-center justify-content-center w-100 vh-40 bg-silver border ">
              <div className="form_container p-5 rounded bg-dark text-white w-40 my-1">
                <form onSubmit={handleLogin}>
                  <div className="form-group mb-2 ">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className="form-group  mb-2">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <input type="checkbox" />
                    <label htmlFor="check">Remember me</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
