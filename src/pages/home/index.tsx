import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import Topbar from "@/components/Topbar";
import Search from "@/components/ui/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIdentity } from "@/context/identity/IdentityContext";
import { truncateAvatarName } from "@/utils/strings";

import Balances from "./components/Balances";
import Bills from "./components/Bills";
import Page from "@/components/wrappers/Page";

export default function Home() {
  const { identity } = useIdentity();
  const intl = useIntl();

  return (
    <Page className="gap-6" displayBackgroundEllipse displayBottomNavigation>
      <Topbar
        lead={
          <Link to="/identity">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://randomuser.me/api/portraits" />
              <AvatarFallback className="bg-brand-100 text-brand-200 text-sm font-medium">
                {truncateAvatarName(identity.name)}
              </AvatarFallback>
            </Avatar>
          </Link>
        }
        middle={
          <Search
            className="w-full"
            size="xs"
            placeholder={intl.formatMessage({
              id: "Search field for home page",
              defaultMessage: "Search...",
              description: "Search placeholder for home page",
            })}
            onSearch={() => {
              console.log("search");
            }}
          />
        }
      />

      <div className="flex flex-col gap-8">
        <Balances />
        <Bills />
      </div>
    </Page>
  );
}
