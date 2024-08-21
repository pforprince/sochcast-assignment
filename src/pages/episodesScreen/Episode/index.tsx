import { FC } from "react";
import Pause from "/pause.svg";
import Play from "/play.svg";
import { IEpisode } from "../../../types/Episode";
import { getTimeFromSeconds } from "../../../utils/helper";

type EpisodeProps = {
  episode: IEpisode;
  playingEpisode: IEpisode | undefined;
  setPlayingEpisode: (episode?: IEpisode) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
};

const selectedClasses = "border-primary border bg-orange-50";

const Episode: FC<EpisodeProps> = ({
  episode,
  playingEpisode,
  setPlayingEpisode,
  setIsPlaying,
  isPlaying,
}) => {
  return (
    <div
      key={episode.id}
      className={`flex my-4 items-center gap-1 lg:gap-2 border hover:shadow-sm hover:border-primary p-2 rounded-md
    ${episode.id == playingEpisode?.id ? selectedClasses : ""}
    `}
    >
      <p className="text-gray-500">{episode.episode_number}</p>
      <div
        className={`flex justify-between cursor-pointer gap-4 lg:gap-0 w-full px-2 items-center gap-2 `}
      >
        <div className="flex gap-2 items-center w-[75%] lg:w-[85%]">
          <img
            className="w-10 rounded-md"
            src={episode.episode_compressed_image}
          />
          <p className="line-clamp-2 text-sm lg:text-lg">{episode.name}</p>
        </div>
        <div className="flex gap-3 items-center w-[25%] justify-end lg:w-[10%]">
          <p className="w-12">{getTimeFromSeconds(episode.duration)}</p>
          <img
            onClick={() => {
              if (isPlaying && playingEpisode?.id === episode.id) {
                setIsPlaying(false);
              } else {
                setPlayingEpisode(episode);
                setIsPlaying(true);
              }
            }}
            className="h-5"
            src={isPlaying && playingEpisode?.id === episode.id ? Pause : Play}
            alt="play-button"
          />
        </div>
      </div>
    </div>
  );
};

export default Episode;
