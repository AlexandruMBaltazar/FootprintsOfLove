import React from "react";
import * as guidesInfo from "./guindesInfo";
import { useParams } from "react-router-dom";
import Guide from "./Guide";

const Guides = (props) => {
  let { guideName } = useParams();
  let guideType = guidesInfo
    .getGuides()
    .find((guideTypes) => guideTypes.link === guideName);

  return guideType.guides.map((guide, key) => {
    return <Guide key={key} guide={guide} />;
  });
};

export default Guides;
