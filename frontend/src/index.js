import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/page/NavBar";
import PageFormKTP from "./pages/P_FormKTP";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/formktp",
    element: <PageFormKTP />,
  },
  {
    path: "/formsertifikattanah",
    element: <div>Form Sertifikat Tanah!</div>,
  },
  {
    path: "/formvalidator",
    element: <div>Form validator</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
