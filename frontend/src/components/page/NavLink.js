import React from "react";
import { Link } from "react-router-dom";

export default function NavLinks() {
  const links = [
    { name: "Form KTP", url: "/formktp" },
    { name: "Form Sertikat Tanah", url: "/formsertifikattanah" },
    { name: "Form Validator ", url: "/formvalidator" },
  ];
  return (
    <>
      {links.map((links) => (
        <li key={links.name} className="text-cyan-50">
          <Link to={links.url}>{links.name}</Link>
        </li>
      ))}
    </>
  );
}
