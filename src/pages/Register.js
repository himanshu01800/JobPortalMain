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
        // Assuming your API responds with user data or a token
        const result = await response.json();
        console.log("Registration successful", result);

        // Example of navigation after successful registration
        if (role === "admin") {
          nav("/admin");
        } else if (role === "employer") {
          nav("/company");
        } else if (role === "jobseeker") {
          nav("/jobseeker");
        }
      } else {
        console.error("Registration failed");
        // Handle registration failure (e.g., display error message)
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (e.g., display error message)
    }
  };
  return (
    <>
      <div className="container my-3 border">
        <div className="row">
          <div className="col-12 d-flex-col">
            <div className="d-flex align-items-center justify-content-center w-100 vh-40 bg-silver">
              <div className="form_container p-5 rounded bg-silver text-dark w-100 my-1">
                <form onSubmit={handleRegister}>
                  <div className="form-group d-flex mb-3 row">
                    <label htmlFor="firstname" className="form-label col-4 text-end">
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
                    <label htmlFor="lastname" className="form-label col-4 text-end">
                      <strong>Last Name:</strong>
                    </label>
                    <input
                      type="text"
                      className="col-8"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3 d-flex row">
                    <label htmlFor="email" className="form-label col-4 text-end">
                      <strong>Email:</strong>
                    </label>
                    <input
                      type="email"
                      className="col-8"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3 d-flex row">
                    <label htmlFor="password" className="form-label col-4 text-end">
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
              
                  <div className="form-group mb-3 d-flex row">
                    <label htmlFor="role" className="form-label col-4 text-end">
                      <strong>Role:</strong>
                    </label>
                    <select
                      className="col-8"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="jobseeker">Job Seeker</option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                  <div className="form-group mb-1">
                    <input type="checkbox" />
                    <label htmlFor="check" className="mt-1">
                      Remember me
                    </label>
                  </div>
                  <div className="form-group mb-3 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
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
