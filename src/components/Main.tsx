import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { api } from "../api/api";

interface MovieInteface {
  backdrop_path: string;
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
}

const Main = () => {
  const [movies, setMovie] = useState<MovieInteface[]>([]);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(api.fetchTrending);
      const data: MovieInteface[] = res.data.results;
      setMovie((prev) => data);
    };
    fetchMovies();
  }, []);

  const movie = useMemo(() => {
    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]);

  const limitText = (stg: string, num: number) => {
    if (stg?.length > num) {
      return stg.slice(0, num) + "...";
    } else {
      return stg;
    }
  };

  const watch = () => {
    setTick((tick) => !tick);
  };
  return (
    <>
      {movies.length && (
        <div className=" w-full h-[550px] text-white ">
          <div className="w-full h-full">
            <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
            <div className="absolute w-full top-[20%] p-4 md:p-8">
              <h2 className="text-3xl md:text-5xl mb-4">{movie?.title}</h2>
              <button className="border rounded bg-gray-300 text-black border-gray-300 py-2 px-5">
                Play
              </button>
              <button
                onClick={watch}
                className="border rounded  text-white ml-4 border-gray-300 py-2 px-5"
              >
                <div className="flex items-center gap-2">
                  {tick ? (
                    <span>
                      <AiOutlineCheck />
                    </span>
                  ) : (
                    <span>
                      <AiOutlinePlus />
                    </span>
                  )}
                  <span>Watch later</span>
                </div>
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Release Date : {movie?.release_date}
              </p>
              <p className=" text-gray-200 mt-2 w-fll md:max-w-[70%] lg:max-w-[50%] xlg:max-w-[35%]">
                {limitText(movie?.overview, 200)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
