import React from "react";

import { Title } from "../Title/Title";

import s from "./styles/CompareList.scss";

export const CompareList = ({ updateProductsToCompare, productsToCompare = [] }) => {
   return (
      <div className={s.compareList}>
         <Title title="Je Selectie" style={s.title} />
         <>
            {productsToCompare.map(({ id, name, active }, i) => (
               <div
                  key={name + i}
                  className={`${s.itemContainer} ${active ? s.active : ""}`}
                  onClick={() => updateProductsToCompare(id, !active)}
               >
                  <input readOnly checked={active} type="checkbox" />
                  <Title title={name} />
               </div>
            ))}
         </>
      </div>
   );
};
