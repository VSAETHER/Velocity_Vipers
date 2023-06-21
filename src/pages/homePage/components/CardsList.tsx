import { Link } from "react-router-dom";

import "./CardsList.css";

import { Card } from "./Card";
import { Movie } from "../../../models/Movie";

interface MoviesProps {
  movies: Movie[];
}

export const CardsList = ({ movies }: MoviesProps) => {
  return (
    <div className="CardsList">
      {movies.map((movie) => (
        <div key={movie.id}>
          <Link className="link-card" to={`/details/${movie.id}`}>
            <Card src={movie.poster_path} title={movie.title} />
          </Link>
        </div>
      ))}
    </div>
  );
};
