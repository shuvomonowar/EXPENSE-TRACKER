import axios from "axios";
import { useEffect, useState } from "react";
import collapse from "../../assets/icon/collapse.png";
import expand from "../../assets/icon/expand.png";

const ShowRecords = () => {
  const [record, setRecord] = useState([]);
  const [expandedRecords, setExpandedRecords] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggleExpand = (index) => {
    setExpandedRecords((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const totalAmountCalculate = () => {
    return totalAmount.reduce((sum, amount) => sum + amount, 0);
  };

  const handleDelete = async (recordIndex, detailId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/record/${record[recordIndex]._id}/${detailId}`
      );

      if (response.data.message === "Expense deleted successfully") {
        setRecord((prevRecords) => {
          const updatedRecords = prevRecords.map((recordItem, index) => {
            if (index === recordIndex) {
              const updatedDetails = recordItem.details.filter(
                (detail) => detail._id !== detailId
              );
              const updatedRecordItem = {
                ...recordItem,
                details: updatedDetails,
              };
              const updatedTotalAmount = updatedRecordItem.details.reduce(
                (acc, detail) => acc + detail.amount,
                0
              );
              setTotalAmount((prevTotalAmount) => {
                const newTotalAmount = [...prevTotalAmount];
                newTotalAmount[index] = updatedTotalAmount;
                return newTotalAmount;
              });
              return updatedRecordItem;
            }
            return recordItem;
          });

          return updatedRecords.filter(
            (recordItem) => recordItem.details.length > 0
          );
        });
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const fetchRecord = () => {
    axios
      .get("http://localhost:3001/record")
      .then((response) => {
        setRecord(response.data);

        const calculatedTotalAmount = response.data.map((issuedRecord) =>
          issuedRecord.details.reduce((acc, detail) => acc + detail.amount, 0)
        );

        setTotalAmount(calculatedTotalAmount);

        setExpandedRecords(new Array(response.data.length).fill(false));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching record:", error);
      });
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (startDate && endDate && startDate > endDate) {
      alert("Start date should be smaller than end date");
      return;
    }

    axios
      .get(
        `http://localhost:3001/record?startDate=${startDate}&endDate=${endDate}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          alert("No data exists between the selected dates");
        }
        setRecord(response.data);

        const calculatedTotalAmount = response.data.map((issuedRecord) =>
          issuedRecord.details.reduce((acc, detail) => acc + detail.amount, 0)
        );

        setTotalAmount(calculatedTotalAmount);

        setExpandedRecords(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.log("Error fetching record:", error);
      });
  };

  return (
    <>
      {loading ? (
        <div className="p-9 bg-[#fefce8] my-[4rem] shadow-lg rounded-md">
          <p className="text-2xl font-thin">Loading...</p>
        </div>
      ) : (
        <div className="p-9 bg-[#fefce8] my-[4rem] shadow-lg rounded-md">
          <div className="text-center text-3xl pt-5 font-thin">
            <h1>Expenditure Report</h1>
          </div>
          <br />
          <br />
          <div className="mb-4">
            <form>
              <div className="grid grid-cols-6 grid-rows-1 ml-6">
                <div className="flex flex-col col-span-2">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow w-[18rem] focus:border-slate-800"
                    value={startDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-row col-span-1">
                  <h2 className="mt-9 ml-16 text-lg">To</h2>
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    End Date:
                  </label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow w-[18rem] focus:border-slate-800"
                    value={endDate}
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-span-1 flex items-center">
                  <button
                    className="bg-[#334155] hover:bg-[#1f2937] text-white font-bold py-2 px-4 ml-8 rounded focus:outline-none focus:shadow-outline mt-7"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <ul className="list-none">
              {record.map((issuedRecord, index) => (
                <li key={index} className="mb-4">
                  <div className="flex items-center justify-between bg-gray-300 p-4 rounded">
                    <h1 className="text-lg font-light">
                      Total expenses of{" "}
                      <span className="font-serif font-light">
                        {formatDate(issuedRecord.issuedOn)}{" "}
                      </span>
                      <span className="text-base ml-[32rem] font-bold text-green-800">
                        {totalAmount[index] + " Tk"}
                      </span>
                    </h1>
                    <button
                      className="text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleToggleExpand(index)}
                    >
                      {expandedRecords[index] ? (
                        <img
                          src={collapse}
                          alt="Collapse"
                          className="h-5 w-5"
                        />
                      ) : (
                        <img src={expand} alt="Expand" className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {expandedRecords[index] && (
                    <div className="mt-2">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200 text-center">
                          <tr>
                            <th className="border border-gray-300 p-2">
                              Title
                            </th>
                            <th className="border border-gray-300 p-2">
                              Amount
                            </th>
                            <th className="border border-gray-300 p-2">
                              Category
                            </th>
                            <th className="border border-gray-300 p-2">
                              Notes
                            </th>
                            <th className="border border-gray-300 p-2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {issuedRecord.details.map((detail, detailIndex) => (
                            <tr key={detailIndex}>
                              <td className="border border-gray-300 p-2">
                                {detail.title}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {detail.amount} Tk
                              </td>
                              <td className="border border-gray-300 p-2">
                                {detail.category}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {detail.notes}
                              </td>
                              <td className="border border-gray-300 text-center">
                                <div className="grid grid-cols-2 gap-3 py-2 px-1">
                                  <button className="bg-[#172554] hover:bg-blue-700 text-[#f9fafb] hover:text-white font-bold rounded py-2">
                                    Edit
                                  </button>
                                  <button
                                    className="bg-[#450a0a] hover:bg-red-700 text-[#f9fafb] hover:text-white font-bold rounded py-2"
                                    onClick={() =>
                                      handleDelete(index, detail._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between border border-slate-300 shadow-sm p-4 rounded">
            <h1 className="text-lg">
              Total expenses{" "}
              <span className="text-base ml-[39rem] font-bold text-red-800">
                {totalAmountCalculate()} {" Tk"}
              </span>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowRecords;