import React from 'react';
import VideoThumbnail from '@/components/template/Video/Thumbnail';
import { VideoX } from '@/typings';

type Prop = {
    videos: VideoX[]
}

const VideoList = ({ videos }: Prop) => {
  if (videos.length === 0) {
    return null;
  }
  
  return (
    <div className='py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-2.5'>
      {
        videos.map(video =>
          <div
            key={video.id}
            className="flex justify-center w-full h-full">
            
            <div className='space-y-2.5'>
              <div className='aspect-video h-40 lg:h-45 rounded-lg overflow-hidden'>
                  <VideoThumbnail
                    video={video}
                  />
              </div>
              <div>
                <p className='text-base md:text-lg font-semibold tracking-tight opacity-80'>
                  {video.title}
                </p>
              </div>
            </div>

          </div>
        )
      }
    </div>
  );
}

export default VideoList;