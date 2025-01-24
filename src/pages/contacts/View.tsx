import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import Delete from "./components/Delete";
import ViewContact from "./view";

function TopBar() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const goToEdit = () => {
    navigate("edit");
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
      <>
        <ViewContact
          contactType="person"
          name="John Doe"
          email="john@doe.com"
          country="AT"
          city="Vienna"
          zip="1010"
          street="Stephansplatz 1"
          dateOfRegistration="16-Jan-2025"
          countryOfRegistration="AT"
          cityOfRegistration="Vienna"
          registrationNumber="FN 123456"
          nodeId="node-123456"
        />
        <Delete />
      </>
    </div>
  );
}
