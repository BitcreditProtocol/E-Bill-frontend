import React, {useContext} from "react";
import Arrow from "./Arrow";
import {MainContext} from "../../context/MainContext";

function SubHeading({rotate, route, color, amount, currency}) {
    const {handlePage} = useContext(MainContext);
    return (
        <div
            onClick={() => handlePage(route)}
            className="home-container-heading-single "
        >
            <div className="arrow">
                <Arrow rotate={rotate} color={color}/>
            </div>
            <span style={{textTransform: "uppercase", color: `#${color}`}}>
        {amount} {currency}
            </span>
        </div>
    );
}

export default SubHeading;
