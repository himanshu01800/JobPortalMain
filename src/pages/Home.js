import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ onLogin }) => {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here
    if (userId === "admin@gmail.com") nav("/Adminpage");
    else if (userId === "company@gmail.com") nav("/CompanyLogin");
    else if (userId === "jobseeker@gmail.com") nav("/JobSeekerLogin");
  };

  return (
    <>
      <div className="container my-3 border">
        <div className="row">
          <div className="col-8 d-flex-col border">
            <img
              src="logo/online-job-portal.jpg"
              alt=""
              height={300}
              width={550}
            />
          </div>
          <div className="col-4 d-flex-col">
            <div className="d-flex align-item-center justify-content-center w-100 vh-40 bg-silver border ">
              <div className="form_container p-5 rounded bg-dark text-white w-40 my-1">
                <h5 className="text-center mb-3">Login Form</h5>
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
                  <div className="row ">
                    <div className="col-4">
                      <button type="submit" className="btn btn-primary mt-3">
                        Login
                      </button>
                    </div>
                    <div className="col-8 ">
                      <p className=" cur d-flex justify-content-center ">
                        <div class="dropdown">
                          <button
                            class="btn btn-primary mt-3"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            SignUp
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="newJobSeeker">
                                New JobSeeker
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="newCompany">
                                New Company
                              </a>
                            </li>
                          </ul>
                        </div>
                      </p>
                    </div>
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
export default Home;
