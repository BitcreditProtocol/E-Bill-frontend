import React from "react";
import IssueForm from "../sections/IssueForm";
import Header from "../sections/Header";
import TopDownHeading from "../elements/TopDownHeading";
import IconHolder from "../elements/IconHolder";
import attachment from "../../assests/attachment.svg";

export default function IssuePage() {
  return (
    <div className="issue">
      <Header title="Issue" />
      {/*<UniqueNumber UID="001" date="16-Feb-2023" />*/}
      <div className="head">
        <TopDownHeading upper="Against this" lower="Bill Of Exchange" />
        <IconHolder icon={attachment} />
      </div>
      <IssueForm />
    </div>
  );
}
