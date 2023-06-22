import { useEffect, useState } from "react";

import "./Details.css";

import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

import { getMovieById, getMovieReviews } from "../../api/movie";
import { useParams } from "react-router-dom";
import { Movie } from "../../models/Movie";
import { Review } from "../../models/Review";
import {LikeButton} from "../../shared/LikeButton";

export const Details = () => {
  const [movie, setMovie] = useState<null | Movie>(null);
  const [reviewInput, setReviewInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [review, setReview] = useState<undefined | Review[]>(undefined); //creation variable pour review
  const [state, setState] = useState(0);

  const handleReviewInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReviewInput(event.target.value);
  };
  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameInput(event.target.value);
  };

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

  const reviewsExists = () => {
    if (localStorage.getItem(`reviews${id}`))
      return JSON.parse(localStorage.getItem(`reviews${id}`)!);
    else return [];
  };
  const reviews = reviewsExists();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    reviews.push({
      id_film: id,
      content: reviewInput,
      id_review: Math.floor(Math.random() * 999999),
      author: nameInput,
      created_at: Date(),
    });
    localStorage.setItem(`reviews${id}`, JSON.stringify(reviews));
    setState(Math.floor(Math.random() * 999999));
  };

  if (movie == null) return <p>Loading...</p>;
  if (review == null) return <p>Loading...</p>; // ajout vérif
  console.log(review[0].author);
  console.log(review);
  console.log(reviews);

  const removeReview = (reviewId: any) => {
    const r = reviews.filter((x: any) => x.id_review !== reviewId);
    localStorage.setItem(`reviews${id}`, JSON.stringify(r));
    setState(Math.floor(Math.random() * 999999));
  };

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
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                value={nameInput}
                onChange={handleNameInputChange}
              />
              Review:
              <input
                type="text"
                value={reviewInput}
                onChange={handleReviewInputChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {reviews.map((x: any) => (
            <ul>
              <li>{x.author}</li>
              <li>{x.content}</li>
              <li>{x.created_at.substring(0, 10)}</li>
              <button onClick={() => removeReview(x.id_review)}>
                remove review
              </button>
            </ul>
          ))}
          <ul>
            review
            <li>{review[0].author}</li>
            <li>{review[0].content}</li>
            <li>{review[0].created_at.substring(0, 10)}</li>
          </ul>
        </div>
      </div>
    </main>
  );
};
