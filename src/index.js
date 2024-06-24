import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import AdminLayout from "./pages/AdminLayout";
import About from "./pages/About";
import Staff from "./pages/Staff";
import Career from "./pages/Career";
import Services from "./pages/Services";
import CompanyLayout from "./pages/CompanyLayout";
import JobseekerLayout from "./pages/JobseekerLayout";
import FindCandiate from "./pages/FindCandiate";
import Header from "./Header";
import Header2 from "./pages/Header2";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container border my-2">
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
              <Route path="career" element={<Career />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NoPage />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="jobseekerreport" element={<Staff />} />
              <Route path="companyreport" element={<Staff />} />
              <Route path="feedbackreport" element={<Staff />} />
              <Route path="logout" element={<Login />} />
            </Route>

            <Route path="/company" element={<CompanyLayout />}>
              <Route path="findcandidate" element={<FindCandiate />} />
              <Route path="postnewjob" element={<FindCandiate />} />
              <Route path="postedjob" element={<FindCandiate />} />
              <Route path="companyaccount" element={<FindCandiate />} />
              <Route path="profilematch" element={<FindCandiate />} />
              <Route path="appliedjob" element={<FindCandiate />} />
              <Route path="changepassword" element={<FindCandiate />} />
              <Route path="myinbox" element={<FindCandiate />} />
              <Route path="sent" element={<FindCandiate />} />
              <Route path="logout" element={<Login />} />
            </Route>

            <Route path="/jobseeker" element={<JobseekerLayout />}>
              <Route path="findjob" element={<FindCandiate />} />
              <Route path="jobseekeraccount" element={<FindCandiate />} />
              <Route path="jobmatch" element={<FindCandiate />} />
              <Route path="appliedjob" element={<FindCandiate />} />
              <Route path="changepassword" element={<FindCandiate />} />
              <Route path="myinbox" element={<FindCandiate />} />
              <Route path="sent" element={<FindCandiate />} />
              <Route path="logout" element={<Login />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
