import React, { useContext, useState } from "react";
import closeIcon from "../../assests/close-btn.svg";
import { MainContext } from "../../context/MainContext";

export default function EditContact({ old_info }) {
  const { showPopUp, handleEditContact, setToast } = useContext(MainContext);
  const [name, setName] = useState(old_info.name);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = () => {
    if (name) {
      handleEditContact(
        old_info.name,
        { name: name, node_id: old_info.node_id },
        showPopUp
      );
    } else {
      setToast("Name cannot be empty");
    }
  };
  return (
    <div className="contact edit-contact">
      <div className="contact-head">
        <span className="contact-head-title">CHANGE CONTACT</span>
        <img
          className="close-btn"
          onClick={() => showPopUp(false, "")}
          src={closeIcon}
        />
      </div>
      <div className="contact-body">
        <input
          className="input-contact"
          style={{ background: "#ebebeb" }}
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="New Name"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className="btn">
        UPDATE CONTACT
      </button>
    </div>
  );
}
