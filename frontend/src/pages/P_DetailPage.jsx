import "../index.css";
import React from "react";
import Footer from "../components/page/Footer";
import NavBarNew from "../components/page/NavBarFunc";
import DetailPage from "../components/page/DetailPage";
import backgroundSvg from "../bcgr.svg";
export default function PageDetail() {
  return (
    <div
      className="flex flex-col bg-cover"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="basis-auto">
        <NavBarNew />
      </div>
      <DetailPage />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
