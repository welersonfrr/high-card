import React from "react";

const BetButton = (props: any) => {
  return (
    <div className="w-[376.5px] h-[120px] flex flex-row">
      <div
        className={`h-full w-1/2 bg-blue-700 flex flex-col justify-start ${
          props.timerEffect === true ? "cursor-pointer" : " cursor-not-allowed"
        } rounded-l-2xl border-2 border-transparent hover:border-white`}
        onClick={props.leftClickFunction}
      >
        <p className="p-1 flex uppercase text-white font-semibold">LEFT</p>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-[1.5rem] text-white font-bold">
            {props.lBet > 0 ? props.lBet : ""}
          </p>
        </div>
      </div>
      <div
        className={`h-full w-1/2 bg-red-700  flex flex-col justify-end ${
          props.timerEffect === true ? "cursor-pointer" : " cursor-not-allowed"
        } rounded-r-2xl border-2 border-transparent hover:border-white`}
        onClick={props.rightClickFunction}
      >
        <p className="p-1 w-full flex justify-end uppercase text-white font-semibold">
          RIGHT
        </p>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-[1.5rem] text-white font-bold">
            {props.rBet > 0 ? props.rBet : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetButton;
