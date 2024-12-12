import { useQuery } from "@tanstack/react-query";
import { getBills } from "@/services/bill";

import Header from "./components/Header";
import List from "./components/List";
import Empty from "./components/Empty";

export default function Bills() {
  const { isPending, isSuccess, data } = useQuery({
    queryKey: ["bills"],
    queryFn: getBills,
  });

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5 select-none">
      <Header />

      {isSuccess &&
        (data.length === 0 ? (
          <Empty />
        ) : (
          <List isLoading={isPending} bills={data} />
        ))}
    </div>
  );
}
