import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

export default function NavigateBack({ route }: { route?: string }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (route) {
      navigate(route);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      className="flex justify-center items-center pl-[7px] pr-[9px] h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full"
      onClick={handleNavigate}
    >
      <ChevronLeftIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
    </button>
  );
}
