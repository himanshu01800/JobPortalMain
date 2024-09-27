import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/userDetailSlice";
import {jwtDecode} from "jwt-decode";

const Home = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  
  // Function to navigate based on role
  const navigateBasedOnRole = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { role } = decoded;

      if (role === 'admin') {
        nav('/admin');
      } else if (role === 'employer') {
        nav('/company');
      } else if (role === 'jobseeker') {
        nav('/jobseeker');
      }
    }
  };

  // Check for token in local storage on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigateBasedOnRole(token);
    }
  }, []);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ userId, password }));
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigateBasedOnRole(token);
    }
  };

  return (
    <div className="container my-3 ">
      <div className="row">
        <div className="col-8 d-flex-col ">
          <img
            src="logo/online-job-portal.jpg"
            alt=""
            height={300}
            width={550}
          />
        </div>
        <div className="col-4 d-flex-col">
          <div className="d-flex align-item-center justify-content-center w-100 vh-40  ">
            <div className="form_container p-5 rounded bg-dark text-white w-40 my-1">
              <h5 className="text-center mb-3">Login Form</h5>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-2">
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
                <div className="form-group mb-2">
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
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary mt-3 w-100">Login</button>
                  </div>
                  <div className="col-6">
                    <p className="cur d-flex justify-content-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-primary mt-3 w-100"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          SignUp
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="newJobSeeker">
                              New JobSeeker
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="newCompany">
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
  );
};

export default Home;
