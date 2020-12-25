import React from "react";

import { PropertyList } from "../PropertyList/PropertyList";

import s from "./styles/ProductListItem.scss";
import { PROP_AS_ID } from "../../core/hooks";

// propList - list of props. to compare. Same as in

export const ProductListItem = ({ productItem, propsList, valueDiffPropsList, isActive, onItemRemove }) => {
   return (
      <div className={`${s.productItem} ${!isActive ? s.disabled : ""}`}>
         <div className={s.header}>
            <div className={s.imageContainer}>
               <div className={s.removeItemContainer}>
                  <input type="checkbox" onChange={() => onItemRemove(productItem[PROP_AS_ID])} title={"Remove"} />
                  <label>Remove</label>
               </div>
            </div>
            <div className={s.titleContainer}></div>
            <div className={s.priceContainer}></div>
         </div>
         <div className={s.propListContainer}>
            <PropertyList propsList={propsList} valueDiffPropsList={valueDiffPropsList} />
         </div>
      </div>
   );
};
