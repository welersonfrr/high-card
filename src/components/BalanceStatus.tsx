import React from "react";

const BalanceStatus = (props: any) => {
  return (
    <div className="fixed top-2 left-2 flex items-center justify-center bg-white border-2 rounded-lg w-auto min-w-[100px] h-12 font-bold">
      {`$ ${props.balance}`}
    </div>
  );
};

export default BalanceStatus;
