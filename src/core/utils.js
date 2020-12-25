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
      if ((products.length = props[p])) commonProps.push(p);
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
