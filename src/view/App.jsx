import React from "react";

import { useProducts } from "../core/hooks";

import { Title } from "../components/Title/Title";
import { ProductList } from "../components/ProductList/ProductList";
import { CompareList } from "../components/CompareList/CompareList";
import { PropertyList } from "../components/PropertyList/PropertyList";

import s from "../styles/app.scss";

export const App = () => {
   const {
      loading,
      products,
      propsList,
      productsToCompare,
      removeFromCompare,
      updateProductsToCompare
   } = useProducts();

   if (loading) return <div>...</div>;

   return (
      <div className={s.appContainer}>
         <div className={s.centerContainer}>
            <Title title={`${products?.length} Producten Vergelijken`} style={s.headerTitle} />
            <div className={s.mainContainer}>
               <div className={s.compareOptionsContainer}>
                  <CompareList
                     productsToCompare={productsToCompare}
                     updateProductsToCompare={updateProductsToCompare}
                  />
                  <PropertyList propsList={propsList} />
               </div>
               <ProductList
                  products={products}
                  propsList={propsList}
                  productsToCompare={productsToCompare}
                  removeFromCompare={removeFromCompare}
               />
            </div>
         </div>
      </div>
   );
};
