import React from "react";

import { get } from "./apiController";

import { PRODUCT_ALL_URL } from "../../app.config";

export const useAllProducts = () => {
   const [loading, setLoading] = React.useState(false);
   const [products, setProducts] = React.useState([]);
   const [errors, setErrors] = React.useState();

   const fetchAllProducts = async () => {
      setLoading(true);

      const { data, errors } = await get(PRODUCT_ALL_URL);

      if (errors) {
         setErrors(errors);
      } else {
         setProducts(data?.products);
      }

      setLoading(false);
   };

   React.useEffect(() => {
      fetchAllProducts();
   }, []);

   React.useEffect(() => {
      console.log(products);
   }, [products]);

   return {
      products,
      errors,
      loading,
      refetch: fetchAllProducts
   };
};
