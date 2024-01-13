import { useContext } from "react";
import Footer from "../compulsory/Footer";
import Header from "../compulsory/Header";
import { DarkModeContext } from "../features/DarkModeContext";
import AddRecord from "./AddRecord";

const Features = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <>
      <div
        className={`pt-8 bg-[#d1d5db] ${
          darkMode ? "bg-gray-900" : "bg-[#d1d5db]"
        }`}
      >
        <Header />
        <AddRecord />
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
};

export default Features;
