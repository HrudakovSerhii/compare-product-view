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
   Function return list of property names that required for comparing
   @param {array} productsPropList list of available props to compare
   @param {array} excludePropNames list of props to exclude from compare
 * @return {array} list of property names for comparing
 */
export const filterPropsToCompare = (productsPropList, excludePropNames) =>
   productsPropList.filter((productProp) => !excludePropNames.find((p) => p === productProp));

/*
   Function return list of property names that exist in all products and where values related to prop.name at all
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

export const sortPropsListByAlphabet = (propsList) =>
   [...propsList].sort((a, b) => {
      if (a["propName"] === "badges") return -1;
      else return a["propName"].localeCompare(b["propName"]);
   });
