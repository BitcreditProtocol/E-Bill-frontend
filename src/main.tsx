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

import DefaultLayout from "./layouts/Default";
import CreateIdentityLayout from "./layouts/CreateIdentity";

import Unlock from "./pages/Unlock";
import Login from "./pages/Login";
import RecoverWithSeedPhrase from "./pages/RecoverWithSeedPhrase";
import Home from "./pages/home";
import { Notifications, NotificationsEmpty } from "./pages/Notifications";
import routes from "./constants/routes";

import "./index.css";
import "./styles/fonts.css";
import { BillsEmpty } from "./pages/Bills";

import Bill from "./pages/Bill";
import IssueBill from "./pages/IssueBill";
import CreateBill from "./pages/CreateBill";
import PreviewBill from "./pages/PreviewBill";
import MintBill from "./pages/MintBill";
import SellBill from "./pages/SellBill";

import Onboarding from "./pages/onboarding/Onboarding";
import Draw from "./pages/bill/draw/Draw";
import DrawFilled from "./pages/bill/draw/DrawFilled";
import EditIssue from "./pages/bill/draw/EditIssue";
import PlaceOfPayment from "./pages/bill/draw/Place";
import BillSuccess from "./pages/bill/draw/Success";
import Settings from "./pages/settings";

import Create from "./pages/contacts/Create";
import Overview from "./pages/contacts/Overview";
import View from "./pages/contacts/View";
import Edit from "./pages/contacts/Edit";
import Bills from "./pages/bills";

import Warning from "./pages/create-identity/Warning";
import Category from "./pages/create-identity/Category";
import AuthorizedSigner from "./pages/create-identity/AuthorizedSigner";
import BillIssuer from "./pages/create-identity/BillIssuer";
import Success from "./pages/create-identity/Success";

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
          path: routes.ONBOARDING,
          element: <Onboarding />,
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
              loader: View.loader,
            },
            {
              path: routes.EDIT_CONTACT,
              element: <Edit />,
              loader: View.loader,
            },
          ],
        },
      ],
    },
    {
      path: routes.CREATE_IDENTITY,
      element: <CreateIdentityLayout />,
      children: [
        {
          path: routes.CREATE_IDENTITY,
          element: <Warning />,
        },
        {
          path: routes.IDENTITY_CATEGORY,
          element: <Category />,
        },
        {
          path: routes.AUTHORIZED_SIGNER,
          element: <AuthorizedSigner />,
        },
        {
          path: routes.BILL_ISSUER,
          element: <BillIssuer />,
        },
        {
          path: routes.SUCCESS,
          element: <Success />,
        },
      ],
    },
    {
      path: "/draw-bill",
      element: <Draw />,
    },
    {
      path: "/draw-bill-filled",
      element: <DrawFilled />,
    },
    {
      path: "/edit-issue",
      element: <EditIssue />,
    },
    {
      path: "/place-of-payment",
      element: <PlaceOfPayment />,
    },
    {
      path: "/bill-success",
      element: <BillSuccess />,
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

    const { worker } = await import("./mocks/browser");
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
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
