import React from "react";

import { PROP_AS_ID } from "../../core/hooks";

import { Image } from "../Image/Image";
import { ValuesList } from "../ValuesList/ValuesList";

import s from "./styles/ProductListItem.scss";

export const ProductListItem = ({ productItem, propsList, isActive, onItemRemove }) => {
   return (
      <div className={`${s.productItem} ${!isActive ? s.disabled : ""}`}>
         <div className={s.header}>
            <div className={s.imageContainer}>
               <Image path={productItem["productImage"]} />
               <div className={s.removeItemContainer}>
                  <input type="checkbox" onChange={() => onItemRemove(productItem[PROP_AS_ID])} title={"Remove"} />
                  <label>Remove</label>
               </div>
            </div>
            <div className={s.titleContainer}></div>
            <div className={s.priceContainer}></div>
         </div>
         <div className={s.propListContainer}>
            <ValuesList productItem={productItem} propsList={propsList} />
         </div>
      </div>
   );
};
