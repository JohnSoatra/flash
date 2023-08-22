
import React, {useEffect, useRef, useState } from 'react'
import VideoController from './Controller';
import setCookie from '@/utils/fetch/cookie/set';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import VARS from '@/constants/vars';
import { useDispatch, useSelector } from 'react-redux';
import { changeMuted, changeVolume, selectCookieMuted, selectCookieVolume } from '@/redux/cookie';

type Props = {
    src: string,
    fullDuration: number,
    title?: string,
    poster?: string,
    playStarting?: boolean,

    onBackClick?: () => void
}

const VideoPlayer = ({
    src,
    title,
    poster,
    playStarting,
    fullDuration,

    onBackClick,
}: Props) => {
    const [timeLineMounted, setTimeLineMounted] = useState(false);
    const [volumeLineMounted, setVolumeLineMounted] = useState(false);
    const refTime = useRef<NodeJS.Timeout>();
    const refTimeClick = useRef<NodeJS.Timeout>();
    const refVideo = useRef<HTMLVideoElement>(null);
    const refDiv = useRef<HTMLDivElement>(null);
    const volumeController = useRef(new AbortController());
    const mutedController = useRef(new AbortController());

    const dispatch = useDispatch();
    const [showControl, setShowControl] = useState(true);
    const [buttonsHovered, setButtonsHovered] = useState(false);

    const muted = useSelector(selectCookieMuted);
    const volume = useSelector(selectCookieVolume);
    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    const [playing, setPlaying] = useState(playStarting||false);
    const [zoomed, setZoomed] = useState(false);

    const _setCookie = (
        name: string,
        value: string,
        controller: React.MutableRefObject<AbortController>
    ) => {
        controller.current.abort();
        controller.current = new AbortController();

        setCookie({
            body: {
                name: name,
                value: value.toString(),
            },
            signal: controller.current.signal
        })
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }

    const _setCurrenPlayTime = (value: number) => {
        if (refVideo.current) {
            refVideo.current.currentTime = value;
            
            if (value >= fullDuration) {
                setPlaying(false);
            }

            setCurrentPlayTime(refVideo.current.currentTime);
        }
    }

    const _setCurrentVolume = (value: number) => {
        if (refVideo.current) {
            refVideo.current.volume = value;
            dispatch(changeVolume(value));
            _setCookie('volume', value.toString(), volumeController);
        }
    }

    const _setMuted = (value: boolean) => {
        if (refVideo.current) {
            refVideo.current.muted = value;
            dispatch(changeMuted(value));
            _setCookie('muted', value.toString(), mutedController);
        }
    }

    const _showHideControl = () => {
        clearTimeout(refTime.current);
        
        refTime.current = setTimeout(() => {
            if (playing && !buttonsHovered) {
                setShowControl(false);
            }
        }, VARS.DURATION.HIDE_CONTROL);

        setShowControl(true);
    }
    
    const _setShowControl = ({
        value,
        playing: _playing,
        buttonsHovered: _buttonsHovered,
    }: {
        value: boolean,
        playing?: boolean,
        buttonsHovered?: boolean,
    }) => {
        const newPlaying = _playing === undefined ? playing : _playing;
        const newButtonsHovered = _buttonsHovered === undefined ? buttonsHovered : _buttonsHovered;

        clearTimeout(refTime.current);

        if (value) {
            setShowControl(value);
            
            refTime.current = setTimeout(() => {
                if (newPlaying && !newButtonsHovered) {
                    setShowControl(false);
                }
            }, 2000);

        } else if (newPlaying && !newButtonsHovered) {
            setShowControl(value);
        }
    }

    const playPause = () => {
        if (refVideo.current) {
            if (playing) {
                refVideo.current.pause();
            } else {
                refVideo.current.play();
            }
            setPlaying(!playing);
            _setShowControl({
                value: playing,
                playing: !playing
            });
        }
    }

    const onVolumeChange = (value: number) => {
        if (refVideo.current) {
            _setMuted(value === 0);
            _setCurrentVolume(value);
        }  
    }

    const onArrowUp = () => {
        let _newVolume = volume + 0.1;
        _newVolume = _newVolume > 1 ? 1 : _newVolume;
        
        if (_newVolume > 0) {
            _setMuted(false);
        }

        _setCurrentVolume(_newVolume);
    }

    const onArrowDown = () => {
        let _newVolume = volume - 0.1;
        _newVolume = _newVolume < 0  ? 0 : _newVolume;

        if (_newVolume === 0) {
            _setMuted(true);
        }

        _setCurrentVolume(_newVolume);
    }

    const onArrowRight = () => {
        if (refVideo.current) {
            _setCurrenPlayTime(refVideo.current.currentTime + 0.1 * fullDuration);
        }
    }

    const onArrowLeft = () => {
        if (refVideo.current) {
            _setCurrenPlayTime(refVideo.current.currentTime - 0.1 * fullDuration);
        }
    }

    const onSpaceBar = () => {
        playPause();
    }

    const onZoomClick = () => {
        if (refDiv.current) {
            if (zoomed) {
                document.exitFullscreen().then(res =>{
                    setZoomed(!zoomed);
                    setButtonsHovered(false);
                    _setShowControl({
                        value: false,
                        buttonsHovered: false
                    });
                });
            } else {
                refDiv.current.requestFullscreen().then(res => {
                    setZoomed(!zoomed);
                    setButtonsHovered(false);
                    _setShowControl({
                        value: false,
                        buttonsHovered: false
                    });
                });
            }
        }
    }

    useEffect(() => {
        const onFullScreenChange = () => {
            if (document.activeElement === refDiv.current) {
                setZoomed(document.fullscreenElement !== null);
            }
        }

        if (refDiv.current) {
            refDiv.current.focus();
        }

        document.addEventListener('fullscreenchange', onFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', onFullScreenChange);
        }

    }, [refDiv.current !== null]);

    useEffect(() => {
        if (refVideo.current) {
            refVideo.current.volume = volume;
            refVideo.current.muted = muted;
            refVideo.current.currentTime = currentPlayTime;
            
            if (playing) {
                refVideo.current.play();
            }
        }

    }, [refVideo.current !== null]);

    return (
        <div
            ref={refDiv}
            tabIndex={0}
            className={`
                relative w-full h-full
                ${
                    !(timeLineMounted || volumeLineMounted) && 'invisible'
                }
                ${
                    !showControl && 'cursor-none'
                }
            `}
            onKeyDown={(evt) => {
                if (refVideo.current) {
                    if (evt.key === "ArrowUp") {
                        onArrowUp();
                    } else if (evt.key === "ArrowDown") {
                        onArrowDown();
                    } else if (evt.key === 'ArrowRight') {
                        onArrowRight();
                    } else if (evt.key === 'ArrowLeft') {
                        onArrowLeft();
                    } else if (evt.key === ' ') {
                        onSpaceBar();
                    }

                    _showHideControl();
                }
            }}>

            <video
                ref={refVideo}
                poster={poster}
                className='absolute w-full h-full object-contain'
                onContextMenu={(evt) => {
                    evt.preventDefault();
                }}
                onTimeUpdate={(evt) => {
                    setCurrentPlayTime((evt.target as HTMLVideoElement).currentTime);
                }}
                onPlay={() => {
                    setPlaying(true);
                    _setShowControl({
                        value: false,
                        playing: true
                    });
                }}
                onPause={() => {
                    setPlaying(false);
                    _setShowControl({
                        value: true,
                        playing: false
                    });
                }}
                onEnded={() => {
                    setPlaying(false);
                    _setShowControl({
                        value: true,
                        playing: false
                    });
                }}>
                <source src={src} type="video/mp4" />
            </video>

            <div
                className='absolute inset-0'
                onPointerMove={() => {
                    _showHideControl();
                }}
                onClick={() => {
                    clearTimeout(refTimeClick.current);

                    if (refTimeClick.current !== undefined) {
                        refTimeClick.current = undefined;
                        onZoomClick();
                    } else {
                        refTimeClick.current = setTimeout(() => {
                            refTimeClick.current = undefined;
                            playPause();
                        }, VARS.DURATION.DBCLICK);
                    }
                }}>
            </div>
            
            {
                (title || onBackClick) &&
                <div
                    className={`
                        w-full min-h-[6rem] flex flex-col justify-start absolute top-0 left-0 bg-gradient-to-b to-transparent via-[#00000028] from-[#000000af] px-5 py-2 transition duration-700 opacity-0 select-none
                        ${
                            showControl && 'opacity-100'
                        }
                    `}
                    onPointerEnter={() => {
                        _setShowControl({value: true});
                    }}
                    onPointerMove={() => {
                        _setShowControl({value: true});
                    }}
                    onPointerLeave={() => {
                        _setShowControl({value: false});
                    }}>
                    <div className='flex items-center space-x-2.5'>
                        {
                            onBackClick &&
                            <p
                                className='cursor-pointer opacity-90 hover:opacity-100'
                                onPointerEnter={() => setButtonsHovered(true)}
                                onPointerLeave={() => setButtonsHovered(false)}
                                onClick={() => {
                                    if (document.fullscreenElement) {
                                        document.exitFullscreen().then(res =>{
                                            setZoomed(!zoomed);
                                        });
                                    }

                                    onBackClick();
                                }}>
                                <ArrowLeftIcon className='w-4 h-4 md:w-5 md:h-5 stroke-1 stroke-white text-white' />
                            </p>
                        }
                        {
                            title &&
                            <p
                                className='text-white md:text-lg text-ellipsis overflow-hidden whitespace-nowrap'
                                onPointerEnter={() => setButtonsHovered(true)}
                                onPointerLeave={() => setButtonsHovered(false)}>
                                {title}
                            </p>
                        }
                    </div>
                </div>
            }

            <div
                className={`
                    w-full min-h-[6rem] flex flex-col justify-end absolute bottom-0 left-0 bg-gradient-to-b from-transparent via-[#00000028] to-[#000000af] px-5 py-2 transition duration-700 opacity-0 select-none
                    ${
                        showControl && 'opacity-100'
                    }
                `}
                onPointerEnter={() => {
                    _setShowControl({value: true});
                }}
                onPointerMove={() => {
                    _setShowControl({value: true});
                }}
                onPointerLeave={() => {
                    _setShowControl({value: false});
                }}>
                <VideoController
                    zoomed={zoomed}
                    playing={playing}
                    muted={muted}
                    currentVolume={volume}
                    currentPlayTime={currentPlayTime}
                    fullDuration={fullDuration}
                    onPlayPause={playPause}
                    onSpeakerClick={() => {
                        if (refVideo.current) {
                            _setCurrentVolume(muted ? 0.5 : 0);
                            _setMuted(!muted);
                        }
                    }}
                    onTimeChange={(value) => {
                        if (refVideo.current) {
                            refVideo.current.currentTime = value * fullDuration;
                            setCurrentPlayTime(value * fullDuration);
                        }
                    }}
                    onVolumeChange={onVolumeChange}
                    onZoomClick={onZoomClick}
                    onTimeLineMounted={() => setTimeLineMounted(true)}
                    onVolumeLineMounted={() => setVolumeLineMounted(true)}
                    onBackward={() => {
                        onArrowLeft();
                    }}
                    onForward={() => {
                        onArrowRight();
                    }}
                    onButtonsHovered={() => {
                        setButtonsHovered(true);
                    }}
                    onButtonsLeaved={() => {
                        setButtonsHovered(false);
                    }}
                />
            </div>
        </div>
    );
}

export default VideoPlayer;