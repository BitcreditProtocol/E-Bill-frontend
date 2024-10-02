import React, {useState} from "react";

export default function SelectSearchOption({
                                               placingHolder,
                                               changeHandle,
                                               options,
                                               checkCheck,
                                               checkHandleSearch,
                                               valuee,
                                               identity,
                                           }) {
    return (
        <div className="select-class-main">
            <input
                type="text"
                list="contact"
                className="select-class"
                disabled={checkCheck}
                id={identity}
                name={identity}
                value={valuee}
                onChange={changeHandle}
                onBlur={checkHandleSearch}
                placeholder={placingHolder}
            />
            <datalist id="contact">
                <option value="">Select Contact</option>
                {options.map((contact) => {
                    return <option key={contact.name}>{contact.name}</option>;
                })}
            </datalist>
        </div>
    );
}
