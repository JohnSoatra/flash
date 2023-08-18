'use client';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    value: number,
    customRef?: React.RefObject<HTMLDivElement>,
    size?: 'sm'|'md'|'lg',
    onChange: (value: number) => void,
    onMounted: () => void,
}

const Slider = ({
    size,
    value,
    customRef,
    onChange,
    onMounted,
}: Props) => {
    const [pointerdown, setPointerdown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const valueToPx = () => {
        const _ref = customRef || ref;

        if (_ref.current) {
            return value * _ref.current.clientWidth;
        }

        return 0;
    }
    
    const changeClientX = (evt: PointerEvent) => {
        const _ref = customRef || ref;

        if (_ref.current) {
            let clientX = evt.clientX - _ref.current.offsetLeft;
            clientX = clientX < 0 ? 0 : clientX > _ref.current.clientWidth ? _ref.current.clientWidth : clientX;
    
            onChange(clientX / _ref.current.clientWidth);
        }
    }

    useEffect(() => {
        const pointerDown = (evt: PointerEvent) => {
            const _ref = customRef || ref;

            if (_ref.current && _ref.current.contains(evt.target as Node|null)) {
                changeClientX(evt);
                setPointerdown(true);
            }
        }
        const pointerMove = (evt: PointerEvent) => {
            if (pointerdown) {
                changeClientX(evt);
            }
        };
        const onCancel = (evt: PointerEvent) => {
            setPointerdown(false);
        }
        const pointerUp = (evt: PointerEvent) => {
            onCancel(evt);
        };
        const pointerLeave = (evt: PointerEvent) => {
            onCancel(evt);
        };
        const pointerEnter = (evt: PointerEvent) => {
            onCancel(evt);
        };

        document.addEventListener('pointerdown', pointerDown);
        document.addEventListener('pointermove', pointerMove);
        document.addEventListener('pointerup', pointerUp);
        document.addEventListener('pointerleave', pointerLeave);
        document.addEventListener('pointerenter', pointerEnter);

        onMounted();

        return () => {
            document.removeEventListener('pointerdown', pointerDown);
            document.removeEventListener('pointermove', pointerMove);
            document.removeEventListener('pointerup', pointerUp);
            document.removeEventListener('pointerleave', pointerLeave);
            document.removeEventListener('pointerenter', pointerEnter);
        };

    }, [pointerdown]);

    return (
        <div ref={ref} className='w-full select-none'>
            <div className={`
                relative w-full rounded select-none
                ${
                    size === 'sm' ?
                    'h-[2px] bg-light-400' :
                    'h-[5px] border border-white/60 hover:border-white/100 group-hover:border-white/100 duration-300'
                }
            `}>
                <div
                    className='h-full absolute top-1/2 -translate-y-1/2 left-0 rounded-l-sm bg-white select-none'
                    style={{ width: valueToPx() + 'px' }}>
                </div>

                <div
                    className={`
                        absolute top-1/2 -translate-y-1/2 transition rounded-full bg-white select-none
                        ${
                            size === 'sm' ?
                            'w-2 h-2' :
                            'w-3 h-3'
                        }
                    `}
                    style={{ left: (valueToPx() - (size === 'sm' ? 4 : 6)) + 'px' }}>
                </div>

            </div>
        </div>
    );
}

export default Slider;