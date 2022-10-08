import React from "react";
import ReactDOM from "react-dom/client";
import PageFormKTP from "./pages/P_FormKTP";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PageValidator from "./pages/P_Validator";

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
    element: <PageValidator />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
