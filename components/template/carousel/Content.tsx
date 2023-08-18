'use client'
import React from "react";

type Props = {
  activeIndex: number,
  children: React.ReactNode[]
}

function SliderContent({
  activeIndex,
  children
}: Props) {
  return (
    <div className='w-full h-full overflow-hidden'>
      <div
        className="w-full h-full flex transition duration-300"
        style={{
          transform: `translateX(${-100 * activeIndex}%)`
        }}>
        {
          children.map((each, index) =>
            <div
              key={index}
              className="min-w-full">
              {each}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default SliderContent;
