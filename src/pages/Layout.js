import { Outlet, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/career">Career</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav> */}
      <div className="container d-flex justify-content-center p-0 ">
        <nav className="navbar navbar-expand-lg p-0">
          <div className="container-fluid">
            {/* <a className="navbar-brand " href="#">
              {props.title}
            </a> */}
            <div
              className="collapse navbar-collapse p-0"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto p-0 mb-lg-0 ">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <strong>Home</strong>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    <strong> About Us</strong>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/services">
                    <strong>Services</strong>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/career">
                    <strong>Career</strong>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    <strong>Contact</strong>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    <strong>Login</strong>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    <strong>Register</strong>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
