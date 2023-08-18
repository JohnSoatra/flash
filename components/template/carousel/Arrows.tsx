'use client'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import Range from "./Range";

const Class = {
  Span: (side: 'left'|'right', canSee: boolean) => `
    bg-white p-1 md:p-2
    flex items-center justify-center
    border border-darkmain/20 rounded-full
    transition opacity-60 hover:opacity-100
    ${
      canSee ? 'visible' : 'invisible'
    }
  `,
  Icon: 'w-4 h-4 stroke-1 md:stroke-2 stroke-darkmain opacity-75'
}

type Props = {
  activeIndex: number,
  length: number,
  prevSlide: () => void,
  nextSlide: () => void
}

function Arrows({
  activeIndex,
  length,
  prevSlide,
  nextSlide
}: Props) {
  return (
    <div className="w-fit absolute left-1/2 -translate-x-1/2 bottom-3 space-x-2 flex items-center">
      
      <span
          className={Class.Span('left', activeIndex > 0)}
          onClick={prevSlide}>
          <ChevronLeftIcon className={Class.Icon} />
      </span>

      <Range activeIndex={activeIndex} length={length} />

      <span
        className={Class.Span('right', activeIndex < length - 1)}
        onClick={nextSlide}>
        <ChevronRightIcon className={Class.Icon} />
      </span>

    </div>
  );
}

export default Arrows;
