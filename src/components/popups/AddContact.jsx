import React, {useContext, useState} from "react";
import closeIcon from "../../assests/close-btn.svg";
import addIcon from "../../assests/add.svg";
import {MainContext} from "../../context/MainContext";

export default function AddContact() {
  const { showPopUp, setToast, handleAddContact } = useContext(MainContext);
  const [contact, setContact] = useState({ name: "", peer_id: "" });
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (contact.name === "") {
      setToast("Name can not be empty");
    } else if (contact.peer_id === "") {
      setToast("Peer Id can not be empty");
    } else {
      handleAddContact(contact);
    }
  };
  return (
    <div className="contact add-contact">
      <div className="contact-head">
        <span className="contact-head-title">CONTACT</span>
        <img
          className="close-btn"
          onClick={() => showPopUp(false, "")}
          src={closeIcon}
        />
      </div>
      <div className="contact-body">
        <input
          className="input-contact"
          type="text"
          name="name"
          id="name"
          value={contact.name}
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input
          className="input-contact"
          type="text"
          name="peer_id"
          id="peer_id"
          value={contact.peer_id}
          placeholder="Node Identity"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className="btn">
        <img src={addIcon} />
        <span>SAVE CONTACT</span>
      </button>
    </div>
  );
}
