'use client';
import { Transition } from '@headlessui/react';
import { PlayIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useState } from 'react';
import VideoPopover from './Popover';
import toMinutes from '@/utils/number/to_minute';
import { VideoX } from '@/typings';

type Props = {
    video: VideoX
}

const VideoThumbnail = ({ video }: Props) => {
    const [ showPopup, setShowPopup ] = useState(false);

    return (
        <div className='relative w-full h-full'>
            <div
                className='w-full h-full cursor-pointer'
                onClick={() => setShowPopup(true)}>
                <video
                    src={video.url}
                    className='object-cover w-full h-full'
                    poster={video.poster?.url}
                />
                <div className='absolute bg-white rounded-full p-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center'>
                    <PlayIcon className='w-5 h-5 text-light-50' />
                </div>
                <div className='absolute px-1 bg-black rounded bg-opacity-80 text-white flex justify-center items-center bottom-1 right-1'>
                    <p>{toMinutes(video.duration)}</p>
                </div>
            </div>

            <Transition
                appear
                as={Fragment}
                show={showPopup}
                enter="ease-out duration-150"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90">
                <div className='fixed inset-0 z-30'>
                    <VideoPopover
                        video={video}
                        onClose={() => setShowPopup(false)}
                    />
                </div>
            </Transition>
        </div>
    );
}

export default VideoThumbnail;