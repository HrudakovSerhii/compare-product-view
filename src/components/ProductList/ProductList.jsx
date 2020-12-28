import React from "react";

import { ProductListItem } from "../ProductListItem/ProductListItem";

import { PROP_AS_ID } from "../../core/hooks";

import s from "./styles/ProductList.scss";

export const ProductList = ({ products, propsList, productsToCompare, removeFromCompare }) => {
   return (
      <div className={s.productList}>
         {products.map((product) => {
            const isActive = !!productsToCompare.find((p) => p.id === product[PROP_AS_ID] && p.isActive);

            return isActive ? (
               <ProductListItem
                  key={product[PROP_AS_ID]}
                  productItem={product}
                  propsList={propsList}
                  onItemRemove={removeFromCompare}
               />
            ) : null;
         })}
      </div>
   );
};
