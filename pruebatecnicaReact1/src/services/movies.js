const API_KEY = 'f57b5432';

export const searchMovies = async ({search}) => {
    const controller = new AbortController();
    setTimeout(() => {
        controller.abort();
    }, 800)
    if (search === '') return null
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`,
        {
            signal: controller.signal
        });
        const data = await response.json();
        const movies = data.Search?data.Search.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        })):data;
        return movies
    } catch (error) {
        throw new Error('Error searching movies')
    }
    
}
