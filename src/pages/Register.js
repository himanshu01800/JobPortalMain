import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onLogin }) => {
  const nav = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

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
            <div className="d-flex align-item-center justify-content-center w-100 vh-40 bg-silver ">
              <div className="form_container p-5 rounded bg-silver text-dark w-100 my-1">
                <form onSubmit={handleLogin}>
                  <div className="form-group d-flex mb-3 row">
                    <label
                      htmlFor="firstname"
                      className="form-label col-4 text-end"
                    >
                      <strong>First Name:</strong>
                    </label>
                    <input
                      type="text"
                      className="col-8"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3 d-flex row">
                    <label
                      htmlFor="lastname"
                      className="form-label col-4 text-end"
                    >
                      <strong>Last Name:</strong>
                    </label>
                    <input
                      type="text"
                      className=" col-8 "
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3 d-flex row">
                    <label
                      htmlFor="email"
                      className="form-label col-4 text-end"
                    >
                      <strong>Email:</strong>
                    </label>
                    <input
                      type="email"
                      className=" col-8 "
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group  mb-3 d-flex row">
                    <label
                      htmlFor="password"
                      className="form-label col-4 text-end"
                    >
                      <strong>Password:</strong>
                    </label>
                    <input
                      type="password"
                      className="col-8"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group  mb-3 d-flex row">
                    <label
                      htmlFor="mobile"
                      className="form-label col-4 text-end"
                    >
                      <strong>Mobile:</strong>
                    </label>
                    <input
                      type="text"
                      className="col-8"
                      placeholder="Enter your password"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-1 ">
                    <input type="checkbox" />
                    <label htmlFor="check" className="mt-1">
                      Remember me
                    </label>
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
export default Register;
