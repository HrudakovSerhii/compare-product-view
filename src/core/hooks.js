import React from "react";

import { get } from "./apiController";

import { PRODUCT_ALL_URL } from "../../app.config";

export const PROP_AS_ID = "Artikelnummer";

export const useAllProducts = () => {
   const [loading, setLoading] = React.useState(false);
   const [products, setProducts] = React.useState([]);

   const [productsToCompare, setProductsToCompare] = React.useState([]);

   const [errors, setErrors] = React.useState();

   const fetchAllProducts = async () => {
      setLoading(true);

      const { data, errors } = await get(PRODUCT_ALL_URL);

      if (errors) {
         setErrors(errors);
      } else {
         setProducts(data?.products);

         const _productsToCompare = data?.products.reduce(
            (acc, current) => [...acc, { id: current[PROP_AS_ID], name: current["name"], active: true }],
            []
         );

         setProductsToCompare(_productsToCompare);
      }

      setLoading(false);
   };

   const updateProductsToCompare = (id, newState) => {
      setProductsToCompare((prevState) =>
         prevState.map((activeItem) => (activeItem.id === id ? { ...activeItem, active: newState } : activeItem))
      );
   };

   React.useEffect(() => {
      fetchAllProducts();
   }, []);

   React.useEffect(() => {
      console.log(products);
   }, [products]);

   return {
      products,
      productsToCompare,
      errors,
      loading,
      refetch: fetchAllProducts,
      updateProductsToCompare
   };
};
