import React from "react";
import { HistoryBoard, Result } from "../interfaces";

const HistoryBoard: React.FC<HistoryBoard> = ({ historic }) => {
  return (
    <div className=" w-[400px] h-[120px] flex flex-row flex-wrap gap-1 mt-2">
      {historic.map((result: Result, index: any) => {
        return (
          <div
            key={index}
            className={`${result.color} p-2 h-8 w-8 rounded-full flex items-center justify-center`}
          >
            <p className="text-lg font-bold text-white">{result.side}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryBoard;
