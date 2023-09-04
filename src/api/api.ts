export const API_KEY = 'c9724b35db16a18bc0a4834f3146b850';
const baseApiUrl = 'https://api.themoviedb.org/3';

export const  api = {
    fetchTrending: `${baseApiUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginal: `${baseApiUrl}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${baseApiUrl}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${baseApiUrl}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${baseApiUrl}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${baseApiUrl}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${baseApiUrl}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${baseApiUrl}/discover/movie?api_key=${API_KEY}&with_genres=99`,
} 
