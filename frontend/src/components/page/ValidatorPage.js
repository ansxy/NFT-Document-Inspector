import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import { ethers } from "ethers";
import KtpInspector from "../../contracts/KtpInspector.json";
import emailjs from "@emailjs/browser";

export default function ValidatorPage() {
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(false);
    await emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_PUBLIC_KEY
    );
    setIsSuccess(true);
    setLoading(true);
  };

  useEffect(() => {
    (async () => {
      const addressFromWallet = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const addresDeployer = new ethers.VoidSigner(
        process.env.REACT_APP_SIGNER_SMART_CONTRACT,
        provider
      );
      const contractInspector = new ethers.Contract(
        process.env.REACT_APP_KTP_INSPECTOR,
        KtpInspector.abi,
        addresDeployer
      );
      const isSuperAdmin = await contractInspector.isSuperAdmin(
        ...addressFromWallet
      );
      const isAdmin = await contractInspector.isAdmin(...addressFromWallet);

      if (isAdmin || isSuperAdmin) {
        setAdmin(true);
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/formktp`
        );
        return setData(result.data);
      }
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
      {!isAdmin ? (
        <div className="flex justify-between flex-1">
          <div className="w-full h-full flex flex-nowrap justify-center mt-60">
            {modalStatus ? (
              <></>
            ) : (
              <>
                <div
                  id="popup-modal"
                  class="overflow-y-auto overflow-x-hidden fixed flex justify-center  backdrop-blur-sm place-items-center md:inset-0 h-modal md:h-full"
                >
                  <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div class="p-6 text-center">
                        <svg
                          aria-hidden="true"
                          class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Hanya Admin dari Smart Contract yang bisa mengakses
                          halaman ini silahkan request Sebagai Admin untuk Smart
                          Contract dan Address Wallet yang jadi Admin tidak bisa
                          dijadikan NFT
                        </h3>
                        <button
                          data-modal-toggle="popup-modal"
                          onClick={() => setModalStatus(true)}
                          type="button"
                          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex w-1/2 h-1/2 justify-center">
              <div className=" h-1/2 w-4/5 flex flex-col items-center justify-center gap-4">
                <h2 className=" text-white uppercase text-3xl xl:text-4xl 2xl:text-5xl text-center font-bold">
                  Request Sebagai Admin
                </h2>
                <form
                  className="flex flex-row mt-6 w-full"
                  ref={form}
                  onSubmit={sendEmail}
                >
                  <input
                    type="addressWallet"
                    id="address_wallet"
                    name="address_wallet"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-l-lg"
                    placeholder="Your Address Wallet"
                    required
                  />
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    placeholder="Your Email for status process"
                    required
                  />
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 p-2.5 rounded-r-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-bold">
                    Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-5/6">
          <div className="flex flex-col w-3/5 justify-start items-center">
            <div className="w-full flex items-center justify-center bg-white rounded-t-lg shadow-md border-b-2 mt-10">
              <h2 className="text-black uppercase text-2xl m-5 font-bold">
                Form Validator
              </h2>
            </div>
            <div className="flex bg-white w-full h-full">
              <div className="w-full overflow-y-auto min-h-screen">
                <Table columns={columns} data={data} />
              </div>
            </div>
          </div>
        </div>
      )}
      ;
      {loading ? (
        <> </>
      ) : (
        <div class=" overflow-y-auto overflow-x-hidden fixed flex justify-center  backdrop-blur-sm place-items-center md:inset-0 h-modal md:h-full">
          <svg
            class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {isSuccess ? (
        <>
          <div
            id="popup-modal"
            class="overflow-y-auto overflow-x-hidden fixed flex justify-center  backdrop-blur-sm place-items-center md:inset-0 h-modal md:h-full"
          >
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Request sebagai admin telah di buat silahkan tunggu 1x24 jam
                    kami akan melakukan konfirmasi ke email anda
                  </h3>
                  <button
                    data-modal-toggle="popup-modal"
                    onClick={() => setIsSuccess(false)}
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
