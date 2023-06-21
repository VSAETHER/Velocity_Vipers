import React from "react";

import { Search } from "./components/Search";
import { Filter } from "./components/Filter";
import { CardsList } from "./components/CardsList";

import "./HomePage.css";

import { getAllMovies } from "../../api/movie";
import { getMovieByCategory } from "../../api/movie";
import { getMoviesBySearch } from "../../api/movie";
import { getPages } from "../../api/movie";

import { useState, useEffect } from "react";
import { Movie } from "../../models/Movie";
import { Category } from "../../models/category";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const HomePage = () => {
  //********************* USE STATE **************************
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setcurrentPage] = useState(1);

  // ***************************** FETCH ALL MOVIES **************************************
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getAllMovies();
      console.log("getAllMovies : " + getAllMovies());
      if (moviesData != null && moviesData.length > 0) setMovies(moviesData);
    };
    fetchMovies();
  }, []);

  // ***************************** FETCH CATEGORY **************************************

  useEffect(() => {
    setcurrentPage(1);
    const fetchMoviesByCategory = async (categoryId: Category) => {
      const moviesData = await getMovieByCategory(categoryId);
      if (moviesData != null && moviesData.length > 0) {
        setMovies(moviesData);
      }
    };

    if (selectedCategory != null) {
      fetchMoviesByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // ***************************** FETCH SEARCH **************************************

  useEffect(() => {
    const fetchMoviesBySearch = async () => {
      if (searchValue) {
        const moviesData = await getMoviesBySearch(searchValue);
        if (moviesData != null && moviesData.length > 0) {
          setMovies(moviesData);
        }
      }
    };

    fetchMoviesBySearch();
  }, [searchValue]);

  //*********************** PAGINATION ***********************/

  useEffect(() => {
    const fetchPage = async () => {
      if (currentPage < 1) {
        setcurrentPage(1);
      }
      const moviesDataOnPage = await getPages(
        currentPage,
        selectedCategory?.id
      );
      if (moviesDataOnPage != null && moviesDataOnPage.length > 0) {
        setMovies(moviesDataOnPage);
      }
    };

    fetchPage();
  }, [currentPage]);

  return (
    <div className="HomeFilm">
      <Filter setSelectedCategory={setSelectedCategory} />
      <div className="right-block">
        <Search onSearch={setSearchValue} />
        <CardsList movies={movies} />
        <div className="pagination">
          <button
            className="buttonPage"
            onClick={() => setcurrentPage(currentPage - 1)}
          >
            {currentPage > 1 ? <IoIosArrowBack className="arrow" /> : null}
          </button>

          <button
            className="buttonPage"
            onClick={() => setcurrentPage(currentPage - 1)}
          >
            {currentPage === 1 ? "" : currentPage - 1}
          </button>

          <button className="buttonPage current">{currentPage}</button>
          <button
            className="buttonPage "
            onClick={() => setcurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
          <button
            className="buttonPage"
            onClick={() => setcurrentPage(currentPage + 1)}
          >
            <IoIosArrowForward className="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};
