import React from "react";

interface Props {
  height?: number;
  width?: number;
}

function Spinner({ height, width }: Props) {
  return (
    <div
      className={`inline-block mr-2 h-${height} w-${width} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.425em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

export default Spinner;
