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

    reviews.unshift({
      id_film: id,
      content: reviewInput,
      id_review: Math.floor(Math.random() * 999999),
      author: nameInput,
      created_at: Date(),
    });
    setNameInput("");
    setReviewInput("");
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
        <div className="left-container">
          <figure>
            <img
              className="detail-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} //????
            />
          </figure>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={nameInput}
                onChange={handleNameInputChange}
              />
            </label>
            <br></br>
            <br></br>
            <label>
              Review:
              <input
                type="text"
                value={reviewInput}
                onChange={handleReviewInputChange}
              />
            </label>
            <br></br>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </div>
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

          <h1>Reviews</h1>
          {reviews.map((x: any) => (
            <ul className="reviews">
              <li>
                <h2>{x.author}</h2>
              </li>
              <li>{x.content}</li>
              <br></br>
              <li>{x.created_at.substring(0, 15)}</li>
              <br></br>
              <button onClick={() => removeReview(x.id_review)}>
                remove review
              </button>
              <LikeButton/>
            </ul>
          ))}
          {review.map((review) => (
            <ul className="reviews">
              <li>
                <h2>{review.author}</h2>
              </li>
              <li>{review.content}</li>
              <br></br>
              <li>{review.created_at.substring(0, 10)}</li>
              <LikeButton/>
            </ul>
          ))}
        </div>
      </div>
    </main>
  );
};
