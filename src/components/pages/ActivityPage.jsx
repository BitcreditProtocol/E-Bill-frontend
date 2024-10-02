import React, { useState } from "react";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import fitler from "../../assests/Vector.svg";
import BillDetails from "../elements/BillDetails";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import PopedUp from "../popups/PopedUp";

function ActivityPage() {
  const { bills_list } = useContext(MainContext);
  const [filter, setFilter] = useState({
    imPayee: false,
    imDrawee: false,
    imDrawer: false,
  });
  const [filterPop, setFilterPop] = useState(false);
  const changleHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.checked });
  };
  const toggleFilterPop = (e) => {
    setFilterPop(!filterPop);
  };
  let titleOptions = [];
  if (filter.imPayee) {
    titleOptions.push("Payee");
  }
  if (filter.imDrawee) {
    titleOptions.push("Payer");
  }
  if (filter.imDrawer) {
    titleOptions.push("Drawer");
  }
  if (!filter.imPayee && !filter.imDrawee && !filter.imDrawer) {
    titleOptions.push("Payee", "Payer", "Drawer");
  }
  let titleName = titleOptions.join(" | ");
  return (
    <div className="activity">
      <Header backHeader route="home" />
      <div className="head">
        <TopDownHeading upper={"All | " + titleName} />
        <IconHolder handleClick={toggleFilterPop} icon={fitler} />
      </div>
      {filterPop && <PopedUp filter={filter} changleHandler={changleHandler} />}
      <div className="bills">
        <BillDetails
          setFilterPop={setFilterPop}
          filter={filter}
          color="a3a3a3"
          data={bills_list}
        />
      </div>
    </div>
  );
}

export default ActivityPage;
