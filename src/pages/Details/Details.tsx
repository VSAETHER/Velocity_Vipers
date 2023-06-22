import { useEffect, useState } from "react";

import "./Details.css";

import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

import { getMovieById, getMovieReviews } from "../../api/movie";
import { useParams } from "react-router-dom";
import { Movie } from "../../models/Movie";
import { Review } from "../../models/Review";

export const Details = () => {
  const [movie, setMovie] = useState<null | Movie>(null);
  const [review, setReview] = useState<undefined | Review[]>(undefined);//creation variable pour review
  const { id } = useParams();
  

  useEffect(() => {
    const test = async () => {
      const test = await getMovieById(id);
      const test2 = await getMovieReviews(id); //(tentative) d'utiliser l'API
      setMovie(test);
      setReview(test2); // ajout test2
    };

    test();
  }, []);

  if (movie == null) return <p>Loading...</p>;
  if (review == null) return <p>Loading...</p>; // ajout vérif
  console.log(review[0].author);

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
       <ul> 
        <li>{review[0].author}</li>
        <li>{review[0].content}</li>
        <li>{review[0].created_at}</li>
        </ul>
        </div>
      </div>
    </main>
  );
};
