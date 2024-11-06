import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LanguageProvider from "./context/LanguageContext";

import DefaultLayout from "./layouts/Default";
import RequiredInformation from "./pages/onboarding/RequiredInformation";
import Unlock from "./pages/Unlock";
import Login from "./pages/Login";
import RecoverWithSeedPhrase from "./pages/RecoverWithSeedPhrase";
import Home from "./pages/Home";

import CreateNewIdentity from "./pages/onboarding/CreateNewIdentity";

import routes from "./constants/routes";

import "./index.css";
import "./styles/fonts.css";
import EmailVerification from "./pages/onboarding/EmailVerification";
import OptionalInformation from "./pages/onboarding/OptionalInformation";

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
    path: routes.REQUIRED_INFORMATION,
    element: <RequiredInformation />,
  },
  {
    path: routes.EMAIL_VERIFICATION,
    element: <EmailVerification />,
  },
  {
    path: routes.OPTIONAL_INFORMATION,
    element: <OptionalInformation />,
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
