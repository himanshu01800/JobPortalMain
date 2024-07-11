
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside logout");
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;