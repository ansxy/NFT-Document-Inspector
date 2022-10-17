import React from "react";
import ReactDOM from "react-dom/client";
import PageFormKTP from "./pages/P_FormKTP";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PageValidator from "./pages/P_Validator";
import PageFormSertifikatTanah from "./pages/P_FormSertifikatTanah";
import axios from "axios";
import PageDetail from "./pages/P_DetailPage";

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
    element: <PageFormSertifikatTanah />,
  },
  {
    path: "/formvalidator",
    element: <PageValidator />,
  },
  {
    element: <PageDetail />,
    path: "/formvalidator/:addressWallet",
    loader: async ({ request, params }) => {
      try {
        const url = "http://localhost:3001/api/formktp/";
        const urlFull = url + params.addressWallet;
        const result = await axios.get(urlFull);
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
