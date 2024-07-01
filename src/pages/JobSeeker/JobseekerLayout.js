import { Outlet, Link } from "react-router-dom";

const JobseekerLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="findjob">Find Job</Link>
            <Link to="jobseekeraccount">My Account</Link>
            <Link to="jobmatch">Job Match</Link>
            <Link to="appliedjob">Applied Job</Link>
            <Link to="changepassword">Change Password</Link>
            <Link to="myinbox">My Inbox</Link>
            <Link to="sent">Sent</Link>
            <Link to="logout">Logout</Link>            
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default JobseekerLayout;