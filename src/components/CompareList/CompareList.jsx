import React from "react";

import { Title } from "../Title/Title";

import s from "./styles/CompareList.scss";

export const CompareList = ({ updateProductsToCompare, productsToCompare = [] }) => {
   return (
      <div className={s.compareList}>
         <Title title="Je Selectie" style={s.title} />
         <>
            {productsToCompare.map(({ id, name, isActive }, i) => (
               <div
                  key={name + i}
                  className={`${s.itemContainer} ${isActive ? s.active : ""}`}
                  onClick={() => updateProductsToCompare(id, !isActive)}
               >
                  <input readOnly checked={isActive} type="checkbox" />
                  <Title title={name} style={s.itemTitle} />
               </div>
            ))}
         </>
      </div>
   );
};
