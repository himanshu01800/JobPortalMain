import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="jobseekerreport">Jobseeker Report</Link>
            <Link to="companyreport">Company Report</Link>
            <Link to="feedbackreport">Feedback Report</Link>
            <Link to="logout">LogOut</Link>            
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default AdminLayout;