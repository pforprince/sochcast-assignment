import { FC, useCallback, useEffect, useState } from "react";
import { IEpisode } from "../../../types/Episode";
import { IShow } from "../../../types/Show";

import Episode from "../Episode";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import AudioPlayer from "../../../components/AudioPlayer";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Loader from "../../../components/Loader";
import { fetchEpisodes } from "../../../store/slices/episodeSlice";

type EpisodeProps = {
  slug: string;
};

const Episodes: FC<EpisodeProps> = ({ slug }) => {
  const [playingEpisode, setPlayingEpisode] = useState<IEpisode>();
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  const { values, error, loading } = useSelector(
    (state: RootState) => state.episode
  );

  const episodes =
    values.find((episode) => episode.slug === slug)?.episodes || [];

  const [show, setShow] = useState<IShow>();

  const fetchEpisodesHandler = useCallback((slug: string) => {
    const url = `${BASE_URL}/listener/show/${slug}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const episodes = (data.results as IEpisode[]) || [];
        dispatch(fetchEpisodes({ slug, episodes }));

        setShow(data.results[0].shows[0] as IShow);
      })
      .catch(console.error);
  }, []);

  // function to play next audio file
  const playNext = () => {
    const currentIndex = episodes.findIndex(
      (episode) => episode.id === playingEpisode?.id
    );

    if (currentIndex !== -1 && currentIndex !== episodes.length - 1) {
      setPlayingEpisode(episodes[currentIndex + 1]);
    }
  };

  // function to play previous audio file
  const playPrev = () => {
    const currentIndex = episodes.findIndex(
      (episode) => episode.id === playingEpisode?.id
    );

    if (currentIndex !== -1 && currentIndex !== 0) {
      setPlayingEpisode(episodes[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const existingEpisode = values.find((episode) => episode.slug === slug);

    if (!existingEpisode) {
      fetchEpisodesHandler(slug);
    } else {
      setShow(existingEpisode.episodes[0]?.shows[0]);
    }
  }, [fetchEpisodesHandler, slug, values]);

  if (loading) return <Loader />;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Layout>
        <div className="pb-28">
          {show && (
            <div className="flex items-center gap-3 mb-4">
              <img
                alt={show.name}
                className="w-16 lg:w-20 rounded-md"
                src={show?.show_image}
              />
              <p className="text-xl lg:text-3xl">{show?.name}</p>
            </div>
          )}
          <Heading title="Episodes" />

          <div>
            {episodes?.map((episode) => (
              <Episode
                key={episode.id}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                playingEpisode={playingEpisode}
                setPlayingEpisode={setPlayingEpisode}
                episode={episode}
              />
            ))}
          </div>
        </div>
      </Layout>
      <AudioPlayer
        playNext={playNext}
        playPrev={playPrev}
        episode={playingEpisode}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default Episodes;
