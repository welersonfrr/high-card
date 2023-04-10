import React from "react";

const BetTime = (props: any) => {
  return (
    <div
      className={` ${
        props.timerEffect && "animate-popup"
      } w-10 h-20 flex items-center justify-center text-white font-bold text-[1.5rem]`}
    >
      {props.seconds}
    </div>
  );
};

export default BetTime;
