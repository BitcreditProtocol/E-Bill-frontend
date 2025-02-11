import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIdentity } from "@/context/identity/IdentityContext";
import routes from "@/constants/routes";

const PUBLIC_ROUTES = [
  routes.ONBOARDING,
  routes.LOGIN,
  routes.RESTORE_WITH_SEED_PHRASE,
  routes.CREATE_IDENTITY,
];

export default function Authenticated() {
  const location = useLocation();
  const { isAuthenticated } = useIdentity();

  if (isAuthenticated && PUBLIC_ROUTES.includes(location.pathname)) {
    return <Navigate to={routes.HOME} replace />;
  }

  if (!isAuthenticated && !PUBLIC_ROUTES.includes(location.pathname)) {
    return <Navigate to={routes.ONBOARDING} replace />;
  }

  return <Outlet />;
}
