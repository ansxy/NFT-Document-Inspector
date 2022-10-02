import { createPopper } from "@popperjs/core";
import React from "react";

export default function DropDown() {
  const [dropDownShow, setdropDownShow] = React.useState(false);
  const BtnDropDownRef = React.createRef();
  const PopOverDropDownRef = React.createRef();
  const openDropDown = () => {
    createPopper(BtnDropDownRef.current, PopOverDropDownRef.current, {
      placement: "bottom-start",
    });
    setdropDownShow(true);
  };
  const closeDropDown = () => {
    setdropDownShow(false);
  };

  return (
    <>
      <button
        id="dropdownDefault"
        style={{ transition: "all .15s ease" }}
        type="button"
        ref={BtnDropDownRef}
        onClick={() => {
          dropDownShow ? closeDropDown() : openDropDown();
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Dropdown button{" "}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        ref={PopOverDropDownRef}
        className={
          (dropDownShow ? "block" : "hidden ") +
          "z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 "
        }
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <a
              href="/formktp"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/formsertifikattanah"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
