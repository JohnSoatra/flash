'use client';
import { Suggestion } from "@/typings";
import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MouseEvent } from "react";

type Props = {
    suggestions: Suggestion[],
    hoverIndex: number,
    onClick: (evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, suggestion: Suggestion) => void,
    onEnter: (index: number) => void,
    onLeave: (index: number) => void
}

const Suggestions = ({
    suggestions,
    hoverIndex,
    onClick,
    onEnter,
    onLeave
}: Props) => {
    return (
        <div className="w-full border bg-white border-light-400 rounded-xl shadow-md md:shadow-lg mt-px py-2 md:py-2.5">
        {
            suggestions.map((suggestion, index) =>
                <div
                    key={index}
                    className={`
                        flex items-center space-x-2 cursor-pointer px-3 py-1 md:px-4
                        ${
                            hoverIndex === index &&
                            'bg-gray-100'
                        }
                    `}
                    onMouseEnter={() => onEnter(index)}
                    onMouseLeave={() => onLeave(index)}
                    onClick={(evt) => onClick(evt, suggestion)}>
                    <div className="opacity-75">
                        {
                            suggestion.searched ?
                            <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-purple-600" /> :
                            <MagnifyingGlassIcon className="w-4 h-4 md:w-5 md:h-5" />
                        }
                    </div>

                    <p className={`
                        font-normal text-sm md:text-base
                        ${suggestion.searched && 'text-purple-600'}
                    `}>
                        {suggestion.title}
                    </p>
                </div>
            )
        }
        </div>
    );
}

export default Suggestions;