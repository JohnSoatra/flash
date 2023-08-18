'use client';
import Slider from '@/components/template/Video/Slider';
import o1 from '@/utils/number/percent';
import toMinutes from '@/utils/number/to_minute';
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, BackwardIcon as BackwardIconSolid, ForwardIcon as ForwardIconSolid, PauseCircleIcon, PauseIcon, PlayCircleIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    zoomed:boolean,
    muted: boolean,
    playing: boolean,
    currentVolume: number,
    currentPlayTime: number,
    fullDuration: number,

    onPlayPause: () => void,
    onSpeakerClick: () => void,
    onTimeChange: (value: number) => void,
    onVolumeChange: (value: number) => void,
    onTimeLineMounted: () => void,
    onVolumeLineMounted: () => void,
    onZoomClick: () => void,
    onBackward: () => void,
    onForward: () => void,
    onButtonsHovered: () => void,
    onButtonsLeaved: () => void,
}

const Class = {
    Icon: 'w-4 h-4 md:w-5 md:h-5 text-white',
    IconPlayPause: 'w-7 h-7 md:w-8 md:h-8 xl:w-10 xl:h-10 text-white opacity-90 transition hover:opacity-100',
    IconBackForward: 'w-5 h-5 md:w-6 md:h-6 text-white/90',
    Button: 'cursor-pointer',
    ButtonPlayPause: 'cursor-pointer'
}

const VideoController = ({
    zoomed,
    playing,
    muted,
    currentVolume,
    currentPlayTime,
    fullDuration,
    onPlayPause,
    onSpeakerClick,
    onTimeChange,
    onVolumeChange,
    onTimeLineMounted,
    onVolumeLineMounted,
    onZoomClick,
    onBackward,
    onForward,
    onButtonsHovered,
    onButtonsLeaved,
}: Props) => {
    const refTimeline = useRef<HTMLDivElement>(null);
    const refVolume = useRef<HTMLDivElement>(null);
    const [volume, setVolume] = useState(o1(currentVolume));
    const [value, setValue] = useState(o1(currentPlayTime / fullDuration));

    useEffect(() => {
        setValue(o1(currentPlayTime / fullDuration));
    }, [currentPlayTime]);

    useEffect(() => {
        setVolume(o1(currentVolume));
    }, [currentVolume]);

    return (
        <div className='w-full select-none'>

            <div
                ref={refTimeline} className='pt-2 pb-2 group'
                onPointerEnter={onButtonsHovered}
                onPointerLeave={onButtonsLeaved}>
                <Slider
                    value={value}
                    customRef={refTimeline}
                    onMounted={onTimeLineMounted}
                    onChange={(_value) => {
                        onTimeChange(_value);
                    }}
                />
            </div>

            <div className='grid grid-cols-3'>
                
                <div className='flex items-center gap-x-2'>
                    <div className='flex items-center space-x-1'>
                        <div
                            className='flex items-center text-white text-sm md:text-base'
                            onPointerEnter={onButtonsHovered}
                            onPointerLeave={onButtonsLeaved}>
                            <p>{toMinutes(currentPlayTime)}</p>
                            <p>&nbsp;/&nbsp;</p>
                            <p>{toMinutes(fullDuration)}</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-center space-x-2'>
                    <p
                        className={Class.Button + ' group'}
                        onPointerEnter={onButtonsHovered}
                        onPointerLeave={onButtonsLeaved}
                        onClick={onBackward}>
                        <BackwardIcon className={Class.IconBackForward + ' group-hover:hidden'} />
                        <BackwardIconSolid className={Class.IconBackForward + ' hidden group-hover:block'} />
                    </p>
                    <p
                        className={Class.ButtonPlayPause}
                        onPointerEnter={onButtonsHovered}
                        onPointerLeave={onButtonsLeaved}
                        onClick={onPlayPause}>
                        {
                            playing ?
                            <PauseCircleIcon className={Class.IconPlayPause} /> :
                            <PlayCircleIcon className={Class.IconPlayPause} />
                        }
                    </p>
                    <p
                        className={Class.Button + ' group'}
                        onPointerEnter={onButtonsHovered}
                        onPointerLeave={onButtonsLeaved}
                        onClick={onForward}>
                        <ForwardIcon className={Class.IconBackForward + ' group-hover:hidden'} />
                        <ForwardIconSolid className={Class.IconBackForward + ' hidden group-hover:block'} />
                    </p>
                </div>

                <div className='flex items-center justify-end gap-x-2'>
                    <div className='flex flex-wrap items-center space-x-1.5'>
                        <p
                            className={Class.Button}
                            onPointerEnter={onButtonsHovered}
                            onPointerLeave={onButtonsLeaved}
                            onClick={onSpeakerClick}>
                            {
                                muted ?
                                <SpeakerXMarkIcon className={Class.Icon} />:
                                <SpeakerWaveIcon className={Class.Icon} />
                            }
                        </p>
                        <div
                            ref={refVolume}
                            className='w-14 py-2'
                            onPointerEnter={onButtonsHovered}
                            onPointerLeave={onButtonsLeaved}>
                            <Slider
                                size='sm'
                                value={volume}
                                customRef={refVolume}
                                onMounted={onVolumeLineMounted}
                                onChange={(_value) => {
                                    onVolumeChange(_value);
                                }}
                            />
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <p
                            className={Class.Button}
                            onPointerEnter={onButtonsHovered}
                            onPointerLeave={onButtonsLeaved}
                            onClick={onZoomClick}>
                            {
                                zoomed ?
                                <ArrowsPointingInIcon className={Class.Icon} /> :
                                <ArrowsPointingOutIcon className={Class.Icon} />
                            }
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default VideoController;