import { DatePicker } from "@/components/ui/datePicker";
import React from "react";

const TestPage = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  
  return (
    <div className="h-full">
      <h1>Página de Teste</h1>
      <p>Esta é uma página de teste para o novo componente.</p>
      <DatePicker
        date={date}
        setDate={setDate} 
        allowRangeSelection
      ></DatePicker>
    </div>
  );
};

export default TestPage;