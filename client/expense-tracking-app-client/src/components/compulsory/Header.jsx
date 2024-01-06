import search from "../../assets/icon/search.png";

const Header = () => {
  return (
    <>
      <nav className="bg-[#d1d5db] py-2.5 shadow-sm shadow-slate-500 border fixed w-full top-0 z-10">
        <ul className="flex items-center justify-between px-[2rem]">
          <li>
            <h1 className="text-slate-800 text-2xl font-thin">
              Expense Tracker
            </h1>
          </li>
          <li className="flex items-center">
            <form className="flex items-center">
              <input
                type="text"
                placeholder="Search Something..."
                className="border border-slate-800 px-3 py-0.5 rounded focus:outline-none focus:border-slate-500"
              />
              <button className="ml-2 pt-1">
                <img src={search} alt="Search" className="w-5 h-5" />
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
