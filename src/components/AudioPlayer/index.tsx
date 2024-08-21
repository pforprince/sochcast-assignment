import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import Next from "/next.svg";
import Prev from "/prev.svg";
import Volume from "/volume.svg";

import { IEpisode } from "../../types/Episode";
import { getTimeFromSeconds } from "../../utils/helper";
import PlayPause from "../PlayPause";

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
  const [volume, setVolume] = useState<number>(50);

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
        // updating time every 1 second
        setTime(Math.round(audioRef.current.currentTime));
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

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(+event.target.value);
    if (audioRef.current) audioRef.current.volume = +event.target.value;
  };

  const onAudioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(Math.round(Number(event.target.value)));
    if (audioRef.current)
      audioRef.current.currentTime = Number(event.target.value);
  };

  const togglePlayPause = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  if (!episode) return null;

  return (
    <div className="border-2 shadow-black border-t-primary bg-white w-full fixed bottom-0">
      <div className="flex gap-x-0 lg:gap-x-10 py-2 lg:py-4 w-[90%] lg:w-[80%] m-auto items-center lg:items-start justify-between">
        <div className="flex items-center gap-2 w-[50%] lg:w-[25%]">
          <img
            className="w-12 lg:w-16 cursor-pointer rounded-md"
            src={episode?.episode_compressed_image}
            alt={episode.name}
          />
          <p className="text-xs line-clamp-2">{episode?.name}</p>
        </div>
        <div className="w-[50%] lg:w-[80%] m-auto">
          <input
            value={time}
            max={episode.duration}
            onChange={onAudioChange}
            type="range"
            className="w-full hidden mb-3 lg:block accent-primary h-1 outline-none bg-gray-100 rounded-lg cursor-pointer"
          />

          <div className="flex gap-3 lg:gap-6 justify-center">
            <img
              onClick={playPrev}
              className="lg:w-7 w-5 cursor-pointer"
              alt="prev-icon"
              src={Prev}
            />
            <PlayPause
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
            />
            <img
              onClick={playNext}
              className="lg:w-7 w-5 cursor-pointer"
              alt="next-icon"
              src={Next}
            />
            <audio src={episode.file} ref={audioRef} />
          </div>
        </div>
        <div className="hidden lg:block w-[25%]">
          <p className="text-xs lg:text-sm text-center">
            <span className="inline-block w-10">
              {getTimeFromSeconds(time)}
            </span>{" "}
            /{" "}
            <span className="w-10 inline-block">
              {getTimeFromSeconds(episode?.duration)}
            </span>
          </p>
          <div className="md:flex items-center hidden gap-2">
            <img src={Volume} alt="voice-icon" className="w-6" />
            <input
              value={volume}
              max={1}
              min={0}
              step="0.01"
              onChange={onVolumeChange}
              type="range"
              className="w-full accent-black h-1 outline-none rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
