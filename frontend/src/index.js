import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import axios from "axios";
import FormKtp from "../src/components/page/FormKtp";
import SearchForm from "./components/page/searchForm";
import DetailPage from "./components/page/DetailPage";
import FormSertifikatTanah from "./components/page/FormSertifikatTanah";
import ValidatorPage from "./components/page/ValidatorPage";
import Result from "./components/page/Result";
import ErrorPage from "./components/page/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SearchForm />,
        index: true,
      },
      {
        path: "/formktp",
        element: <FormKtp />,
      },
      {
        path: " /formsertifikattanah",
        element: <FormSertifikatTanah />,
      },
      {
        path: "/formvalidator",
        element: <ValidatorPage />,
      },
      {
        element: <DetailPage />,
        path: "/formvalidator/:addressWallet",
        loader: async ({ request, params }) => {
          try {
            const url = `${process.env.REACT_APP_BASE_URL}api/formktp/${params.addressWallet}`;
            const result = await axios.get(url);
            return result;
          } catch (err) {
            console.log(err);
          }
        },
      },
      {
        element: <Result />,
        path: "/results",
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
