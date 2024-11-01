import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LanguageProvider from "./context/LanguageContext";

import DefaultLayout from "./layouts/Default";
import ConnectCompany from "./pages/onboarding/ConnectCompany";
import ProfileInfo from "./pages/onboarding/ProfileInfo";

import Unlock from "./pages/Unlock";
import Login from "./pages/Login";
import RecoverWithSeedPhrase from "./pages/RecoverWithSeedPhrase";
import Home from "./pages/Home";

import CreateNewIdentity from "./pages/onboarding/CreateNewIdentity";

import routes from "./constants/routes";

import "./index.css";
import "./styles/fonts.css";

const router = createBrowserRouter([
  {
    path: routes.UNLOCK,
    element: <Unlock />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: routes.LOGIN,
    element: <Login />,
  },
  {
    path: routes.HOME,
    element: <Home />,
  },
  {
    path: routes.RESTORE_WITH_SEED_PHRASE,
    element: <RecoverWithSeedPhrase />,
  },
  {
    path: routes.CREATE_IDENTITY,
    element: <CreateNewIdentity />,
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
    <LanguageProvider>
      <DefaultLayout>
        <RouterProvider router={router} />
      </DefaultLayout>
    </LanguageProvider>
  </StrictMode>
);
