import React from 'react';
import { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import style from "./SearchBar.module.css";


interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }

    onSubmit(query.trim());
    setQuery("");
  };

  return (
    <header className={style.header}>
      <form onSubmit={handleFormSubmit}>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
        <button className={style.btnSearch} type="submit">Search</button>
      </form>
      <Toaster position="top-right" />
    </header>
  );
};


export default SearchBar;
