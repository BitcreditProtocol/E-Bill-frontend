import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import {
  BellIcon,
  ContactRoundIcon,
  HouseIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import routes from "@/constants/routes";

type ItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

function Item({ icon, label, isActive, onClick }: ItemProps) {
  return (
    <button
      className={cn(
        "flex flex-col items-center gap-1 h-10 w-10 cursor-pointer",
        isActive ? "text-text-300" : "text-text-200"
      )}
      onClick={onClick}
    >
      {icon}

      <span className="text-[10px] font-medium leading-[14px]">{label}</span>
    </button>
  );
}

export default function BottomNavigation() {
  const navigate = useNavigate();
  const intl = useIntl();

  const goToHome = () => {
    navigate("/" + routes.HOME);
  };

  const goToContacts = () => {
    navigate("/" + routes.CONTACTS);
  };

  const goToNewBill = () => {
    navigate("/" + routes.CREATE_BILL);
  };

  const goToNotifications = () => {
    navigate("/" + routes.NOTIFICATIONS);
  };

  const goToSettings = () => {
    navigate("/" + routes.SETTINGS);
  };

  return (
    <div className="fixed bottom-0 z-10 flex items-center justify-between w-full max-w-[375px] h-16 py-3 px-5 bg-[#FEFBF133] border-t-[0.5px] border-divider-100 backdrop-blur-[10px]">
      <Item
        icon={<HouseIcon className="h-6 w-6" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Home",
          defaultMessage: "Home",
          description: "Navigation button to navigate to Home screen",
        })}
        onClick={goToHome}
      />

      <Item
        icon={<ContactRoundIcon className="h-6 w-6" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Contacts",
          defaultMessage: "Contacts",
          description: "Navigation button to navigate to Contacts screen",
        })}
        onClick={goToContacts}
      />

      <button
        className="flex flex-col items-center gap-1 h-10 w-10 cursor-pointer -mt-1"
        onClick={goToNewBill}
      >
        <div className="flex items-center justify-center h-6 w-6 bg-brand-200 p-1 rounded-full">
          <PlusIcon className="h-4 w-4 text-white" strokeWidth={1} />
        </div>

        <span className="text-brand-200 text-[10px] font-medium leading-[14px]">
          <FormattedMessage
            id="New bill"
            defaultMessage="New bill"
            description="Navigation button to create a new bill"
          />
        </span>
      </button>

      <Item
        icon={<BellIcon className="h-6 w-6" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Notifications",
          defaultMessage: "Notifications",
          description: "Navigation button to navigate to Notifications screen",
        })}
        onClick={goToNotifications}
      />

      <Item
        icon={<SettingsIcon className="h-6 w-6" strokeWidth={1} />}
        label={intl.formatMessage({
          id: "Settings",
          defaultMessage: "Settings",
          description: "Navigation button to navigate to Settings screen",
        })}
        onClick={goToSettings}
      />
    </div>
  );
}
