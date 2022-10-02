import React from "react";
import DropDown from "./DropDown";

export default function SearchForm() {
  return (
    <>
      <div className="flex flex-grow justify-center items-center bg-black">
        <div className=" flex w-1/2 h-1/2 items-center justify-center">
          <div className=" h-1/2 w-4/5 flex flex-col">
            <h2 className=" text-white uppercase text-2xl">
              NFT Document Inspector
            </h2>
            <form className="flex flex-row mt-6">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l-lg">
                Search
              </button>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              <DropDown />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
