import React, {useContext} from "react";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import attachment from "../../assests/attachment.svg";
import {MainContext} from "../../context/MainContext";
import copy from "../../assests/copy.svg";

export default function RepayPage({ data }) {
  const { copytoClip } = useContext(MainContext);
  return (
    <div className="Repay">
      <Header title="Buy" />
      {/*<UniqueNumber UID="001" date="16-Feb-2023" />*/}
      <div className="Repay-body">
        <div className="head">
          <TopDownHeading upper="Against this" lower="Bill Of Exchange" />
          <IconHolder icon={attachment} />
        </div>
        <div className="col">
          <span>Send to</span>
          <span className="colored">{data.seller.name}</span>
        </div>
        <div className="inline">
          <span>the sum of </span>
          <span className="colored">
            {data.currency_code} {data.amount_for_selling}
          </span>
        </div>
        <div className="col mtt">
          <label htmlFor="wallet">Link to pay:</label>
          <span
            className="select-opt"
            onClick={() =>
              copytoClip(data.link_for_buy, "You copied link to pay")
            }
          >
            {data.link_for_buy?.slice(0, 8)}...
            {data.link_for_buy?.slice(
              data.link_for_buy?.length - 4,
              data.link_for_buy?.length
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
              copytoClip(data.address_for_selling, "You copied address to pay")
            }
          >
            {data.address_for_selling?.slice(0, 8)}...
            {data.address_for_selling?.slice(
              data.address_for_selling?.length - 4,
              data.address_for_selling?.length
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
