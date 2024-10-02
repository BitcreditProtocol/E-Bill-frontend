import React, { useContext } from "react";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import attachment from "../../assests/attachment.svg";
import { MainContext } from "../../context/MainContext";
import copy from "../../assests/copy.svg";

export default function RepayPage({ data }) {
  const { copytoClip } = useContext(MainContext);
  return (
    <div className="Repay">
      <Header title="Pay" />
      {/*<UniqueNumber UID="001" date="16-Feb-2023" />*/}
      <div className="Repay-body">
        <div className="head">
          <TopDownHeading upper="Against this" lower="Bill Of Exchange" />
          <IconHolder icon={attachment} />
        </div>
        <div className="col">
          <span>Send to</span>
          <span className="colored">{data.payee.name}</span>
        </div>
        <div className="inline">
          <span>the sum of </span>
          <span className="colored">
            {data.currency_code} {data.amount_numbers}
          </span>
        </div>
        <div className="col mtt">
          <label htmlFor="wallet">Link to pay:</label>
          <span
            className="select-opt"
            onClick={() =>
              copytoClip(data.link_to_pay, "You copied link to pay")
            }
          >
            {data.link_to_pay?.slice(0, 8)}...
            {data.link_to_pay?.slice(
              data.link_to_pay?.length - 4,
              data.link_to_pay?.length
            )}
            <img
              style={{
                width: "5vw",
                height: "5vw",
                display: "inline",
                verticalAlign: "middle",
                marginLeft: "2vw",
              }}
              src={copy}
            />
          </span>
        </div>
        <div className="col mtt">
          <label htmlFor="wallet">Address to pay:</label>
          <span
            className="select-opt"
            onClick={() =>
              copytoClip(data.address_to_pay, "You copied address to pay")
            }
          >
            {data.address_to_pay?.slice(0, 8)}...
            {data.address_to_pay?.slice(
              data.address_to_pay?.length - 4,
              data.address_to_pay?.length
            )}
            <img
              style={{
                width: "5vw",
                height: "5vw",
                display: "inline",
                verticalAlign: "middle",
                marginLeft: "2vw",
              }}
              src={copy}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
