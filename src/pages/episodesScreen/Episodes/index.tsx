import { FC, useEffect, useState } from "react";
import { IEpisode } from "../../../types/Episode";
import { IShow } from "../../../types/Show";

import Episode from "../Episode";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import AudioPlayer from "../../../components/AudioPlayer";
import { BASE_URL } from "../../../utils/constants";

type EpisodeProps = {
  slug: string;
};

const Episodes: FC<EpisodeProps> = ({ slug }) => {
  const [playingEpisode, setPlayingEpisode] = useState<IEpisode>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [episodesList, setEpisodeList] = useState<IEpisode[]>([]);
  const [show, setShow] = useState<IShow>();

  const fetchEpisodes = (slug: string) => {
    const url = `${BASE_URL}/listener/show/${slug}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const episodes = (data.results as IEpisode[]) || [];
        // sort the episodes based on sequence
        setEpisodeList(
          episodes.sort((a, b) => a.episode_number - b.episode_number)
        );
        setShow(data.results[0].shows[0] as IShow);
      })
      .catch(console.error);
  };

  // function to play next audio file
  const playNext = () => {
    const currentIndex = episodesList.findIndex(
      (episode) => episode.id === playingEpisode?.id
    );

    if (currentIndex !== -1 && currentIndex !== episodesList.length - 1) {
      setPlayingEpisode(episodesList[currentIndex + 1]);
    }
  };

  // function to play previous audio file
  const playPrev = () => {
    const currentIndex = episodesList.findIndex(
      (episode) => episode.id === playingEpisode?.id
    );

    if (currentIndex !== -1 && currentIndex !== 0) {
      setPlayingEpisode(episodesList[currentIndex - 1]);
    }
  };

  useEffect(() => {
    // fetch episodes
    fetchEpisodes(slug);
  }, [slug]);

  return (
    <div>
      <Layout>
        <div className="pb-28">
          {show && (
            <div className="flex items-center gap-3 mb-4">
              <img className="w-16 lg:w-20 rounded-md" src={show?.show_image} />
              <p className="text-xl lg:text-3xl">{show?.name}</p>
            </div>
          )}
          <Heading title="Episodes" />

          <div>
            {episodesList?.map((episode) => (
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
