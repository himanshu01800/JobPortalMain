import { Outlet, Link } from "react-router-dom";

const CompanyLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="findcandidate">Find Candidates</Link>
            <Link to="postnewjob">Post New Job</Link>
            <Link to="postedjob">Posted Jobs</Link>
            <Link to="companyaccount">Account</Link>
            <Link to="profilematch">Profile Match</Link>
            <Link to="appliedjob">Applied Jobs</Link>
            <Link to="changepassword">Change Password</Link>
            <Link to="myinbox">My Inbox</Link>
            <Link to="sent">Sent</Link>
            <Link to="logout">LogOut</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default CompanyLayout;