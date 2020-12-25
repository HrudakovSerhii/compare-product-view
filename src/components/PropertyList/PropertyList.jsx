import React from "react";

import { Title } from "../Title/Title";

import s from "./styles/PropertyList.scss";

export const PropertyList = ({ propsList }) => {
   return (
      <div className={s.propertyList}>
         <div className={s.listContainer}>
            {propsList.map(({ propName, hasDiff }, i) => (
               <Title key={propName + i} title={propName} style={`${s.propertyItem} ${hasDiff ? s.hasDiff : ""}`} />
            ))}
         </div>
      </div>
   );
};
