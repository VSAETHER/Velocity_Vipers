import axios from "axios";
import { Category } from "../models/category";
const API_KEY = import.meta.env.VITE_API_KEY;

export const getCategories = () => {
  const allMovieURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-EU`;

  return axios
    .get<{ genres: Category[] }>(allMovieURL)
    .then((response) => {
      return response.data.genres;
    })
    .catch((error) => {
      console.log(error);
    });
};
