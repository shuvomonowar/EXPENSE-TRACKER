import axios from "axios";
import { useContext, useState } from "react";
import { DarkModeContext } from "../features/DarkModeContext";
import ScrollToTopButton from "./ScrollToTopButton";
import ShowRecords from "./ShowRecords";

const AddRecord = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [issuedOn, setIssuedOn] = useState("");
  const [notes, setNotes] = useState("");
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/record", {
        title,
        amount,
        category,
        issuedOn,
        notes,
      })
      .then((result) => {
        setTitle("");
        setAmount("");
        setCategory("");
        setIssuedOn("");
        setNotes("");

        window.location.reload();

        console.log(result);
      })
      .catch((error) => {
        console.log("Error fetching record:", error);
      });
  };

  return (
    <>
      <div
        className={`grid grid-cols-6 gap-0 ml-9 mr-11 ${
          darkMode ? "bg-gray-900" : "bg-[#d1d5db]"
        }`}
      >
        <div
          className={`w-[25rem] col-span-2 mt-8 ${
            darkMode ? "bg-gray-900" : "bg-[#d1d5db]"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className={`${
              darkMode ? "bg-gray-800 text-white" : "bg-[#fefce8] text-black"
            } shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-8`}
          >
            <div className="text-center text-3xl font-thin mb-6">
              <h1>Expense Record</h1>
            </div>

            <div className="mb-4">
              <label
                className={`block ${
                  darkMode ? "text-white" : "text-gray-700"
                } text-sm font-bold mb-2`}
                htmlFor="title"
              >
                Title:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 ${
                  darkMode ? "text-white" : "text-gray-700"
                } leading-tight focus:outline-none focus:shadow-outline focus:border-slate-800`}
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className={`block ${
                  darkMode ? "text-white" : "text-gray-700"
                } text-sm font-bold mb-2`}
                htmlFor="amount"
              >
                Amount:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 ${
                  darkMode ? "text-white" : "text-gray-700"
                } leading-tight focus:outline-none focus:shadow-outline focus:border-slate-800`}
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className={`block ${
                  darkMode ? "text-white" : "text-gray-700"
                } text-sm font-bold mb-2`}
                htmlFor="category"
              >
                Category:
              </label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 ${
                  darkMode ? "text-white" : "text-gray-700"
                } leading-tight focus:outline-none focus:shadow-outline focus:border-slate-800`}
                id="category"
                name="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">--Category--</option>
                <option value="groceries">Groceries</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className={`block ${
                  darkMode ? "text-white" : "text-gray-700"
                } text-sm font-bold mb-2`}
                htmlFor="issuedOn"
              >
                Issued On:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 ${
                  darkMode ? "text-white" : "text-gray-700"
                } leading-tight focus:outline-none focus:shadow-outline focus:border-slate-800`}
                id="issuedOn"
                name="issuedOn"
                type="date"
                required
                onChange={(e) => setIssuedOn(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className={`block ${
                  darkMode ? "text-white" : "text-gray-700"
                } text-sm font-bold mb-2`}
                htmlFor="notes"
              >
                Notes:
              </label>
              <textarea
                className={`shadow appearance-none border rounded w-full py-2 px-3 ${
                  darkMode ? "text-white" : "text-gray-700"
                } leading-tight focus:outline-none focus:shadow-outline focus:border-slate-800`}
                id="notes"
                name="notes"
                rows="4"
                placeholder="Enter notes"
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                className={`${
                  darkMode ? "bg-[#1a202c]" : "bg-[#334155] hover:bg-[#1f2937]"
                } text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold`}
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-4">
          <ShowRecords />
        </div>
      </div>
      <div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default AddRecord;
