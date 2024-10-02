import React, { useContext, useEffect, useState } from "react";
import closeIcon from "../../assests/close-btn.svg";
import SingleContact from "../SingleContact";

import { MainContext } from "../../context/MainContext";
import AddContact from "../popups/AddContact";

export default function Contact() {
  const { copytoClip, showPopUp, handlePage, handleDelete, contacts } =
    useContext(MainContext);
  const [search, setSearch] = useState("");
  let newContact;
  if (search) {
    newContact = contacts.filter((d) =>
      d.name.toUpperCase().includes(search.toUpperCase())
    );
  } else {
    newContact = contacts;
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="contact">
      <div className="contact-head">
        <span className="contact-head-title">CONTACTS</span>
        <img
          className="close-btn"
          onClick={() => {
            handlePage("home");
          }}
          src={closeIcon}
        />
      </div>
      <input
        type="text"
        className="input-contact"
        placeholder="Search Contact"
        onChange={handleSearchChange}
      />
      <div className="contact-body">
        {Array.isArray(newContact) &&
          newContact.map((d, i) => {
            return (
              <SingleContact
                handleDelete={handleDelete}
                key={i}
                name={d.name}
                PeerId={d.peer_id}
                showPopUp={showPopUp}
                copytoClip={copytoClip}
              />
            );
          })}
      </div>
      <button onClick={() => showPopUp(true, <AddContact />)} className="btn">
        ADD CONTACT
      </button>
    </div>
  );
}
