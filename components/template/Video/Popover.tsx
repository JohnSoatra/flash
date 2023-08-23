'use client';
import React from 'react';
import VideoPlayer from './Player';
import { VideoX } from '@/typings';
import VARS from '@/constants/vars';

type Props = {
    video: VideoX,
    onClose: () => void
}

const VideoPopover = ({
    video,
    onClose
}: Props) => {
    return (
        <div className='relative w-full h-full bg-black'>
            <VideoPlayer
                src={VARS.MEDIA_SERVER + video.url}
                fullDuration={video.duration}
                title={video.title}
                playStarting={true}
                onBackClick={onClose}
            />
        </div>
    );
}

export default VideoPopover