import { ReceiptTextIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import Search from "@/components/ui/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Balances from "./components/Balances";
import Bills from "./components/Bills";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5 bg-background-ellipse bg-no-repeat select-none">
      <Topbar
        lead={
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://randomuser.me/api/portraits" />
            <AvatarFallback className="bg-brand-100 text-brand-200 text-sm font-medium">
              AM
            </AvatarFallback>
          </Avatar>
        }
        middle={
          <Search
            className="w-full"
            size="xs"
            placeholder="Search..."
            onSearch={() => {
              console.log("search");
            }}
          />
        }
        trail={
          <button className="flex items-center justify-center w-8 h-8 p-1.5 bg-elevation-200 border-[1px] border-divider-50 rounded-md">
            <ReceiptTextIcon
              className="h-5 w-5 text-text-300"
              strokeWidth={1}
            />
          </button>
        }
      />

      <div className="flex flex-col gap-8">
        <Balances />
        <Bills />
      </div>
    </div>
  );
}
