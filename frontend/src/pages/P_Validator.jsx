import "../index.css";
import React from "react";
import NavBar from "../components/page/NavBar";
import Footer from "../components/page/Footer";
import ValidatorPage from "../components/page/ValidatorPage";
import NavBarNew from "../components/page/NavBarFunc";

export default function PageValidator() {
  return (
    <div className="flex flex-col h-screen justify-between bg-emerald-200">
      <NavBarNew />
      <ValidatorPage />
      <Footer />
    </div>
  );
}
