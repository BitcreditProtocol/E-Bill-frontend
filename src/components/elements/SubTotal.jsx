import React from "react";
import Arrow from "./Arrow";

function SubTotal({ color, amount, currency }) {
  return (
    <div className="home-container-total-single ">
      <Arrow color={color} />
      <span style={{ textTransform: "uppercase", color: `#${color}` }}>
        {amount} <span className="currency">{currency}</span>
      </span>
    </div>
  );
}

export default SubTotal;
