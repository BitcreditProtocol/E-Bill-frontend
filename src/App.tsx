import DefaultLayout from "./layouts/Default";
import CreateIdentity from "./pages/onboarding/CreateIdentity";
import ConnectCompany from "./pages/onboarding/ConnectCompany";
import ProfileInfo from "./pages/onboarding/ProfileInfo";
import Home from "./pages/Home";

function App() {
  return (
    <DefaultLayout>
      <Home />
      {/* <CreateIdentity /> */}
      {/* <ConnectCompany /> */}
      {/* <ProfileInfo /> */}
    </DefaultLayout>
  );
}

export default App;
