import { useState, useEffect } from 'react';
import movieDB from '../api/movieDB';
import { Cast, CreditResponse } from '../interfaces/creditsInterfaces';
import { MovieFull } from '../interfaces/movieInterfaces';

interface MovieDetails{
    isLoading: boolean;
    movieFull?: MovieFull;
    cast:Cast[];
}


export const useMoviesDetails = (movieId: number) => {
  
    const [state, setState] = useState<MovieDetails>({
        isLoading:true,
        movieFull:undefined,
        cast:[]
        
    });

    const getMovieDetails = async() => {

        const movieDetailsPromise =  movieDB.get<MovieFull>(`/${ movieId }`);
        const castPromise =  movieDB.get<CreditResponse>(`/${ movieId }/credits`);

        const [movieDetailsResp,castPromiseResp]  = await Promise.all([movieDetailsPromise,castPromise]);

        setState({
            isLoading:false,
            movieFull:movieDetailsResp.data,
            cast:castPromiseResp.data.cast
        });
    }


    useEffect(() => {
      getMovieDetails();
    }, [])
    
    return{
        ...state
    }
}
