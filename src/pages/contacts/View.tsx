import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import Details from "./components/Details";
import Delete from "./components/Delete";

function TopBar() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/contacts");
  };

  const goToEdit = () => {
    navigate("/edit-contact");
  };

  return (
    <div className="flex items-center justify-between w-full">
      <button
        className="flex justify-center items-center h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full"
        onClick={goBack}
      >
        <ChevronLeftIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>

      <h1 className="text-text-300 text-base font-medium leading-6">
        View contact
      </h1>

      <button
        className="flex justify-center items-center h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-md"
        onClick={goToEdit}
      >
        <PencilIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>
    </div>
  );
}

export default function View() {
  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />

      <Details
        name="John Doe"
        public_key="0x1234567890abcdef"
        email="john@doe.com"
        postal_address="1234 Main St, Springfield, IL 62701"
        date_of_birth_or_registration="21-Nov-1990"
        country="United States"
        city="Springfield"
        identification_number="1234567890"
      />

      <Delete />
    </div>
  );
}
