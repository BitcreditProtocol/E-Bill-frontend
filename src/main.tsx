import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";
import LanguageProvider from "./context/language/LanguageProvider";

import DefaultLayout from "./layouts/Default";
import RequiredInformation from "./pages/signup/RequiredInformation";
import Unlock from "./pages/Unlock";
import Login from "./pages/Login";
import RecoverWithSeedPhrase from "./pages/RecoverWithSeedPhrase";
import Home from "./pages/home";
import CreateNewIdentity from "./pages/signup/CreateNewIdentity";
import Success from "./pages/signup/Success";
import { Notifications, NotificationsEmpty } from "./pages/Notifications";
import routes from "./constants/routes";

import "./index.css";
import "./styles/fonts.css";
import { BillsEmpty } from "./pages/Bills";
import EmailVerification from "./pages/signup/EmailVerification";
import OptionalInformation from "./pages/signup/OptionalInformation";
import ConfirmIdentity from "./pages/signup/ConfirmIdentity";
import Bill from "./pages/Bill";
import IssueBill from "./pages/IssueBill";
import CreateBill from "./pages/CreateBill";
import PreviewBill from "./pages/PreviewBill";
import MintBill from "./pages/MintBill";
import SellBill from "./pages/SellBill";

import Onboarding from "./pages/onboarding/Onboarding";
import Settings from "./pages/settings";

import Create from "./pages/contacts/Create";
import Overview from "./pages/contacts/Overview";
import View from "./pages/contacts/View";
import Edit from "./pages/contacts/Edit";
import Bills from "./pages/bills";

import Endorsements from "./pages/bills/Endorsements";
import Endorse from "./pages/bills/Endorse";
import Payment from "./pages/bills/Payment";
import Pay from "./pages/bills/Pay";

import RequestMint from "./pages/bills/RequestMint";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: routes.ROOT,
      element: <DefaultLayout />,
      children: [
        {
          path: routes.UNLOCK,
          element: <Unlock />,
        },
        {
          path: routes.LOGIN,
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
          path: routes.SETTINGS,
          element: <Settings />,
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
        {
          path: "success",
          element: <Success />,
        },
        {
          path: "confirm-identity",
          element: <ConfirmIdentity />,
        },
        {
          path: routes.NOTIFICATIONS,
          element: <Notifications />,
        },
        {
          path: "notifications-empty",
          element: <NotificationsEmpty />,
        },
        {
          path: routes.BILLS,
          element: <Bills />,
        },
        {
          path: "bills-empty",
          element: <BillsEmpty />,
        },
        {
          path: routes.VIEW_BILL,
          element: <Bill />,
        },
        {
          path: routes.ISSUE_BILL,
          element: <IssueBill />,
        },
        {
          path: routes.CREATE_BILL,
          element: <CreateBill />,
        },
        {
          path: routes.PREVIEW_BILL,
          element: <PreviewBill />,
        },
        {
          path: routes.MINT_BILL,
          element: <MintBill />,
        },
        {
          path: routes.SELL_BILL,
          element: <SellBill />,
        },
        {
          path: routes.CREATE_BILL,
          element: <CreateBill />,
        },
        {
          path: routes.PREVIEW_BILL,
          element: <PreviewBill />,
        },
        {
          path: routes.ENDORSEMENTS,
          element: <Endorsements />,
        },
        {
          path: routes.ENDORSE,
          element: <Endorse />,
        },
        {
          path: routes.PAYMENT,
          element: <Payment />,
        },
        {
          path: routes.PAY,
          element: <Pay />,
        },
        {
          path: routes.REQUEST_MINT,
          element: <RequestMint />,
        },
        {
          path: "get-started",
          element: <Onboarding />,
        },
        {
          path: routes.CONTACTS,
          element: <Overview />,
        },
        {
          path: routes.CREATE_CONTACT,
          element: <Create />,
        },
        {
          path: `${routes.VIEW_CONTACT}/:node_id`,
          element: <View />,
          loader: View.loader,
        },
        {
          path: routes.EDIT_CONTACT,
          element: <Edit />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
const prepare = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");

    console.info("[dev] quickly navigate through all routes while developing:");
    console.table(
      router.routes
        .filter((it) => it.path !== undefined)
        .map((it) => [it.path, location.origin + (it.path || "")])
    );

    await worker.start();
  }
};

void prepare().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
          <Toaster />
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
