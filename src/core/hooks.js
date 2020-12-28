import React from "react";

import { get } from "./apiController";

import { PRODUCT_ALL_URL } from "../../app.config";

import { sortByAlphabet } from "./utils";

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

/*
   Function return list of property names that are common for all products in argument
   @param {array} products Product list
 * @return {array} array of property names that are common for all provided products
 */
export const getCommonPropNameList = (products) => {
   const props = {};
   const commonProps = [];

   products?.forEach((p) =>
      Object.keys(p).map((propName) => {
         if (!props[propName]) props[propName] = 1;
         else if (props[propName]) props[propName] += 1;
      })
   );

   Object.keys(props).forEach((p) => {
      if (products.length === props[p]) commonProps.push(p);
   });

   return commonProps;
};

/*
   Function return list of property names where values related to prop.name at all
   products not equal
   @param {array} compareProducts list of products to compare
   @param {array} comparePropNames list of props names to compare
 * @return {array} list of property names where values on products has diff
 */
export const getPropNamesWithValueDiff = (compareProducts, comparePropNames) => {
   const propNamesWithValueDiff = [];

   comparePropNames.forEach((propName) => {
      let hasDiff = false;
      let prevValue = "";

      compareProducts.find((product) => {
         if (!prevValue) prevValue = product[propName];
         else if (prevValue !== product[propName]) hasDiff = true;
         return hasDiff;
      });

      propNamesWithValueDiff.push({ propName, hasDiff });
   });

   return propNamesWithValueDiff;
};

export const useProducts = () => {
   const [loading, setLoading] = React.useState(false);
   const [products, setProducts] = React.useState([]);

   const [propsList, setPropsList] = React.useState([]);

   const [compareList, setCompareList] = React.useState([]);

   const [errors, setErrors] = React.useState();

   const fetchAllProducts = async () => {
      setLoading(true);

      const { data, errors } = await get(PRODUCT_ALL_URL);

      if (errors) {
         setErrors(errors);
      } else {
         setProducts(data?.products);

         const newCompareList = data?.products.reduce(
            (acc, current) => [...acc, { id: current["Artikelnummer"], name: current["name"], isActive: true }],
            []
         );

         setCompareList(newCompareList);
      }

      setLoading(false);
   };

   const removeProduct = (id) => {
      setProducts((prevState) => prevState.filter((p) => p["Artikelnummer"] !== id));
      setCompareList((prevState) => prevState.filter((p) => p.id !== id));
   };

   const updateCompareList = (id, isActive) => {
      setCompareList((prevState) => prevState.map((p) => (p.id === id ? { ...p, isActive } : p)));
   };

   React.useEffect(() => {
      fetchAllProducts();
   }, []);

   React.useEffect(() => {
      const commonPropNamesList = getCommonPropNameList(products);

      const filteredCompareList = commonPropNamesList.filter(
         (productProp) => !EXCLUDE_FROM_COMPARE_PROP_NAMES.find((p) => p === productProp)
      );

      const diffProductsList = getPropNamesWithValueDiff(products, filteredCompareList);

      const sortedPropsList = sortByAlphabet(diffProductsList, "propName");

      sortedPropsList.sort((a) => (a["propName"] === "badges" ? -1 : 0));

      setPropsList(sortedPropsList);
   }, [compareList.map((p) => p.isActive).toString()]);

   return {
      visibleProducts: products.filter((product) =>
         compareList.find((p) => p.isActive && p.id === product["Artikelnummer"])
      ),
      propsList,
      compareList,
      errors,
      loading,
      refetch: fetchAllProducts,
      removeProduct,
      updateCompareList
   };
};
