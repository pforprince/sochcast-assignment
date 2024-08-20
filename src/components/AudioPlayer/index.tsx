import { FC, useEffect, useRef, useState } from "react";

import Next from "/next.svg";
import Play from "/play.svg";
import Prev from "/prev.svg";
import Pause from "/pause.svg";

import { IEpisode } from "../../types/Episode";
import { getTimeFromSeconds } from "../../utils/helper";

type AudioPlayerProps = {
  isPlaying: boolean;
  episode?: IEpisode;
  playNext: () => void;
  playPrev: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

const AudioPlayer: FC<AudioPlayerProps> = ({
  episode,
  setIsPlaying,
  isPlaying,
  playNext,
  playPrev,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number>(0);

  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setTime(0);
    if (audioRef.current) audioRef.current.play();
  }, [episode]);

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current?.pause();
    } else audioRef.current?.play();
  }, [isPlaying]);

  const updateTimeHandler = () => {
    if (audioRef.current) {
      const now = Date.now();

      if (now - timerRef.current > 1000) {
        setTime(Math.round(audioRef.current.currentTime!));
        timerRef.current = now;
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    // play next audio
    if (time === episode?.duration) playNext();

    if (audio) {
      audio.addEventListener("timeupdate", updateTimeHandler);
    }

    return () => {
      // remove the listener
      if (audio) {
        audio.removeEventListener("timeupdate", updateTimeHandler);
      }
    };
  }, [audioRef, episode, playNext, time]);

  if (!episode) return null;

  return (
    <div className="border-2 shadow-black border-t-primary bg-white w-full fixed bottom-0">
      <div className="flex gap-4 py-2 lg:py-4 w-[90%] lg:w-[80%] m-auto items-center justify-between">
        <div className="flex items-center gap-2 w-[60%] lg:w-[25%]">
          <img
            className="w-12 lg:w-16 cursor-pointer rounded-md"
            src={episode?.episode_compressed_image}
          />
          <p className="text-sm line-clamp-2">{episode?.name}</p>
        </div>
        <div className="visible lg:hidden">
          <img
            className="w-7 cursor-pointer"
            onClick={() => {
              if (isPlaying) audioRef.current?.pause();
              else audioRef.current?.play();
              setIsPlaying(!isPlaying);
            }}
            src={isPlaying ? Pause : Play}
          />
        </div>
        <div className="hidden lg:block w-[80%] m-auto">
          <input
            value={time}
            max={episode.duration}
            onChange={(e) => {
              setTime(Math.round(Number(e.target.value)));
              if (audioRef.current)
                audioRef.current.currentTime = Number(e.target.value);
            }}
            type="range"
            className="w-full accent-primary h-1 outline-none mb-6 bg-gray-100 rounded-lg cursor-pointer"
          />

          <div className="flex gap-6 justify-center">
            <img onClick={playPrev} className="w-7 cursor-pointer" src={Prev} />
            <img
              className="w-7 cursor-pointer"
              onClick={() => {
                if (isPlaying) audioRef.current?.pause();
                else audioRef.current?.play();
                setIsPlaying(!isPlaying);
              }}
              src={isPlaying ? Pause : Play}
            />
            <img onClick={playNext} className="w-7 cursor-pointer" src={Next} />
            <audio src={episode.file} ref={audioRef} />
          </div>
        </div>
        <div className="flex gap-1 justify-end w-[25%]">
          <span className="w-10">{getTimeFromSeconds(time)}</span> /{" "}
          <span className="w-10 ">{getTimeFromSeconds(episode?.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
