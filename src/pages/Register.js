import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
    };
    console.log(userData);

    try {
      const response = await fetch(`http://localhost:8080/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful", result);
        setSuccessMessage("Registration successful! Redirecting...");

        // Redirect after 2 seconds
        setTimeout(() => {
          nav('/');
        }, 2000);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 d-flex-col">
            <div className="form_container d-flex justify-content-center p-5 rounded text-dark w-100 my-1">
              <form onSubmit={handleRegister} className="w-100">
                <div className="form-group d-flex align-items-center mb-3 row">
                  <label htmlFor="firstname" className="form-label col-2 text-end">
                    <strong>First Name:</strong>
                  </label>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="form-group mb-3 d-flex align-items-center row">
                  <label htmlFor="lastname" className="form-label col-2 text-end">
                    <strong>Last Name:</strong>
                  </label>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="form-group mb-3 d-flex align-items-center row">
                  <label htmlFor="email" className="form-label col-2 text-end">
                    <strong>Email:</strong>
                  </label>
                  <div className="col-10">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="form-group mb-3 d-flex align-items-center row">
                  <label htmlFor="password" className="form-label col-2 text-end">
                    <strong>Password:</strong>
                  </label>
                  <div className="col-10">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>

                <div className="form-group mb-3 d-flex align-items-center row">
                  <label htmlFor="role" className="form-label col-2 text-end">
                    <strong>Role:</strong>
                  </label>
                  <div className="col-10">
                    <select
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ width: "80%" }}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="jobseeker">Job Seeker</option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group mb-3 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>

                {successMessage && ( // Display success message
                  <div className="alert alert-success mt-3">
                    {successMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
