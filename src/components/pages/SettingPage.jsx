import React, {useContext} from "react";
import aboutIcon from "../../assests/about-icon.svg";
import displayIcon from "../../assests/display-icon.svg";
import recovIcon from "../../assests/recovery-icon.svg";
import acessIcon from "../../assests/acess-icon.svg";
import privacyIcon from "../../assests/privacy-icon.svg";
import exitIcon from "../../assests/exitIcon.svg";
import closeIcon from "../../assests/close-btn.svg";
import arrow from "../../assests/arrowLeft.svg";
import {MainContext} from "../../context/MainContext";

export default function SettingPage() {
    const {handlePage} = useContext(MainContext);
    const setting = [
        {
            name: "about",
            icon: aboutIcon,
        },
        {
            name: "display",
            icon: displayIcon,
        },
        {
            name: "recovery",
            icon: recovIcon,
        },
        {
            name: "app access",
            icon: acessIcon,
        },
        {
            name: "privacy",
            icon: privacyIcon,
        },
        {
            name: "exit",
            icon: exitIcon,
        },
    ];
    const handleSettingClick = async (name) => {
        switch (name) {
            case "exit":
                await fetch("http://localhost:8000/exit")
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
                window.close();
                break;
        }
    };
    return (
        <div className="setting">
            <div className="setting-head">
                <span className="setting-head-title">SETTINGS</span>
                <img
                    className="close-btn"
                    onClick={() => handlePage("home")}
                    src={closeIcon}
                />
            </div>
            <div className="setting-body">
                {setting.map(({name, icon}, index) => {
                    return (
                        <div
                            onClick={() => handleSettingClick(name)}
                            key={index}
                            className="setting-body-instant"
                        >
                            <img src={icon}/>
                            <span>{name}</span>
                            <img className="arrow" src={arrow}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
