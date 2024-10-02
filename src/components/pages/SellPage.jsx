import React, { useContext, useState } from "react";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import attachment from "../../assests/attachment.svg";
import UniqueNumber from "../sections/UniqueNumber";
import { MainContext } from "../../context/MainContext";
import SelectSearchOption from "../elements/SelectSearchOption";

export default function SellPage({ data }) {
  const {
    handlePage,
    contacts,
    setToast,
    showPopUp,
    showPopUpSecondary,
    handleRefresh,
  } = useContext(MainContext);

  const [dataForm, setDataForm] = useState({
    amount_numbers: "",
    buyer: "",
    currency_code: "",
  });

  const changeHandle = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "amount_numbers") {
      let val = value.replace(/[^0-9/.]/g, "");
      setDataForm({ ...dataForm, [name]: val });
    } else {
      setDataForm({ ...dataForm, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const form_data = new FormData();
    form_data.append("bill_name", data.name);
    form_data.append("buyer", dataForm.buyer);
    form_data.append("amount_numbers", dataForm.amount_numbers);
    form_data.append("currency_code", dataForm.currency_code);

      if (dataForm.amount_numbers && dataForm.buyer) {
      await fetch("http://localhost:8000/bill/sell", {
        method: "POST",
        body: form_data,
        mode: "cors",
      })
        .then((response) => {
          console.log(response);
          setToast(`Please Wait...`);
          if (response.status === 200) {
            showPopUpSecondary(false, "");
            showPopUp(false, "");
            handlePage("home");
            handleRefresh();
            setToast(`You have successfully sold a bill.`);
          } else {
            setToast(`Something is wrong try again later.`);
          }
        })
        .catch((err) => err);
    } else {
      setToast(
        `Please ${!dataForm.buyer ? "Select Buyer's Name" : "Enter Amount"}.`
      );
    }
  };

  const checkHandleSearch = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    const isValidOption = contacts.some((d) => d.name == value);
    if (isValidOption || value === "") {
      setDataForm({ ...dataForm, [name]: value });
    } else {
      setDataForm({ ...dataForm, [name]: "" });
    }
  };
  console.log(dataForm);
  return (
    <div className="accept">
      <Header title="Sell" />
      <UniqueNumber UID={data.place_of_payment} date={data.date_of_issue} />
      <div className="head">
        <TopDownHeading upper="Against this" lower="Bill Of Exchange" />
        <IconHolder icon={attachment} />
      </div>
      <div className="accept-container">
        <div className="accept-container-content">
          <div className="block mt">
            <span className="block">
              <span className="accept-heading">pay on </span>
              <span className="detail">{data.date_of_issue}</span>
            </span>
            <span className="block">
              <span className="accept-heading">the sum of </span>
              <span className="detail">
                {data.currency_code} {data.amount_numbers}
              </span>
            </span>
            <span className="block mt">
              <span className="accept-heading">sell to the order of </span>
              <span className="block detail input-blank search-select">
                <SelectSearchOption
                  identity="buyer"
                  placingHolder="Select Your Buyer"
                  class="endorse-select"
                  valuee={dataForm.buyer}
                  changeHandle={changeHandle}
                  checkHandleSearch={checkHandleSearch}
                  options={contacts}
                />
              </span>
            </span>

            <span className="block mt">
              <label htmlFor="amount_numbers">the sum of</label>
              <div className="form-input-row">
                <span className="select-opt">
                  <select
                      style={{
                          appearance: "none",
                          MozAppearance: "none",
                          WebkitAppearance: "none",
                      }}
                      className="form-select"
                      id="currency_code"
                      name="currency_code"
                      onChange={changeHandle}
                      placeholder="sat"
                      required
                  >
                    <option value={data.currency_code}>sat</option>
                    <option value={data.currency_code}>usd</option>
                  </select>
                </span>
                <input
                    className="drop-shadow"
                  name="amount_numbers"
                  value={dataForm.amount_numbers}
                  onChange={changeHandle}
                  type="number"
                  placeholder="10000"
                  required
                />
              </div>
            </span>

            <span className="block mt">
              <span className="accept-heading">Payer: </span>
              <span className="block detail">
                {data.drawee.name}, {data.place_of_drawing}
              </span>
            </span>
            <span className="block mt">
              <span className="accept-heading">Sold by: </span>
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
