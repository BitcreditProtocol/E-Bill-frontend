import React, { useContext, useEffect, useState } from "react";
import IconHolder from "../elements/IconHolder";
import back from "../../assests/back.svg";
import download from "../../assests/download.svg";
import wechsel from "../../assests/WECHSEL.svg";
import dumySig from "../../assests/Jordan-signature.png";
import Pdf from "react-to-pdf";
import { MainContext } from "../../context/MainContext";

function Bill({ identity, data }) {
  const { showPopUpSecondary } = useContext(MainContext);
  const divRef = React.createRef();
  const [offSet, setOffSet] = useState({
    width: 0,
    height: 0,
  });
  const options = {
    orientation: "portrait",
    unit: "px",
    format: [offSet.width, offSet.height],
  };

  const handlePdfSize = () => {
    const divEle = document.getElementById("main-container");
    setOffSet({
      width: divEle.offsetWidth - divEle.offsetWidth / 2.29,
      height: divEle.offsetHeight - divEle.offsetWidth / 0.805,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handlePdfSize);
    return () => {
      window.removeEventListener("resize", handlePdfSize);
    };
  }, []);
  useEffect(() => {
    handlePdfSize();
  }, []);
  // Options for formatting the date
  const ops = { year: "numeric", month: "long", day: "numeric" };

  // Create a Date object with the input date
  const dateObjectIssue = new Date(data?.date_of_issue);
  const dateObjectMaturity = new Date(data?.maturity_date);

  // Format the date
  const issueDate = dateObjectIssue.toLocaleDateString("en-US", ops);
  const maturityDate = dateObjectMaturity.toLocaleDateString("en-US", ops);
  const [blocks] = data?.chain_of_blocks?.blocks?.filter(
    (d) => d.operation_code === "Accept"
  );
  const signatureAccept = blocks?.signature;
  const signatureIssue = data?.chain_of_blocks?.blocks[0]?.signature;
  const payerName = data?.drawee?.name + ", " + data?.drawee?.company;
  return (
    <div className="billing">
      <div className="top-buttons">
        <IconHolder
          handleClick={() => showPopUpSecondary(false, "")}
          circuled="circule"
          icon={back}
        />
        <Pdf
          targetRef={divRef}
          options={options}
          filename="Bill of exchange.pdf"
        >
          {({ toPdf }) => (
            <IconHolder
              handleClick={toPdf}
              circuled="circule"
              primary="primary"
              icon={download}
            />
          )}
        </Pdf>
      </div>
      <div id="main-container" className="billing-container" ref={divRef}>
        <div className="top-container">
          <div className="head-text">
            {/* <img src={wechsel} /> */}
            <span className="head-text-maintext">BILL OF EXCHANGE</span>
            <span>{blocks?.operation_code === "Accept" && "Accepted"}</span>
          </div>
          <div className="line">
            <span></span>
            <span>
              {blocks &&
                `${signatureAccept?.slice(0, 4)}...${signatureAccept?.slice(
                  signatureAccept?.length - 4,
                  signatureAccept?.length
                )}`}
            </span>
            <span></span>
          </div>
          <div className="unter-text">{blocks && "Acceptor’s signature"}</div>
        </div>
        <div className="details">
          <div className="details-container">
            <div className="details-container-uper">
              <div className="details-container-uper-den">
                <div className="details-container-uper-den-main">
                  <div className="details-container-uper-den-main-first">
                    {data?.place_of_drawing}
                  </div>
                  <div className="details-container-uper-den-main-second">
                    ,
                  </div>
                  <div className="details-container-uper-den-main-third">
                    {issueDate}
                  </div>
                </div>
                <span className="bottom-text">
                  Place and day of the issuance
                </span>
              </div>
              <div className="details-container-uper-zah">
                <div className="details-container-uper-zah-main">
                  <div className="details-container-uper-zah-main-first">
                    Place of payment
                  </div>
                  <div className="details-container-uper-zah-main-second">
                    {data?.place_of_payment}
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="details-container-middle">
              <div className="details-container-middle-date">
                <span className="details-container-middle-date-left">
                  Against this bill of exchange pay on {maturityDate}
                </span>
              </div>
              <div className="details-container-middle-num">
                <span className="details-container-middle-num-text">
                  <span className="details-container-middle-num-text-an">
                    To
                  </span>
                  <span className="details-container-middle-num-text-further">
                    {data?.payee.name}, {data?.payee.postal_address}
                  </span>
                </span>
                <span className="details-container-middle-num-amount">
                  <span className="details-container-middle-num-amount-currency">
                    {data.currency_code}
                  </span>
                  <span className="details-container-middle-num-amount-figures">
                    {data?.amount_numbers}
                  </span>
                </span>
              </div>
              <div className="details-container-middle-letter">
                  {currency({ currency_code: data.currency_code })}
                  <span className="details-container-middle-letter-amount">
                  <span className="details-container-middle-letter-amount-figures">
                    {data?.amounts_letters}
                  </span>
                  <span className="details-container-middle-letter-amount-text">
                    Amount in letters
                  </span>
                </span>
              </div>
            </div>
            <div className="details-container-bottom">
              <div className="details-container-bottom-left">
                <div className="details-container-bottom-left-bez">
                  <span className="details-container-bottom-left-bez-line">
                    <span className="details-container-bottom-left-bez-line-text">
                      Payer
                    </span>
                    <span className="details-container-bottom-left-bez-line-ans">
                      {payerName?.slice(0, 52)}
                    </span>
                  </span>
                  <span className="details-container-bottom-left-bez-next-line">
                    {payerName?.slice(52, payerName?.length)}
                  </span>
                </div>
                <div className="details-container-bottom-left-in">
                  <span className="details-container-bottom-left-in-text">
                    in
                  </span>
                  <span className="details-container-bottom-left-in-further">
                    <span className="details-container-bottom-left-in-further-text">
                      {data?.drawee?.postal_address}
                    </span>
                    <span className="details-container-bottom-left-in-further-bottom">
                      City and street Address
                    </span>
                  </span>
                </div>
                <div className="details-container-bottom-left-detail">
                  <div className="details-container-bottom-left-bez">
                    <span className="details-container-bottom-left-bez-line">
                      <span className="details-container-bottom-left-bez-line-text">
                        Bill Id
                      </span>
                      <span className="details-container-bottom-left-bez-line-ans">
                        {data?.name?.slice(0, 50)}
                      </span>
                    </span>
                    <span className="details-container-bottom-left-bez-next-line">
                      {data?.name?.slice(50, data?.name?.length)}
                    </span>
                  </div>
                  <div className="details-container-bottom-left-in">
                    <span className="details-container-bottom-left-in-text">
                      in
                    </span>
                    <span className="details-container-bottom-left-in-further">
                      <span className="details-container-bottom-left-in-further-text">
                        {data.bill_jurisdiction}
                      </span>
                      <span className="details-container-bottom-left-in-further-bottom">
                        Use for domicile instructions
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="details-container-bottom-signature">
                <span className="signature">
                  {signatureIssue.slice(0, 6)}...
                  {signatureIssue.slice(
                    signatureIssue.length - 6,
                    signatureIssue.length
                  )}
                </span>
                <span>Signature of the drawer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function currency({ currency_code }) {
    return (
        <div>
            {(() => {
                if (currency_code === "sat") {
                    return <span className="details-container-middle-letter-currency">Satoshi</span>;
                } else if (currency_code === "usd") {
                    return <span className="details-container-middle-letter-currency">United States dollar</span>;
                }
            })()}
        </div>
    );
}

export default Bill;
