import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
export default function ValidatorPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3001/api/formktp");
      return setData(result.data);
    })();
  }, []);
  const handleSubmit = async (e, addressWallet) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/formktp/";
      const result = await axios.get(url + addressWallet);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "AddressWallet",
        accessor: "addressWallet",
      },
      {
        Header: "nama",
        accessor: "nama",
      },
      {
        Header: "Jenis Kelamin",
        accessor: "jenisKelamin",
      },
      {
        Header: "Status",
        accessor: "statusValidasi",
      },
      {
        Header: "Button",
        Cell: (row) => (
          <div>
            <form
              onSubmit={(e) => handleSubmit(e, row.row.original.addressWallet)}
            >
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {" "}
                Edit{" "}
              </button>
            </form>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <>
      <div className="flex flex-grow justify-center">
        <div className="flex flex-col w-3/5 h-full justify-start items-center">
          <div className="w-full flex items-center justify-center h-auto bg-white rounded-t-lg shadow-md border-b-2 mt-10">
            <h2 className="text-black uppercase text-2xl m-5 font-bold">
              Form Validator
            </h2>
          </div>
          <div className="flex flex-grow bg-white w-full">
            <div className=" overflow-x-auto flex-grow relative shadow-md sm:rounded-lg ">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
