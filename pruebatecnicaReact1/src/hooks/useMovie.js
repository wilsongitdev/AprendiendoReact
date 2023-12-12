import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

const useMovie = ({search, sort}) => {

    const [ movies, setMovies] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef(search);
    
    const getMovies = useCallback(
        async ({search}) =>{
            if (previousSearch.current === search) return;
            try { 
                previousSearch.current = search;
                setIsloading(true);
                setError(null);
                const newMovies = await searchMovies({search});
                setMovies(newMovies);
            } catch (error) {
                setError(error.message)
            } finally{
                setIsloading(false);
            }
        }
    , [])

    const sortedMovies = useMemo(()=> {
        return sort? [...movies].sort((a, b) => a.title.localeCompare(b.title)): movies
    }       
    ,[sort, movies])
    
    return {movies: sortedMovies, getMovies, isLoading, error}

}
export default useMovie;