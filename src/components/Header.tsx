import { useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";

const Header = () => {
  const location = useLocation();
  const isSplashScreen = location.pathname === "/";

  return (
    <header className="bg-white border-b w-[100vw] py-4 flex justify-start items-center px-10">
      <h1 className="text-xl font-bold text-gray-900">Stock Market App</h1>
      {!isSplashScreen && <SearchInput />}
    </header>
  );
};

export default Header;
