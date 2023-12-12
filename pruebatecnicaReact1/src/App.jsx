import { useState, useCallback } from "react";
import Movies from "./components/Movies";
import useMovie from "./hooks/useMovie";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const {
    movies: mappedMovies,
    getMovies,
    isLoading,
    error: errorMovie,
  } = useMovie({ search, sort });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetMovies = useCallback(
    debounce((search) => {
      console.log({ search });
      getMovies({ search });
    }, 400),
    [getMovies]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery.startsWith(" ")) return;
    updateSearch(newQuery);
    debounceGetMovies(newQuery);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <>
      <header>
        <h1>Lista de Películas</h1>
      </header>
      <main>
        <form className="form-search-movie" onSubmit={handleSubmit}>
          <input
            placeholder="Escriba su película"
            type="search"
            onChange={handleChange}
            value={search}
          />
          <label htmlFor="sort">Ordenar</label>
          <input
            type="checkbox"
            id="sort"
            name="sorted"
            onChange={handleSort}
            checked={sort}
          />
          <input type="submit" value="Buscar" />
        </form>
        {error && (
          <p style={{ color: "red", textAlign: "center", margin: 0 }}>
            {error}
          </p>
        )}
        <section className="peliculas-container">
          {!isLoading ? (
            <Movies movies={mappedMovies} errorMovie={errorMovie} />
          ) : (
            <p style={{ textAlign: "center" }}>Cargando.......</p>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
