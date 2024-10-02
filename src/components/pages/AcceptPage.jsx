import React, { useContext } from "react";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import attachment from "../../assests/attachment.svg";
import { MainContext } from "../../context/MainContext";

export default function AcceptPage({ data }) {
  const { identity, handlePage, showPopUp, showPopUpSecondary } =
    useContext(MainContext);
  const handleSubmit = async () => {
    const form_data = new FormData();
    form_data.append("bill_name", data.name);
    await fetch("http://localhost:8000/bill/accept", {
      method: "POST",
      body: form_data,
      mode: "cors",
    })
      .then((response) => {
        console.log(response);
        showPopUpSecondary(false, "");
        showPopUp(false, "");
        handlePage("home");
      })
      .catch((err) => err);
  };
  return (
    <div className="accept">
      <Header title="Accept" />
      {/*<UniqueNumber UID="001" date="16-Feb-2023" />*/}
      <div className="head">
        <TopDownHeading upper="Against this" lower="Bill Of Exchange" />
        <IconHolder icon={attachment} />
      </div>
      <div className="accept-container">
        <div className="accept-container-content">
          {/*<div className="block">*/}
          {/*  <span className="accept-heading">Drawer:</span>*/}
          {/*  <span className="detail block">{identity.name}</span>*/}
          {/*</div>*/}
          <div className="block">
            <span className="accept-heading">Drawee:</span>
            <span className="detail block">{data.drawee.name}</span>
          </div>
          <div className="block mt">
            <span className="block">
              <span className="accept-heading">Date of issue </span>
              <span className="detail">{data.date_of_issue}</span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">Maturity date </span>
              <span className="detail">{data.maturity_date}</span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">to the order of </span>
              <span className="detail">{data.payee.name} </span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">the sum of </span>
              <span className="detail">
                {data.currency_code} {data.amount_numbers}
              </span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">Place of drawing </span>
              <span className="detail">{data.place_of_drawing} </span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">Place of payment </span>
              <span className="detail">{data.place_of_payment} </span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">Bill jurisdiction </span>
              <span className="detail">{data.bill_jurisdiction} </span>
            </span>
            <span className="block mt-5">
              <span className="accept-heading">Language </span>
              <span className="detail">{data.language} </span>
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
