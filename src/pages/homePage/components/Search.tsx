import React from "react";
import { useState } from "react";
import "./Search.css";

interface onSearchProps {
  onSearch: (value: string) => void;
}

export const Search = ({ onSearch }: onSearchProps) => {
  return (
    <form className="Search">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
        className="Search-input"
      />
    </form>
  );
};
