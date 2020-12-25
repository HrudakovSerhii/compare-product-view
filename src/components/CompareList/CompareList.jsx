import React from "react";

import s from "./styles/CompareList.scss";

export const CompareList = ({ updateProductsToCompare, productsToCompare = [] }) => {
   return (
      <div className={s.compareList}>
         <label>Je Selectie</label>
         <div className={s.listContainer}>
            {productsToCompare.map(({ id, name, active }, i) => (
               <div
                  key={name + i}
                  className={`${s.itemContainer} ${active ? s.active : ""}`}
                  onClick={() => updateProductsToCompare(id, !active)}
               >
                  <input readOnly checked={active} type="checkbox" />
                  <label>{name}</label>
               </div>
            ))}
         </div>
      </div>
   );
};
