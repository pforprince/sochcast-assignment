import { FC, useCallback, useEffect, useState } from "react";
import { IEpisode } from "../../../types/Episode";
import { IShow } from "../../../types/Show";

import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "../../../components/AudioPlayer";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import Loader from "../../../components/Loader";
import { fetchEpisodesSuccess } from "../../../store/slices/episodeSlice";
import { RootState } from "../../../store/store";
import { BASE_URL } from "../../../utils/constants";
import Episode from "../Episode";

type EpisodeProps = {
  slug: string;
};

const Episodes: FC<EpisodeProps> = ({ slug }) => {
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
        dispatch(fetchEpisodesSuccess({ slug, episodes }));

        setShow(data.results[0].shows[0] as IShow);
      })
      .catch(console.error);
  }, []);

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
                src={show.show_image}
              />
              <p className="text-xl lg:text-3xl">{show.name}</p>
            </div>
          )}
          <Heading title="Episodes" />

          <div>
            {episodes?.map((episode, index) => (
              <Episode index={index + 1} episode={episode} key={episode.id} />
            ))}
          </div>
        </div>
      </Layout>
      <AudioPlayer slug={slug} />
    </div>
  );
};

export default Episodes;
