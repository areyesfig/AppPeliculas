import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBMoviesResponse } from "../interfaces/movieInterfaces";

interface MoviesState{
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}


export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [movieState,setMoviesState] = useState<MoviesState>({
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: [],
    });

    const getMovies = async() => {

       const nowPayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');
       const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
       const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
       const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

       const resp = await Promise.all([
          nowPayingPromise,
          popularPromise,
          topRatedPromise,
          upcomingPromise
       ])
       
       setMoviesState({
        nowPlaying: resp[0].data.results,
        popular :resp[1].data.results,
        topRated: resp[2].data.results,
        upcoming:resp[3].data.results,
       })

        setIsLoading(false);
    } 

    useEffect(() => {
        getMovies();
     
      }, []);

  return {
    ...movieState
  }
};
