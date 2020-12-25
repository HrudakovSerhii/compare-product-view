import React from "react";

import { ProductListItem } from "../ProductListItem/ProductListItem";

import { PROP_AS_ID } from "../../core/hooks";

import s from "./styles/ProductList.scss";

export const ProductList = ({ products, propsList, valueDiffPropsList, productsToCompare, removeFromCompare }) => {
   return (
      <div className={s.productList}>
         {products.map((product) => {
            const isActive = !!productsToCompare.find((p) => p.id === product[PROP_AS_ID] && p.active);

            return (
               <ProductListItem
                  key={product[PROP_AS_ID]}
                  isActive={isActive}
                  productItem={product}
                  propsList={propsList}
                  valueDiffPropsList={valueDiffPropsList}
                  onItemRemove={removeFromCompare}
               />
            );
         })}
      </div>
   );
};
