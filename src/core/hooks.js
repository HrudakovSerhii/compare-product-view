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
            (acc, current) => [...acc, { id: current["Artikelnummer"], name: current["name"], isActive: true }],
            []
         );

         setProductsToCompare(_productsToCompare);
      }

      setLoading(false);
   };

   const removeFromCompare = (id) => {
      setProducts((prevState) => prevState.filter((p) => p["Artikelnummer"] !== id));
      setProductsToCompare((prevState) => prevState.filter((p) => p.id !== id));
   };

   const updateProductsToCompare = (id, isActive) => {
      setProductsToCompare((prevState) => [...prevState, ...{ id, isActive }]);
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
   }, [productsToCompare.map((p) => p.isActive).toString()]);

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
