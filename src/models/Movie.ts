import { Category } from "./category";

export interface Movie {
  id: number;
  title: string;
  genres: Category[];
  poster_path: string;
  release_date: string;
  runtime: number;
  overview: string;
}
