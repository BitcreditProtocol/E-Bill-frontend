import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import Details from "./components/Details";
import Delete from "./components/Delete";
import type { Contact } from "@/types/contact";

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
  const value = useLoaderData() as Contact

  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />

      <Details {...value} />

      <Delete />
    </div>
  );
}

const loader: LoaderFunction<Contact['public_key']> = async ({ params }): Promise<Contact> =>{
  return await Promise.resolve({
    name: "Terry White #1",
    type: 0,
    email: "terry@white.com",
    postal_address: "1650 Rinehart Road, Miami, FL 33179",
    public_key: params.public_key || '',
    date_of_birth_or_registration: "1990-01-01",
    country: "United States",
    city: "Miami",
    identification_number: "1234567890",
  });
}

View.loader = loader;