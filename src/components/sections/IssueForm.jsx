import React, { useContext, useEffect, useState } from "react";
import SelectSearchOption from "../elements/SelectSearchOption";
import { MainContext } from "../../context/MainContext";

export default function IssueForm() {
  const { contacts, handlePage, handleRefresh, setToast } =
    useContext(MainContext);
  const [errorInput, setErrorInput] = useState(false);
  // Set data for bill issue
  const [data, setData] = useState({
    maturity_date: "",
    payee_name: "",
    currency_code: "sat",
    amount_numbers: "",
    drawee_name: "",
    drawer_name: "",
    place_of_drawing: "",
    place_of_payment: "",
    bill_jurisdiction: "",
    date_of_issue: "",
    language: "en",
    drawer_is_payee: false,
    drawer_is_drawee: false,
  });
  const [click, setClick] = useState(true);
  const changeHandle = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "amount_numbers") {
      let val = value.replace(/[^0-9/.]/g, "");
      setData({ ...data, [name]: val });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const checkHandleSearch = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    const isValidOption = contacts.some((d) => d.name == value);
    if (isValidOption || value === "") {
      setData({ ...data, [name]: value });
    } else {
      setData({ ...data, [name]: "" });
    }
  };
  const handleChangeDrawerIsPayee = (e) => {
    let value = !data.drawer_is_payee;
    let name = e.target.name;
    setData({ ...data, [name]: value });
  };
  const handleChangeDrawerIsDrawee = (e) => {
    let value = !data.drawer_is_drawee;
    let name = e.target.name;
    setData({ ...data, [name]: value });
  };
  const handleSubmition = (e) => {
    e.preventDefault();
    if (click) {
      if (!errorInput) {
        setClick(false);
        const form_data = new FormData();
        form_data.append("bill_jurisdiction", data.bill_jurisdiction);
        form_data.append("place_of_drawing", data.place_of_drawing);
        form_data.append("amount_numbers", data.amount_numbers);
        form_data.append("currency_code", data.currency_code);
        form_data.append("language", data.language);
        form_data.append("drawee_name", data.drawee_name);
        form_data.append("payee_name", data.payee_name);
        form_data.append("place_of_payment", data.place_of_payment);
        form_data.append("maturity_date", data.maturity_date);
        form_data.append("drawer_is_payee", data.drawer_is_payee);
        form_data.append("drawer_is_drawee", data.drawer_is_drawee);
        setToast("Please Wait...");
        fetch("http://localhost:8000/bill/issue", {
          method: "POST",
          body: form_data,
          mode: "cors",
        })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              setToast("You Bill is Added.");
            } else {
              setToast("Some error happened.");
            }
            handleRefresh();
            handlePage("home");
            setClick(true);
          })
          .catch((err) => {
            setClick(true);
            console.log(err);
          });
      } else {
        setToast("Please check the Errors");
      }
    } else {
      setToast("Please Wait...");
    }
  };
  const [currentDateGmt, setCurrentDateGmt] = useState("");

  useEffect(() => {
    // Get the current date in GMT
    const currentDate = new Date().toJSON().slice(0, 10);
    setCurrentDateGmt(currentDate);
  }, []);

  return (
    <form className="form" onSubmit={handleSubmition}>
      <div className="form-input">
        <label htmlFor="maturity_date">Maturity date</label>
        <div className="form-input-row">
          <input
            className="drop-shadow"
            id="maturity_date"
            name="maturity_date"
            min={currentDateGmt}
            value={data.maturity_date}
            onChange={changeHandle}
            checkHandleSearch={checkHandleSearch}
            type="date"
            placeholder={currentDateGmt}
            required
          />
        </div>
      </div>
      <div className="flex-row">
        <div className="form-input flex-grow">
          <label htmlFor="drawee_name">to the order of</label>
          <div className="form-input-row search-select">
            <SelectSearchOption
              placingHolder="Payee Company, Zurich"
              identity="payee_name"
              checkCheck={data.drawer_is_payee}
              valuee={data.payee_name}
              changeHandle={changeHandle}
              checkHandleSearch={checkHandleSearch}
              options={contacts}
            />
          </div>
        </div>
        <label className="flex-col align-center" htmlFor="drawer_is_payee">
          <span className="me-text">me</span>
          <div className="form-input-row">
            <input
              disabled={data?.drawer_is_drawee || data?.payee_name}
              type="checkbox"
              id="drawer_is_payee"
              name="drawer_is_payee"
              checked={data.drawer_is_payee}
              onChange={handleChangeDrawerIsPayee}
            />
            <span
              className="check-boxes"
              style={{
                borderColor: `#${data.drawer_is_payee ? "F7931A" : "545454"}`,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4vw"
                height="3vw"
                viewBox="0 0 15 12"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.1757 0.762852C14.5828 1.13604 14.6104 1.76861 14.2372 2.17573L5.98716 11.1757C5.79775 11.3824 5.53031 11.5 5.25001 11.5C4.9697 11.5 4.70226 11.3824 4.51285 11.1757L0.762852 7.08482C0.389659 6.6777 0.417162 6.04514 0.824281 5.67194C1.2314 5.29875 1.86397 5.32625 2.23716 5.73337L5.25001 9.02011L12.7629 0.824281C13.136 0.417162 13.7686 0.389659 14.1757 0.762852Z"
                  fill={`#${data.drawer_is_payee ? "F7931A" : "545454"}`}
                />
              </svg>
            </span>
          </div>
        </label>
      </div>
      <div className="form-input">
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
                <option value="sat">sat</option>
                <option value="usd">usd</option>
            </select>
          </span>
            <input
                className="drop-shadow"
            style={{
              border: `.7vw solid ${errorInput ? "#d40202" : "transparent"}`,
            }}
            name="amount_numbers"
            value={data.amount_numbers}
            onChange={changeHandle}
            onKeyUp={(e) => {
              if (/[^0-9]/g.test(e.target.value) || e.target.value[0] == 0) {
                setToast("This field's only accepts Integers.");
                setErrorInput(true);
              } else {
                setToast("");
                setErrorInput(false);
              }
            }}
            type="number"
            placeholder="10000"
            required
          />
        </div>
      </div>
      <div className="flex-row">
        <div className="form-input flex-grow">
          <label htmlFor="drawee_name">Drawee</label>
          <div className="form-input-row search-select">
            <SelectSearchOption
              identity="drawee_name"
              placingHolder="Drawee Company, Vienna"
              checkCheck={data.drawer_is_drawee}
              valuee={data.drawee_name}
              changeHandle={changeHandle}
              checkHandleSearch={checkHandleSearch}
              options={contacts}
            />
          </div>
        </div>
        <label className="flex-col align-center" htmlFor="drawer_is_drawee">
          <span className="me-text">me</span>
          <div className="form-input-row">
            <input
              disabled={data.drawer_is_payee || data.drawee_name}
              type="checkbox"
              id="drawer_is_drawee"
              name="drawer_is_drawee"
              onChange={handleChangeDrawerIsDrawee}
              checked={data.drawer_is_drawee}
            />
            <span
              className="check-boxes"
              style={{
                borderColor: `#${data.drawer_is_drawee ? "F7931A" : "545454"}`,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4vw"
                height="3vw"
                viewBox="0 0 15 12"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.1757 0.762852C14.5828 1.13604 14.6104 1.76861 14.2372 2.17573L5.98716 11.1757C5.79775 11.3824 5.53031 11.5 5.25001 11.5C4.9697 11.5 4.70226 11.3824 4.51285 11.1757L0.762852 7.08482C0.389659 6.6777 0.417162 6.04514 0.824281 5.67194C1.2314 5.29875 1.86397 5.32625 2.23716 5.73337L5.25001 9.02011L12.7629 0.824281C13.136 0.417162 13.7686 0.389659 14.1757 0.762852Z"
                  fill={`#${data.drawer_is_drawee ? "F7931A" : "545454"}`}
                />
              </svg>
            </span>
          </div>
        </label>
      </div>
      <div className="form-input">
        <label htmlFor="place_of_drawing">Place of drawing</label>
        <div className="form-input-row">
          <input
            id="place_of_drawing"
            name="place_of_drawing"
            value={data.place_of_drawing}
            onChange={changeHandle}
            type="text"
            placeholder="Zurich"
            required
          />
        </div>
      </div>
      <div className="form-input">
        <label htmlFor="place_of_payment">Place of payment</label>
        <div className="form-input-row">
          <input
            id="place_of_payment"
            name="place_of_payment"
            value={data.place_of_payment}
            onChange={changeHandle}
            type="text"
            placeholder="London"
            required
          />
        </div>
      </div>
      <div className="form-input">
        <label htmlFor="bill_jurisdiction">Bill jurisdiction</label>
        <div className="form-input-row">
          <input
            id="bill_jurisdiction"
            name="bill_jurisdiction"
            value={data.bill_jurisdiction}
            onChange={changeHandle}
            type="text"
            placeholder="UK"
            required
          />
        </div>
      </div>
      <div className="form-input" hidden={true}>
        <label htmlFor="language">Language</label>
        <div className="form-input-row">
          <input
            id="language"
            name="language"
            value={data.language}
            onChange={changeHandle}
            type="text"
            required
            readOnly={true}
          />
        </div>
      </div>
      {/*<div className="form-input">*/}
      {/*  <label htmlFor="maturity_date">Date of issue</label>*/}
      {/*  <div className="form-input-row">*/}
      {/*    <input*/}
      {/*      className="drop-shadow"*/}
      {/*      id="date_of_issue"*/}
      {/*      name="date_of_issue"*/}
      {/*      value={data.date_of_issue}*/}
      {/*      onChange={changeHandle}*/}
      {/*      type="date"*/}
      {/*      placeholder="16 May 2023"*/}
      {/*      required*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <input
        disabled={!click}
        className="btn"
        type="submit"
        value="Issue bill"
      />
    </form>
  );
}
