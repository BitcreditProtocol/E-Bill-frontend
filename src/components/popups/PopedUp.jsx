import React from "react";
import CheckBox from "../elements/CheckBox";

export default function PopedUp({filter, changleHandler}) {
    return (
        <div className="poped-up">
            <div className="filter-box">
                <CheckBox
                    name="imPayee"
                    text="If I am Payee"
                    checkCheck={filter?.imPayee}
                    changeListener={changleHandler}
                />
            </div>
            <hr/>
            <div className="filter-box">
                <CheckBox
                    name="imDrawer"
                    text="If I am Drawer"
                    checkCheck={filter?.imDrawer}
                    changeListener={changleHandler}
                />
            </div>
            <hr/>
            <div className="filter-box">
                <CheckBox
                    name="imDrawee"
                    text="If I am Payer"
                    checkCheck={filter?.imDrawee}
                    changeListener={changleHandler}
                />
            </div>
        </div>
    );
}
