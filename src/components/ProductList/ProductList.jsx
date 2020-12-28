import React from "react";

import { ProductListItem } from "../ProductListItem/ProductListItem";

import s from "./styles/ProductList.scss";

export const ProductList = ({ products, propsList, productsToCompare, removeFromCompare }) => {
   return (
      <div className={s.productList}>
         {products.map((product) => {
            const isActive = !!productsToCompare.find((p) => p.id === product["Artikelnummer"] && p.isActive);

            return isActive ? (
               <ProductListItem
                  key={product["Artikelnummer"]}
                  productItem={product}
                  propsList={propsList}
                  onItemRemove={removeFromCompare}
               />
            ) : null;
         })}
      </div>
   );
};
