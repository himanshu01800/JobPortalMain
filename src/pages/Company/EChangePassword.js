import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';


const EChangePassword = () => {
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
      const {id}=jwtDecode(localStorage.getItem("jwtToken"))
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      console.log(newPassword);
      if(newPassword===confirmPassword){
        const response = await fetch(`http://localhost:8080/users/changePassword/${id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({password:newPassword})
      });
  
      }
    
    };
  return (
    <div className="container text-black">
    <div className="row d-flex justify-content-center">
      <div className="col-md-6">
        <h3 className="text-center mb-4">Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">Change Password</button>
        </form>
      </div>
    </div>
  </div>

   
  

  
  
  )
}

export default EChangePassword
