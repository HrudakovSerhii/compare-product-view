import React from "react";

import { Image } from "../Image/Image";

import s from "../../styles/common.scss";

export const Badges = ({ data }) => {
   const urls = data.split("|");

   return urls?.length ? (
      <div className={s.badgeList}>
         {urls?.map((url, i) => (
            <Image key={url + i} path={url} style={s.badge} />
         ))}
      </div>
   ) : null;
};
