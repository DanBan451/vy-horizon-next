import React, { useEffect, useState } from "react";
import classes from "./loader.module.css";

export default function Loader({ src, styles, index, classNameProp, id, small, medium, large }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <React.Fragment>      
      {!isImageLoaded && <div className={classes.placeholder}></div>}
      <img
        srcSet={`
          ${small} 400w,
          ${medium} 800w,
          ${large} 1200w,
          ${src} 1950w
        `}
        src={src}
        onLoad={handleImageLoad}
        style={{ display: isImageLoaded ? "block" : "none", ...styles }}
        index={index || 0}
        className={`${classNameProp} ${classes.image}`}        
        id={id}
        alt=""
      />
    </React.Fragment>
  );
}
