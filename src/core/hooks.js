import React from "react";

import { get } from "./apiController";

import { PRODUCT_ALL_URL } from "../../app.config";

import {
   getCommonPropNameList,
   filterPropsToCompare,
   getPropNamesWithValueDiff,
   sortPropsListByAlphabet
} from "./utils";

const EXCLUDE_FROM_COMPARE_PROP_NAMES = [
   "salePrice",
   "manufacturerName",
   "grossPrice",
   "BUP_UOM",
   "BUP_Value",
   "uom",
   "productImage",
   "BUP_Conversion",
   "minQuantity",
   "manufacturerImage",
   "name",
   "sku",
   "listPrice",
   "channel",
   "display",
   "atp"
];

export const PROP_AS_ID = "Artikelnummer";

export const useProducts = () => {
   const [loading, setLoading] = React.useState(false);
   const [products, setProducts] = React.useState([]);

   const [propsList, setPropsList] = React.useState([]);

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

   const removeFromCompare = (id) => {
      setProducts((prevState) => prevState.filter((p) => p[PROP_AS_ID] !== id));
      setProductsToCompare((prevState) => prevState.filter((p) => p.id !== id));
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
      const commonPropNamesList = getCommonPropNameList(products);

      const comparePropsList = filterPropsToCompare(commonPropNamesList, EXCLUDE_FROM_COMPARE_PROP_NAMES);
      const valueDiffPropsList = getPropNamesWithValueDiff(products, comparePropsList);

      const sortedPropsList = sortPropsListByAlphabet(valueDiffPropsList);
      sortedPropsList.sort((a) => (a["propName"] === "badges" ? -1 : 0));

      setPropsList(sortedPropsList);
   }, [products.map((p) => p?.[PROP_AS_ID]).toString()]);

   return {
      products,
      propsList,
      productsToCompare,
      errors,
      loading,
      refetch: fetchAllProducts,
      removeFromCompare,
      updateProductsToCompare
   };
};
