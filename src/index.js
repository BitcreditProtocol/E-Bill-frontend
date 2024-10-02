import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import {MainProvider} from "./context/MainContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <MainProvider>
        <App/>
    </MainProvider>
);
