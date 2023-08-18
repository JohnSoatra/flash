'use client'
import React from "react";

type Props = {
  activeIndex: number,
  length: number,
  onClick: (index:number) => void
}

const Dots = ({
  activeIndex,
  length,
  onClick,
}: Props) => {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 md:space-x-2">
      {
        (new Array(length).fill(0)).map((_, index) => (
          <span
            key={index}
            className={`
              w-3 h-3 md:w-3.5 md:h-3.5 bg-white rounded-full transition
              border border-light-100
              ${
                activeIndex === index ?
                'opacity-90' :
                'opacity-50'
              }
            `}
            onClick={() => onClick(index)}>
          </span>
      ))}
    </div>
  );
}

export default Dots;
