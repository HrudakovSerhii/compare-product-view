import React from "react";

import s from "./styles/PropertyList.scss";

export const PropertyList = ({ propsList }) => {
   return (
      <div className={s.propertyList}>
         <div className={s.listContainer}>
            {propsList.map(({ propName, hasDiff }, i) => {
               return (
                  <div key={propName + i} className={`${s.propertyItem} ${hasDiff ? s.hasDiff : ""}`}>
                     <label>{propName}</label>
                  </div>
               );
            })}
         </div>
      </div>
   );
};
