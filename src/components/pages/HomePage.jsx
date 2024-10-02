import React, { useContext, useEffect } from "react";
import HomeHeader from "../sections/HomeHeader";
import Amount from "../elements/Amount";
import SubHeading from "../elements/SubHeading";
import SubTotal from "../elements/SubTotal";
import BillDetails from "../elements/BillDetails";
import Payments from "../elements/Payments";
import { MainContext } from "../../context/MainContext";

export default function HomePage() {
  const { amount, currency, bills_list } = useContext(MainContext);
  // find all bills event
  useEffect(() => {
    try {
      fetch("http://localhost:8000/bill/dht");
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="home">
      <HomeHeader />
      <div className="home-container">
        <div className="home-container-amount">
          <Amount
            color="38A665"
            currency={currency}
            amount={amount?.bill}
            degree="0"
          />
          <hr className="home-container-amount-line" />
          <Amount
            color="C30000"
            currency={currency}
            amount={amount?.iou}
            degree="180"
          />
        </div>
        <div className="home-container-heading">
          <SubHeading rotate="0" route="issue" color="38A665" currency="Bill" />
          <SubHeading rotate="180" route="dont" color="C30000" currency="IOU" />
        </div>
        <div className="home-container-total">
          <SubTotal
            color="a3a3a3"
            currency={currency}
            amount={amount?.endors}
          />
        </div>
        <div className="line"></div>
        <div className="home-container-bills">
          <BillDetails color="a3a3a3" data={bills_list?.slice(0, 4)} />
        </div>
        {bills_list?.length > 4 && (
          <div className="home-container-payments">
            <Payments
              payments={bills_list?.length + " All Payments"}
              history="Full Payment History"
            />
          </div>
        )}
      </div>
    </div>
  );
}
