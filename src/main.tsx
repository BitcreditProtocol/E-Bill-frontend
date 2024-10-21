import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DefaultLayout from "./layouts/Default.tsx";
import CreateIdentity from "./pages/onboarding/CreateIdentity";
import ConnectCompany from "./pages/onboarding/ConnectCompany";
import ProfileInfo from "./pages/onboarding/ProfileInfo";
import Home from "./pages/Home";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-identity",
    element: <CreateIdentity />,
  },
  {
    path: "/connect-company",
    element: <ConnectCompany />,
  },
  {
    path: "/profile-info",
    element: <ProfileInfo />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DefaultLayout>
      <RouterProvider router={router} />
    </DefaultLayout>
  </StrictMode>
);
