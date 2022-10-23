import React from "react";
import error404 from "../../404.png";

export default function ErrorPage() {
  return (
    <>
      <div className=" flex h-screen justify-center place-items-center">
        <img src={error404} alt="error" className="h-2/6 bg-cover" />
      </div>
    </>
  );
}
