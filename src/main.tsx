import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LanguageProvider from "./context/LanguageContext";

import DefaultLayout from "./layouts/Default";
import CreateIdentity from "./pages/onboarding/CreateIdentity";
import ConnectCompany from "./pages/onboarding/ConnectCompany";
import ProfileInfo from "./pages/onboarding/ProfileInfo";

import Unlock from "./pages/Unlock";
import Login from "./pages/Login";
import RecoverWithSeedPhrase from "./pages/RecoverWithSeedPhrase";
import Home from "./pages/Home";
import { Notifications, NotificationsEmpty } from "./pages/Notifications";
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
  {
    path: routes.NOTIFICATIONS,
    element: <Notifications />,
  },
  {
    path: "/notifications-empty",
    element: <NotificationsEmpty />,
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
