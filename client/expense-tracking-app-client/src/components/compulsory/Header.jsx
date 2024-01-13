import { useContext } from "react";
import search from "../../assets/icon/search.png";
import { DarkModeContext } from "../features/DarkModeContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <nav
        className={`py-2.5 shadow-sm shadow-slate-500 border fixed w-full top-0 z-10 ${
          darkMode ? "bg-gray-900 border-slate-950" : "bg-[#d1d5db]"
        }`}
      >
        <ul className="flex items-center justify-between px-[2rem]">
          <li>
            <h1
              className={`text-${
                darkMode ? "white" : "slate-800"
              } text-2xl font-thin`}
            >
              Expense Tracker
            </h1>
          </li>
          <li className="flex items-center">
            <form className="flex items-center">
              <input
                type="text"
                placeholder="Search Something..."
                className={`border ${
                  darkMode ? "border-gray-700" : "border-slate-800"
                } px-3 py-0.5 rounded focus:outline-none focus:border-slate-500 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              />
              <button className="ml-2 pt-1">
                <img
                  src={search}
                  alt="Search"
                  className={`w-5 h-5 ${darkMode ? "filter-invert" : ""}`}
                />
              </button>
            </form>
            <button
              className={`ml-4 p-2 border rounded focus:outline-none ${
                darkMode ? "border-white" : "border-slate-800"
              }`}
              onClick={toggleDarkMode}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
