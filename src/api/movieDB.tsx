import axios from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'e2ab66b692f6519ee3f3f115e1fb315b',
        language: 'es-ES'
    }
});

export default movieDB;