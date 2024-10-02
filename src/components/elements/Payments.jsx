import React, {useContext} from "react";
import {MainContext} from "../../context/MainContext";

function Payments({payments, history}) {
    const {handlePage} = useContext(MainContext);
    return (
        <div
            className="home-container-payments-details"
            onClick={() => {
                handlePage("activity");
            }}
        >
            <div className="payments">{payments}</div>
            <div className="history">{history}</div>
        </div>
    );
}

export default Payments;
