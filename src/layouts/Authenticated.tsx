import { Navigate, Outlet } from "react-router-dom";
import { useIdentity } from "@/context/identity/IdentityContext";
import routes from "@/constants/routes";

export default function Authenticated() {
  const { isAuthenticated } = useIdentity();

  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={routes.ONBOARDING} />;
  }

  return <>{<Outlet />}</>;
}
