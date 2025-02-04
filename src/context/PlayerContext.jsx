import React, { createContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../assets/assets';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const [track, setTrack] = useState(songsData[3]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId=async(id)=>{
        await setTrack(songsData[id]);
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previous=async()=>{
        if(track.id>0){
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next=async()=>{
        if(track.id<songsData.length-1){
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const seekSong = (e) => {
        const offsetX = e.nativeEvent.offsetX;
        const seekBarWidth = seekBg.current.offsetWidth;
        const duration = audioRef.current.duration;
        audioRef.current.currentTime = (offsetX / seekBarWidth) * duration;
    };
    

    useEffect(() => {
        const updateSeekBar = () => {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;

            seekBar.current.style.width = (Math.floor(currentTime / duration * 100)) + "%";
            setTime({
                currentTime: {
                    second: Math.floor(currentTime % 60),
                    minute: Math.floor(currentTime / 60)
                },
                totalTime: {
                    second: Math.floor(duration % 60),
                    minute: Math.floor(duration / 60)
                }
            });
        };

        audioRef.current.ontimeupdate = updateSeekBar;
        audioRef.current.onloadedmetadata = updateSeekBar;

        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
                audioRef.current.onloadedmetadata = null;
            }
        };
    }, [audioRef]);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,seekSong
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;

