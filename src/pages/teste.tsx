import { DatePicker } from "@/components/ui/datePicker";
import React from "react";

const TestePage = () => {
    const [date, setDate] = React.useState(new Date);

    return(
        <div className="w-full h-full">
            <div>This is a test Page</div>
            <DatePicker
                date={date}
                setDate={setDate}
                
            ></DatePicker>
        </div>
    );
};

export default TestePage;