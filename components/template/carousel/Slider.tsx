'use client'
import React, { useState } from "react";
import SliderContent from "./Content";
import Arrows from "./Arrows";

type Props = {
  children: React.ReactNode[],
  className?: string
}

function Slider({ className, children }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={"relative " + className}>
      <SliderContent activeIndex={activeIndex}>
        {children}
      </SliderContent>

      <Arrows
        activeIndex={activeIndex}
        length={children.length}
        prevSlide={() => setActiveIndex(
          activeIndex <= 0 ?
          children.length :
          activeIndex - 1
        )}
        nextSlide={() => setActiveIndex(
          activeIndex >= children.length - 1 ?
          0 :
          activeIndex + 1
        )}
      />

    </div>
  );
}

export default Slider;
