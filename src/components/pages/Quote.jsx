import React, {useContext, useEffect, useState} from "react";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import attachment from "../../assests/attachment.svg";
import UniqueNumber from "../sections/UniqueNumber";
import { MainContext } from "../../context/MainContext";
import copy from "../../assests/copy.svg";

export default function Quote({ data }) {

    const { copytoClip } = useContext(MainContext);

    const [singleQuote, setSingleQuote] = useState();
    useEffect(() => {
        fetch(`http://localhost:8000/quote/return/${data.name}`)
            .then((res) => res.json())
            .then((data) => {
                setSingleQuote(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


  const { handlePage, showPopUp, showPopUpSecondary, handleRefresh } =
    useContext(MainContext);
  const handleSubmit = async () => {
    const form_data = new FormData();
    form_data.append("bill_name", data.name);
    fetch(`http://localhost:8000/quote/accept/${data.name}`)
        .then((response) => {
        console.log(response);
        handleRefresh();
      })
      .catch((err) => err);
  };

  return (
    <div className="accept">
      <Header title="Quote" />
      <div className="accept-container">
        <div className="accept-container-content">
            <div className="block mt">
                <span className="block mt-5">
                    <span className="accept-heading">quote id </span>
                    <span className="detail">
                        {singleQuote?.quote_id}
                    </span>
                </span>
                <span className="block mt-5">
                    <span className="accept-heading">quote sum </span>
                    <span className="detail">
                        {data.currency_code}, {singleQuote?.amount}
                    </span>
                </span>
                <span className="block mt">
                    <span className="accept-heading">token </span>
                    <span className="block detail" onClick={() =>
                        copytoClip(singleQuote?.token, "You copied token")
                    }>
                        {singleQuote?.token?.slice(0, 8)}...
                        {singleQuote?.token?.slice(
                            singleQuote?.token?.length - 4,
                            singleQuote?.token?.length
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
                </span>
            </div>
            {(() => {
                if (!singleQuote?.token) {
                    return <button className="btn mtt" onClick={handleSubmit}>
                        ACCEPT
                    </button>;
                }
            })()}
        </div>
      </div>
    </div>
  );
}
