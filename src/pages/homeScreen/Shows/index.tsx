import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { IShow } from "../../../types/Show";
import Heading from "../../../components/Heading";
import { BASE_URL } from "../../../utils/constants";

const Shows = () => {
  const url = `${BASE_URL}/listener/sochcast-originals`;

  const [showList, setShowList] = useState<IShow[]>([]);

  const fetchShows = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setShowList((data.results as IShow[]) || []))
      .catch(console.error);
  };

  useEffect(() => {
    // fetch the shows
    fetchShows();
  }, []);

  return (
    <div className="my-6">
      <Heading title="Shows" />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 mt-4">
        {showList?.length ? (
          showList?.map((show) => (
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
