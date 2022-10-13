import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
export default function ValidatorPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3001/api/formktp");
      return setData(result.data);
    })();
  }, []);

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
            <Link
              to={{
                pathname: `/formvalidator/${row.row.original.addressWallet}`,
              }}
            >
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {" "}
                Edit{" "}
              </button>
            </Link>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <>
      <div className="flex justify-center h-5/6">
        <div className="flex flex-col w-3/5 justify-start items-center">
          <div className="w-full flex items-center justify-center bg-white rounded-t-lg shadow-md border-b-2 mt-10">
            <h2 className="text-black uppercase text-2xl m-5 font-bold">
              Form Validator
            </h2>
          </div>
          <div className="flex bg-white w-full h-full">
            <div className="w-full overflow-y-auto h-full">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
