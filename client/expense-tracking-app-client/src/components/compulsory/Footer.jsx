import codeforces from "../../assets/icon/codeforces.png";
import facebook from "../../assets/icon/facebook.png";
import github from "../../assets/icon/github.png";
import leetcode from "../../assets/icon/leetcode.png";
import linkedin from "../../assets/icon/linkedin.png";
import x from "../../assets/icon/x.png";

const Footer = () => {
  return (
    <>
      <div className="bg-[#1e293b] font-serif text-white">
        <div className="flex flex-row gap-2 py-5 pl-[6rem]">
          <a
            href="#"
            className="bg-amber-50 p-2 rounded-3xl shadow shadow-zinc-200 transform hover:scale-110 transition ease-in-out social-media"
          >
            <img src={github} alt="GitHub" className="w-5 h-5 social-icon" />
          </a>
          <a
            href="#"
            className="bg-amber-50 p-2 rounded-3xl shadow shadow-zinc-200 transform hover:scale-110 transition ease-in-out social-media"
          >
            <img
              src={linkedin}
              alt="Linkedin"
              className="w-5 h-5 social-icon"
            />
          </a>
          <a
            href="#"
            className="bg-amber-50 p-2 rounded-3xl shadow shadow-zinc-200 transform hover:scale-110 transition ease-in-out social-media"
          >
            <img src={x} alt="X" className="w-5 h-5 social-icon" />
          </a>
          <a
            href="#"
            className="bg-amber-50 p-2 rounded-3xl shadow shadow-zinc-200 transform hover:scale-110 transition ease-in-out social-media"
          >
            <img
              src={facebook}
              alt="Facebook"
              className="w-5 h-5 social-icon"
            />
          </a>
          <a
            href="#"
            className="bg-amber-50 p-2 rounded-3xl shadow shadow-zinc-200 transform hover:scale-110 transition ease-in-out social-media"
          >
            <img
              src={leetcode}
              alt="LeetCode"
              className="w-5 h-5 social-icon"
            />
          </a>
          <a
            href="#"
            className="bg-amber-50 p-2 rounded-3xl shadow shadow-zinc-200 transform hover:scale-110 transition ease-in-out social-media"
          >
            <img
              src={codeforces}
              alt="Codeforces"
              className="w-5 h-5 social-icon"
            />
          </a>
          <div className="pl-[53rem] pt-2 text-md font-thin">
            {" "}
            Developed By &#10084; | ShuvoMonowar
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
