import { useEffect, useState } from "react";
import arrowUp from "../../assets/icon/arrowUp.png"; // Replace with the actual path

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;

    // Show the button when the user scrolls down 100 pixels
    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-2 hover:opacity-100 rounded-full transition-opacity ${
        isVisible ? "opacity-65" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <img src={arrowUp} alt="Scroll to Top" className="w-7 h-7" />
    </button>
  );
};

export default ScrollToTopButton;
