import React from "react";

export default function TopDownHeading({upper, lower}) {
    return (
        <span className="head-title">
            <span className="head-title-top">{upper}</span>
            <span className="head-title-bottom">{lower}</span>
        </span>
    );
}
