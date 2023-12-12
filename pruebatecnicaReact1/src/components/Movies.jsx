const ListOfMovies = ({ movies }) => {
  return movies.map((val) => (
    <div className="movie-card" key={val.id}>
      <h3>{val.title}</h3>
      <h5>{val.year}</h5>
      <img src={val.poster} alt={val.title} />
    </div>
  ));
};

const NoMovies = ({ errorMovie, movies }) => {
  console.log(movies);
  if (errorMovie)
    return (
      <p
        style={{
          textAlign: "center",
          color: "red",
          fontWeight: "800",
          fontSize: "24px",
        }}
      >
        {errorMovie}
      </p>
    );
  else
    return (
      <p
        style={{
          textAlign: "center",
          color: "red",
          fontWeight: "800",
          fontSize: "24px",
        }}
      >
        {movies?.Error === "Too many results."
          ? "Demasiados Resultados"
          : "Película no encontrada"}
      </p>
    );
};

const Movies = ({ movies, errorMovie }) => {
  const hasMovies = movies?.length > 0;
  console.log(movies);
  return hasMovies ? (
    <ListOfMovies movies={movies} />
  ) : (
    <NoMovies errorMovie={errorMovie} movies={movies} />
  );
};

export default Movies;
