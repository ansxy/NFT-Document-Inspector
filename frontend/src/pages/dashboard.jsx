import React from "react";
import Footer from "../components/page/Footer";
import NavBarNew from "../components/page/NavBarFunc";
import backgroundSvg from "../bcgr.svg";
import "../index.css";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      className="flex flex-col h-auto bg-cover min-h-screen "
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <header className="basis-auto ">
        <NavBarNew />
      </header>
      <div className="basis-auto">
        <Outlet />
      </div>
      <footer className="mt-auto bg-[#0066FF] flex justify-center text-white font-semibold">
        <Footer />
      </footer>
    </div>
  );
}
