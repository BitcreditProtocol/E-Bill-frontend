import React, { useEffect, useState } from "react";
import deleteBtn from "../assests/delete.svg";
import editBtn from "../assests/edit.svg";
import copyIcon from "../assests/copy.svg";
import EditContact from "./popups/EditContact";
export default function SingleContact({
  copytoClip,
  showPopUp,
  handleDelete,
  name,
  PeerId,
}) {
  const [displayName, setDisplayName] = useState(true);
  const handleName = () => {
    if (!displayName) {
      setDisplayName(true);
    } else {
      setDisplayName(false);
    }
  };

  const copyPeerId = () => {
    if (!displayName) copytoClip(PeerId, `${name} Node Identity is copied`);
  };
  return (
    <div className="contact-body-user">
      <span className="flexgap" onClick={copyPeerId}>
        <span className="contact-body-user-name" onClick={handleName}>
          {displayName
            ? name
            : PeerId.slice(0, 5) +
              "..." +
              PeerId.slice(PeerId.length - 5, PeerId.length)}
        </span>
        {!displayName && <img className="copyicon" src={copyIcon} />}
      </span>
      <span className="flexgap">
        <img
          onClick={() => {
            showPopUp(
              true,
              <EditContact old_info={{ name: name, node_id: PeerId }} />
            );
            setDisplayName(true);
          }}
          src={editBtn}
        />
        <img onClick={() => handleDelete(name)} src={deleteBtn} />
      </span>
    </div>
  );
}
