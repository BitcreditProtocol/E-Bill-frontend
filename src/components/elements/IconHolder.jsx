import React from "react";

export default function IconHolder({icon, handleClick, primary, circuled}) {
    return (
        <span
            className={circuled ? "circule icon-container" : "icon-container"}
            onClick={handleClick}
        >
            <span className={primary ? "primary icon" : "icon"}>
                <img src={icon}/>
            </span>
        </span>
    );
}
