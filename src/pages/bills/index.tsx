import Header from "./components/Header";
import List from "./components/List";

export default function Bills() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5 select-none">
      <Header />
      <List />
    </div>
  );
}
