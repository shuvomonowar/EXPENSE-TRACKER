import search from "../../assets/icon/search.png";

const Header = () => {
  return (
    <>
      <nav className="bg-[#d1d5db] py-5 shadow-sm shadow-slate-500 border">
        <ul className="flex items-center justify-between px-[2rem]">
          <li>
            <h1 className="text-slate-800 text-3xl font-thin">
              Expense Tracker
            </h1>
          </li>
          <li className="flex items-center">
            <form className="flex items-center">
              <input
                type="text"
                placeholder="Search Something..."
                className="border border-slate-800 px-3 py-1 rounded focus:outline-none focus:border-slate-500"
              />
              <button className="ml-2 pt-1">
                <img src={search} alt="Search" className="w-6 h-6" />
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
