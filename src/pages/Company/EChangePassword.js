import React, { useState } from 'react'


const EChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add password change logic here
      console.log('Current Password:', currentPassword);
      console.log('New Password:', newPassword);
      console.log('Confirm Password:', confirmPassword);
    };
  return (
    <div className="container text-black">
    <div className="row d-flex justify-content-center">
      <div className="col-md-6">
        <h3 className="text-center mb-4">Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
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
