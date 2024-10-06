import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import AdminLayout from "./pages/Admin/AdminLayout.js";
import About from "./pages/About";
import Staff from "./pages/Staff";
import Career from "./pages/Career";
import Services from "./pages/Services";
import FindCandiate from "./pages/FindCandiate";
import Header from "./Header";
import Header2 from "./pages/Header2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostNewJob from "./pages/Company/PostNewJob.js";
import EmployerDetail from "./pages/Company/EmployerDetails.js";
import EChangePassword from "./pages/Company/EChangePassword.js";
import PostedJobs from "./pages/Company/PostedJob.js";
import CompanyLayout from "./pages/Company/CompanyLayout.js";
import JobseekerLayout from "./pages/JobSeeker/JobseekerLayout.js";
import FindJob from "./pages/JobSeeker/FindJob.js";
import JobSeekerDetails from "./pages/JobSeeker/JobSeekerDetails.js";
import AppliedJobs from "./pages/JobSeeker/AppliedJobs.js";
import Logout from "./Logout.js";
import EmployerDetailsA from "./pages/Admin/EmployerDetailsA.js";
import JobSeekerDetailsA from "./pages/Admin/JobSeekerDetailsA.js";

import ProfileMatch from "./pages/Company/ProfileMatch.js";
import Companies from "./pages/JobSeeker/Companies.js";

export default function App() {
  return (
    <>
      <div className="container  my-2">
        <div className="row">
          <div className="col-4 d-flex-col">
            <Header />
          </div>
          <div className="col-8 d-flex-col">
            <Header2 />
          </div>
        </div>
      </div>
      <div className="col-12 d-flex-col">
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="services" element={<Services />} />
              <Route path="career" element={<Services/>} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NoPage />} />
            </Route>

            <Route path="/admin" element={<AdminLayout/>}>
              <Route path="jobseekerreport" element={<JobSeekerDetailsA />} />
              <Route path="companyreport" element={<EmployerDetailsA />} />
              <Route path="feedbackreport" element={<Staff />} />
            </Route>

            <Route path="/company" element={<CompanyLayout />}>
              <Route path="findcandidate" element={<FindCandiate />} />
              <Route path="postedjob" element={<PostedJobs />} />
              <Route path="postNewJob" element={<PostNewJob />} />
              <Route path="companyAccount" element={<EmployerDetail />} />
              <Route path="profilematch" element={<ProfileMatch />} />
              <Route path="appliedjob" element={<FindCandiate />} />
              <Route path="changepassword" element={<EChangePassword />} />
              <Route path="myinbox" element={<FindCandiate />} />
            </Route>

            <Route path="/jobseeker" element={<JobseekerLayout />}>
              <Route path="findjob" element={<FindJob />} />
              <Route path="Myaccount" element={<JobSeekerDetails />} />
              <Route path="companies" element={<Companies />} />
              <Route path="appliedjob" element={<AppliedJobs />} />
              <Route path="changepassword" element={<FindCandiate />} />
              <Route path="myinbox" element={<FindCandiate />} />
             
            </Route>
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
