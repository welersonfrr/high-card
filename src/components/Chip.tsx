import React from "react";
import { Chip } from "../interfaces";

const Chip: React.FC<Chip> = ({ cBet, value, bgColor, clickFunction }) => {
  return (
    <button
      className={` ${
        cBet === value ? " outline-dotted " : ""
      } ${bgColor} text-white w-10 h-10 font-bold rounded-full shadow-md border-4 border-dashed`}
      onClick={clickFunction}
    >
      {value}
    </button>
  );
};

export default Chip;
