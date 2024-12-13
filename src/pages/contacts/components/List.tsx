import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

import routes from "@/constants/routes";

function Contact() {
  const navigate = useNavigate();
  const goToContact = () => {
    navigate(routes.VIEW_CONTACT);
  };

  return (
    <div
      className="flex items-center justify-between py-4 px-3 w-full border-[1px] border-divider-75 rounded-xl cursor-pointer select-none"
      onClick={goToContact}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 py-1.5 px-2.5 bg-brand-50 text-brand-200 rounded-full">
          T
        </div>

        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium">
            Terry White
          </span>
          <span className="text-text-200 text-xs">
            1650 Rinehart Road, Miami, FL 33179
          </span>
        </div>
      </div>
      <ChevronRightIcon className="w-6 h-6 text-brand-200" strokeWidth={1} />
    </div>
  );
}

export default function List() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Contact />
      <Contact />
      <Contact />
    </div>
  );
}
