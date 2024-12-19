import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import Details from "./components/Details";
import Delete from "./components/Delete";
import type { Contact } from "@/types/contact";
import * as contacts from "@/mocks/handlers/contacts/list";

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
  const value = useLoaderData() as Contact | null | undefined;

  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />
      {value && (<>
        <Details {...value} />
        <Delete />
      </>)}
    </div>
  );
}

const loader: LoaderFunction<Contact['node_id']> = async ({ params }): Promise<Contact | null> => {
  return await Promise.resolve(contacts.data.find((it) => it.node_id === params.node_id) || null);
}

View.loader = loader;
