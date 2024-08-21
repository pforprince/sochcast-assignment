import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Next from "/next.svg";
import Prev from "/prev.svg";
import Volume from "/volume.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  setEpisode,
  stopPlayer,
  togglePlay,
} from "../../store/slices/playerSlice";
import { RootState } from "../../store/store";
import { getTimeFromSeconds } from "../../utils/helper";
import PlayPause from "../PlayPause";
import RangeInput from "../RangeInput";

const AudioPlayer = ({ slug }: { slug: string }) => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number>(0);

  const [time, setTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);

  const player = useSelector((state: RootState) => state.player);
  const { values } = useSelector((state: RootState) => state.episode);

  const episode = player.episode;
  const isPlaying = player.isPlaying;

  const episodes = useMemo(() => {
    return values.find((episode) => episode.slug === slug)?.episodes || [];
  }, [values, slug]);

  const playNextHandler = useCallback(() => {
    const currentIndex = episodes.findIndex(
      (episode) => episode.id === player?.episode?.id
    );
    if (currentIndex !== -1 && currentIndex !== episodes.length - 1) {
      dispatch(setEpisode(episodes[currentIndex + 1]));
    }
  }, [dispatch, episodes, player?.episode?.id]);

  const playPrevHandler = () => {
    const currentIndex = episodes.findIndex(
      (episode) => episode.id === player?.episode?.id
    );

    if (currentIndex !== -1 && currentIndex !== 0) {
      dispatch(setEpisode(episodes[currentIndex - 1]));
    }
  };

  useEffect(() => {
    // if new track is played, set time to 0
    setTime(0);
    if (audioRef.current) audioRef.current.play();
  }, [dispatch, player.episode]);

  useEffect(() => {
    // stop the player if user has navigated back to home screen
    return () => {
      dispatch(stopPlayer());
    };
  }, [dispatch]);

  useEffect(() => {
    // toggle audio
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
    if (time === episode?.duration) playNextHandler();

    if (audio) {
      audio.addEventListener("timeupdate", updateTimeHandler);
    }

    return () => {
      // remove the listener
      if (audio) {
        audio.removeEventListener("timeupdate", updateTimeHandler);
      }
    };
  }, [audioRef, episode, playNextHandler, time]);

  const onVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  const onAudioChange = (value: number) => {
    setTime(Math.round(Number(value)));
    if (audioRef.current) audioRef.current.currentTime = Number(value);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      dispatch(togglePlay());
    } else {
      audioRef.current?.play();
      dispatch(togglePlay());
    }
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
          <RangeInput
            max={episode.duration}
            value={time}
            onChange={onAudioChange}
          />

          <div className="flex gap-3 lg:gap-6 justify-center">
            <button onClick={playPrevHandler}>
              <img
                className="lg:w-7 w-5 cursor-pointer"
                alt="prev-icon"
                src={Prev}
              />
            </button>
            <PlayPause
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
            />
            <button onClick={playNextHandler}>
              <img
                className="lg:w-7 w-5 cursor-pointer"
                alt="next-icon"
                src={Next}
              />
            </button>
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
          <div className="md:flex items-end hidden gap-2">
            <img src={Volume} alt="voice-icon" className="w-6" />
            <RangeInput
              max={1}
              value={volume}
              onChange={onVolumeChange}
              className="!accent-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
