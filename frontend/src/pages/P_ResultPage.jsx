import React from "react";
import Footer from "../components/page/Footer";
import NavBarNew from "../components/page/NavBarFunc";
import backgroundSvg from "../bcgr.svg";
import "../index.css";
import Result from "../components/page/Result";

export default function ResultPage() {
  return (
    <div
      className="flex flex-col bg-cover"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="basis-auto ">
        <NavBarNew />
      </div>
      <div className="h-auto">
        <Result />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
