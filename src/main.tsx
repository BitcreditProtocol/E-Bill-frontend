import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LanguageProvider from "./context/LanguageContext.tsx";

import DefaultLayout from "./layouts/Default.tsx";
import CreateIdentity from "./pages/onboarding/CreateIdentity";
import ConnectCompany from "./pages/onboarding/ConnectCompany";
import ProfileInfo from "./pages/onboarding/ProfileInfo";
import Unlock from "./pages/Unlock.tsx";
import Login from "./pages/Login.tsx";
import RecoverWithPrivateKey from "./pages/RecoverWithPrivateKey.tsx";
import RecoverWithSeedPhrase from "./pages/RecoverWithSeedPhrase.tsx";
import routes from "./constants/routes.ts";

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
    path: routes.RESTORE_WITH_PRIVATE_KEY,
    element: <RecoverWithPrivateKey />,
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
