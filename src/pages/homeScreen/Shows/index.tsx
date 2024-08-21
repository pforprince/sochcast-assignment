import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Heading from "../../../components/Heading";

import { RootState } from "../../../store/store";
import { IShow } from "../../../types/Show";
import { BASE_URL } from "../../../utils/constants";
import Loader from "../../../components/Loader";
import {
  fetchShows,
  fetchShowsFailure,
  fetchShowsStart,
} from "../../../store/slices/showSlice";

const Shows = () => {
  const url = `${BASE_URL}/listener/sochcast-originals`;

  const { shows, loading, error } = useSelector(
    (state: RootState) => state.show
  );

  const dispatch = useDispatch();

  const fetchShowHandler = useCallback(() => {
    dispatch(fetchShowsStart());
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const showsList = (data.results as IShow[]) || [];
        dispatch(fetchShows(showsList));
      })
      .catch((e) => {
        console.error(e);
        dispatch(fetchShowsFailure("Failed to fetch shows"));
      });
  }, [dispatch, url]);

  useEffect(() => {
    if (!shows.length) fetchShowHandler();
  }, [fetchShowHandler, shows.length]);

  if (loading) return <Loader />;

  if (error) return <p>{error}</p>;

  return (
    <div className="my-6">
      <Heading title="Shows" />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 mt-4">
        {shows?.length ? (
          shows?.map((show) => (
            <Link
              to={`/episodes/${show.slug}`}
              key={show.id}
              className="flex gap-2 items-center group bg-white shadow-sm my-2 duration-100 cursor-pointer p-2 rounded-md
            border hover:border-primary hover:shadow-md"
            >
              <img
                className="w-20 shadow-md rounded-md group-hover:scale-110 duration-200"
                src={show.show_compressed_image}
                alt={show.name}
              />
              <p className="text-base lg:text-xl duration-200 group-hover:translate-x-2 ">
                {show.name}
              </p>
            </Link>
          ))
        ) : (
          <p>No Show found!</p>
        )}
      </div>
    </div>
  );
};

export default Shows;
