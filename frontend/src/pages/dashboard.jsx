import React, { useEffect, useState } from "react";
import Footer from "../components/page/Footer";
import NavBarNew from "../components/page/NavBarFunc";
import backgroundSvg from "../bcgr.svg";
import "../index.css";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [haveMetamask, setHaveMetamask] = useState(true);

  useEffect(() => {
    const checkMetaMaskAvailability = async () => {
      if (window.ethereum === undefined) {
        setHaveMetamask(false);
      }
    };
    checkMetaMaskAvailability();
  }, []);

  return (
    <div
      className="flex flex-col h-auto bg-cover min-h-screen "
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      {haveMetamask ? (
        <>
          <header className="basis-auto ">
            <NavBarNew />
          </header>
          <div className="basis-auto">
            <Outlet />
          </div>
          <footer className="mt-auto bg-[#0066FF] flex justify-center text-white font-semibold">
            <Footer />
          </footer>
        </>
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
                    Silahkan install MetaMask Terlebih dahulu
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
