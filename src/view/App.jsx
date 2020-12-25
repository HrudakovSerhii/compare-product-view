import React from "react";

import { useProducts } from "../core/hooks";

import s from "../styles/index.scss";

export const App = () => {
   const { loading } = useProducts();

   if (loading) return <div>...</div>;

   return (
      <div className={s.appContainer}>

      </div>
   );
};
