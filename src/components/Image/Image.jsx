import React from "react";

import s from "../../styles/common.scss";

export const Image = ({ path, style }) => {
   return (
      <div className={`${s.image} ${style}`}>
         <img src={path} />
      </div>
   );
};
