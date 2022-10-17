import "../index.css";
import React from "react";
import FormSertifikatTanah from "../components/page/FormSertifikatTanah";
import Footer from "../components/page/Footer";
import NavBarNew from "../components/page/NavBarFunc";
import backgroundSvg from "../bcgr.svg";

export default function PageFormSertifikatTanah() {
  return (
    <div
      className="flex flex-col bg-cover"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="basis-auto">
        <NavBarNew />
      </div>
      <FormSertifikatTanah />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
