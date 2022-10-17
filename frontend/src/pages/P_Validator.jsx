import "../index.css";
import React from "react";
import Footer from "../components/page/Footer";
import ValidatorPage from "../components/page/ValidatorPage";
import NavBarNew from "../components/page/NavBarFunc";
import backgroundSvg from "../bcgr.svg";

export default function PageValidator() {
  return (
    <div
      className="flex flex-col h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="basis-auto">
        <NavBarNew />
      </div>
      <div className="h-4/5">
        <ValidatorPage />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
