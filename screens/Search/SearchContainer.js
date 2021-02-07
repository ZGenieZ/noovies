import React, { useState } from "react";
import { tvApi, movieApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default () => {
  const [keyword, setKeyword] = useState("");
  const onChange = (text) => setKeyword(text);
  const [results, setResults] = useState({
    movies: [],
    shows: [],
    movieError: null,
    showsError: null,
  });
  const search = async () => {
    if (keyword === "") {
      return;
    }
    const [movies, movieError] = await movieApi.search(keyword);
    const [shows, showsError] = await tvApi.search(keyword);
    setResults({
      movies,
      shows,
      movieError,
      showsError,
    });
  };
  return (
    <SearchPresenter
      {...results}
      onChange={onChange}
      onSubmit={search}
      keyword={keyword}
    />
  );
};
