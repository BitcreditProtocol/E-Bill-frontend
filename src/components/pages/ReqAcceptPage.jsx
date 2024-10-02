import React, { useContext } from "react";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import attachment from "../../assests/attachment.svg";
import UniqueNumber from "../sections/UniqueNumber";
import { MainContext } from "../../context/MainContext";

export default function ReqAcceptPage({ data }) {
  const { handlePage, showPopUp, showPopUpSecondary, handleRefresh } =
    useContext(MainContext);
  const handleSubmit = async () => {
    const form_data = new FormData();
    form_data.append("bill_name", data.name);
    await fetch("http://localhost:8000/bill/request_to_accept", {
      method: "POST",
      body: form_data,
      mode: "cors",
    })
      .then((response) => {
        console.log(response);
        showPopUpSecondary(false, "");
        showPopUp(false, "");
        handlePage("home");
        handleRefresh();
      })
      .catch((err) => err);
  };

  return (
    <div className="accept">
      <Header title="Request Acceptance" />
      <UniqueNumber UID={data.place_of_payment} date={data.date_of_issue} />
      <div className="head">
        <TopDownHeading upper="Against this" lower="Bill Of Exchange" />
        <IconHolder icon={attachment} />
      </div>
      <div className="accept-container">
        <div className="accept-container-content">
          <div className="block mt">
            <span className="accept-heading">please accept to</span>
            <span className="block mt-5">
              <span className="accept-heading">pay on </span>
              <span className="detail">{data.date_of_issue}</span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">the sum of </span>
              <span className="detail">
                {data.currency_code}, {data.amount_numbers}
              </span>
            </span>
            <span className="block mt">
              <span className="accept-heading">to the order of </span>
              <span className="block detail">
                {data.payee.name}, {data.place_of_payment}
              </span>
            </span>
            <span className="block mt">
              <span className="accept-heading">Drawee: </span>
              <span className="block detail">
                {data.drawee.name}, {data.place_of_drawing}
              </span>
            </span>
            <span className="block mt">
              <span className="accept-heading">Requested by: </span>
              <span className="block detail">
                {data.payee.name}, {data.place_of_payment}
              </span>
            </span>
          </div>
          <button className="btn mtt" onClick={handleSubmit}>
            SIGN
          </button>
        </div>
      </div>
    </div>
  );
}
