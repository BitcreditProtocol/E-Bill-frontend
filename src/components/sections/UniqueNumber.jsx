import React from "react";

export default function UniqueNumber({UID, date}) {
    return (
        <div className="issue-number">
            <span className="issue-number-holder">
                <span className="bold">{UID}</span>
            </span>
            <span className="issue-number-date">{date}</span>
        </div>
    );
}
