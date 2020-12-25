import React from "react";

import { Title } from "../Title/Title";

import s from "./styles/ValuesList.scss";

export const ValuesList = ({ productItem, propsList }) => {
   return (
      <div className={s.valuesList}>
         <div className={s.listContainer}>
            {propsList.map(({ propName, hasDiff }, i) => {
               if (propName === "badges") {
                  return <span>Badges</span>;
               } else {
                  return (
                     <Title
                        key={propName + i}
                        title={productItem[propName]}
                        style={`${s.propertyItem} ${hasDiff ? s.hasDiff : ""}`}
                     />
                  );
               }
            })}
         </div>
      </div>
   );
};
