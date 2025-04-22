import { useEffect } from "react";
import "./splashScreen.css";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/explore");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-[100-vw] h-[80vh] ">
      <div className="splash-screen"></div>
    </div>
  );
};

export default SplashScreen;
