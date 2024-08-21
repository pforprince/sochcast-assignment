import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "../../../components/PlayPause";
import { setEpisode, togglePlay } from "../../../store/slices/playerSlice";
import { RootState } from "../../../store/store";
import { IEpisode } from "../../../types/Episode";
import { getTimeFromSeconds } from "../../../utils/helper";

type EpisodeProps = {
  episode: IEpisode;
  index: number;
};

const selectedClasses = "border-primary border bg-orange-50";

const Episode: FC<EpisodeProps> = ({ episode, index }) => {
  const { episode: currentEpisode, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const dispatch = useDispatch();

  const togglePlayPause = () => {
    if (currentEpisode?.id === episode.id) {
      dispatch(togglePlay());
    } else {
      dispatch(setEpisode(episode));
    }
  };

  return (
    <div
      className={`flex my-4 items-center gap-1 lg:gap-2 border hover:shadow-sm hover:border-primary p-2 rounded-md
    ${currentEpisode?.id === episode?.id ? selectedClasses : ""}
    `}
    >
      <p className="text-gray-500">{index}</p>
      <div
        className={`flex justify-between cursor-pointer lg:gap-0 w-full px-2 items-center gap-2 `}
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
          <PlayPause
            isPlaying={currentEpisode?.id === episode.id && isPlaying}
            togglePlayPause={togglePlayPause}
          />
        </div>
      </div>
    </div>
  );
};

export default Episode;
