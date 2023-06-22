import axios from "axios";
import { Movie } from "../models/Movie";
import { Category } from "../models/category";
import { Review } from "../models/Review";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getAllMovies = () => {
  const allMovieURL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-EU`;

  return axios
    .get<{ results: Movie[] }>(allMovieURL)
    .then((response) => response.data.results)
    .catch((error) => {
      console.log(error);
    });
};

export const getMovieById = async (movieId: string | undefined) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-EU`;
  try {
    return await axios.get(url).then((res) => {
      console.log(res.data);
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMovieByCategory = (specificCategory: Category) => {
  const SpecificCategoryUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${specificCategory.id}`;
  return axios
    .get<{ results: Movie[] }>(SpecificCategoryUrl)
    .then((response) => response.data.results)
    .catch((error) => {
      console.log(error);
    });
};

export const getMoviesBySearch = async (search: string | undefined) => {
  const url = `${BASE_URL}/search/movie?query=${search}&api_key=${API_KEY}&include_adult=false&language=fr&page=1`;
  return axios
    .get<{ results: Movie[] }>(url)
    .then((response) => response.data.results)
    .catch((error) => {
      console.log(error);
    });
};

export const getPages = async (movieOnPage: number, categoryId?: number) => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-EU&page=${movieOnPage}`;
  if (categoryId) {
    url += `&with_genres=${categoryId}`;
  }

  return axios
    .get<{ results: Movie[] }>(url)
    .then((response) => response.data.results)
    .catch((error) => {
      console.log(error);
    });
};



export const getMovieReviews = async (movieId: string | undefined) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`;
	try {
		return axios.get<{ results: Review[] }>(url).then((res) => res.data.results);
	} catch (err) {
		console.error(err);
	}
};
