import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LanguageProvider from "./context/language/LanguageProvider";
import IdentityProvider from "./context/identity/IdentityProvider";

import DefaultLayout from "./layouts/Default";

import Unlock from "./pages/Unlock";
import Login from "./pages/Login";
import RecoverWithSeedPhrase from "./pages/RecoverWithSeedPhrase";
import Home from "./pages/home";
import Notifications from "./pages/Notifications";
import routes from "./constants/routes";

import "./index.css";
import "./styles/fonts.css";
import { BillsEmpty } from "./pages/Bills";

// settings
import Settings from "./pages/settings";
import NotificationsSettings from "./pages/settings/Notifications";
import Security from "./pages/settings/Security";
import Mints from "./pages/settings/Mints";
import SeedPhrase from "./pages/settings/SeedPhrase";

// contact flows
import Create from "./pages/contacts/Create";
import Overview from "./pages/contacts/List";
import View from "./pages/contacts/View";
import Edit from "./pages/contacts/Edit";

// bill flows
import Bills from "./pages/bills/Overview";
import CreateBill from "./pages/bills/Create";
import Endorsements from "./pages/bills/Endorsements";
import Endorse from "./pages/bills/Endorse";
import Payment from "./pages/bills/Payment";
import Pay from "./pages/bills/Pay";
import ViewBill from "./pages/bills/View";
import Offer from "./pages/bills/Offer";

import IssueBill from "./pages/IssueBill";
import PreviewBill from "./pages/PreviewBill";
import MintBill from "./pages/MintBill";
import SellBill from "./pages/bills/Sell";

import RequestMint from "./pages/bills/RequestMint";
import SelectQuote from "./pages/bills/mint/SelectQuote";
import Preview from "./pages/bills/mint/Preview";
import Received from "./pages/bills/mint/Received";
import Request from "./pages/bills/mint/Request";

// identity flows
import GetStarted from "./pages/GetStarted";
import IdentityCreation from "./pages/identity/Create";
import Identities from "./pages/identity/List";
import ViewIdentity from "./pages/identity/View";
import EditIdentity from "./pages/identity/Edit";

// company flows
import CreateCompany from "./pages/company/Create";
import CompanySigners from "./pages/company/Signers";
import EditCompany from "./pages/company/Edit";
import ViewCompany from "./pages/company/View";

import NonAcceptance from "./pages/recourse/NonAcceptance";
import NonPayment from "./pages/recourse/NonPayment";

import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: routes.ROOT,
      element: <DefaultLayout />,
      children: [
        {
          path: routes.CREATE_IDENTITY,
          element: <IdentityCreation />,
        },
        {
          path: routes.UNLOCK,
          element: <Unlock />,
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
          path: routes.NOTIFICATIONS_SETTINGS,
          element: <NotificationsSettings />,
        },
        {
          path: routes.MINT_SETTINGS,
          element: <Mints />,
        },
        {
          path: routes.SECURITY_SETTINGS,
          element: <Security />,
        },
        {
          path: routes.RECOVERY_SEED_PHRASE,
          element: <SeedPhrase />,
        },
        {
          path: routes.RESTORE_WITH_SEED_PHRASE,
          element: <RecoverWithSeedPhrase />,
        },
        {
          path: routes.NOTIFICATIONS,
          element: <Notifications />,
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
          element: <ViewBill />,
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
          path: routes.OFFER,
          element: <Offer />,
        },
        {
          path: routes.CREATE_BILL,
          element: <CreateBill />,
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
          path: routes.SELECT_QUOTE,
          element: <SelectQuote />,
        },
        {
          path: routes.PREVIEW_MINT,
          element: <Preview />,
        },
        {
          path: routes.MINT_RECEIVED,
          element: <Received />,
        },
        {
          path: routes.MINT_REQUEST,
          element: <Request />,
        },
        {
          path: routes.ONBOARDING,
          element: <GetStarted />,
        },
        {
          path: routes.NON_ACCEPTANCE,
          element: <NonAcceptance />,
        },
        {
          path: routes.NON_PAYMENT,
          element: <NonPayment />,
        },
        {
          path: routes.CONTACTS,
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Overview />,
            },
            {
              path: routes.CREATE_CONTACT,
              element: <Create />,
            },
            {
              path: routes.VIEW_CONTACT,
              element: <View />,
            },
            {
              path: routes.EDIT_CONTACT,
              element: <Edit />,
            },
          ],
        },
        {
          path: routes.VIEW_IDENTITY,
          element: <ViewIdentity />,
        },
        {
          path: routes.EDIT_IDENTITY,
          element: <EditIdentity />,
        },
        {
          path: routes.IDENTITY_LIST,
          element: <Identities />,
        },
        // company flows
        {
          path: routes.CREATE_COMPANY,
          element: <CreateCompany />,
        },
        {
          path: routes.COMPANY_SIGNERS,
          element: <CompanySigners />,
        },
        {
          path: routes.EDIT_COMPANY,
          element: <EditCompany />,
        },
        {
          path: routes.VIEW_COMPANY,
          element: <ViewCompany />,
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
    const flatten = (it: RouteObject) =>
      it.children === undefined
        ? it
        : it.children.flatMap(
            (c) =>
              ({
                ...c,
                path: `${it.path ?? ""}/${c.path ?? ""}`.replace("//", "/"),
              } as RouteObject)
          );

    console.info("[dev] quickly navigate through all routes while developing:");
    console.table(
      router.routes
        .filter((it) => it.path !== undefined)
        .flatMap((it) => flatten(it))
        .flatMap((it) => flatten(it))
        .map((it) => [it.path, location.origin + (it.path || "")])
    );

    if (import.meta.env.VITE_API_MOCKING_ENABLED === "true") {
      const { worker } = await import("./mocks/browser");
      await worker.start();
    }
  }
};

void prepare().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <IdentityProvider>
          <LanguageProvider>
            <RouterProvider
              router={router}
              future={{
                v7_startTransition: true,
              }}
            />
            <Toaster />
          </LanguageProvider>
        </IdentityProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
