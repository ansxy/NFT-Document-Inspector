import React from "react";
import DropDown from "./DropDown";

export default function SearchForm() {
  return (
    <>
      <div className="flex w-1/2 h-1/2 justify-center">
        <div className=" h-1/2 w-4/5 flex flex-col ">
          <h2 className=" text-white uppercase text-5xl font-bold">
            NFT Document Inspector
          </h2>
          <form className="flex flex-row mt-6">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 p-2.5 rounded-l-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-bold">
              SEARCH
            </button>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <DropDown />
          </form>
        </div>
      </div>
    </>
  );
}
