import React from "react";
import Arrow from "../elements/Arrow";

export default function Amount({ color, amount, currency, degree }) {
  return (
    <div
      className={`home-container-amount-single ${
        amount > 9999 ? "home-amount-hov" : ""
      }`}
      data-set={amount}
    >
      <Arrow color={color} rotate={degree} />
      <span style={{ textTransform: "uppercase", color: `#${color}` }}>
        {amount > 9999 ? amount?.toString()?.slice(0, 4) + "..." : amount}{" "}
        <span className="currency">{currency}</span>
      </span>
    </div>
  );
}
