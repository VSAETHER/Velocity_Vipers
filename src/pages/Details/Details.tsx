import { useEffect, useState } from "react";

import "./Details.css";

import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

import { getMovieById } from "../../api/movie";
import { useParams } from "react-router-dom";
import { Movie } from "../../models/Movie";

export const Details = () => {
  const [movie, setMovie] = useState<null | Movie>(null);

  const { id } = useParams();

  useEffect(() => {
    const test = async () => {
      const test = await getMovieById(id);
      setMovie(test);
    };

    test();
  }, []);

  if (movie == null) return <p>Loading...</p>;

  return (
    <main className="detail-main">
      <div className="details-page">
        <figure>
          <img
            className="detail-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} //????
          />
        </figure>
        <div className="right-block">
          <h2 className="detail-title">{movie.title}</h2>

          <ul className="detail-list ">
            <li>
              <AiOutlineCalendar className="AiOutlineCalendar" />
              {movie.release_date.slice(0, 4)}
            </li>
            <li>
              <BiTimeFive className="BiTimeFive" />
              {movie.runtime}
            </li>
          </ul>

          <ul className="detail-list-genre genres">
            {movie.genres.map((x, i) => (
              <li key={"genre_" + i}>{x.name}</li>
            ))}
          </ul>
          <p className="detail-synopsis">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
};
