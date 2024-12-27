import React from 'react';
import { RotatingLines } from "react-loader-spinner";
import style from "./Loader.module.css";


const Loader: React.FC = () => {
  return (
    <div className={style.loaderContainer}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </div>
  );
};


export default Loader;