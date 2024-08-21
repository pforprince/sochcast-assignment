import { FC } from "react";
import Pause from "/pause.svg";
import Play from "/play.svg";

type PlayPauseProps = {
  isPlaying: boolean;
  togglePlayPause: () => void;
};

const PlayPause: FC<PlayPauseProps> = ({ isPlaying, togglePlayPause }) => {
  return (
    <button onClick={togglePlayPause}>
      <img
        className="lg:w-7 w-5 cursor-pointer"
        alt="play-pause-icon"
        src={isPlaying ? Pause : Play}
      />
    </button>
  );
};

export default PlayPause;
