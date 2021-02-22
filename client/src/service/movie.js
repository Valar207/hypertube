import axios from "axios";

const url = "http://localhost:5000/api/v1";
const movie = url + "/movie";
export var searchCancelToken = { id: null, source: null };

export const fetchMovieDetails = async (movie_id) => {
  try {
    const source = axios.CancelToken.source();
    searchCancelToken.source = source;
    searchCancelToken.id = Math.random().toString();
    const { data } = await axios.get(movie + `/${movie_id}`, {
      withCredentials: true,
      cancelToken: searchCancelToken.source.token,
    });
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log(error, "fetchMoviesSearchYTS");
      return "error";
    } else {
      throw error;
    }
  }
};

export const postMovieDetails = async (movieData) => {
  try {
    const { data } = await axios.post(movie, {
      withCredentials: true,
      body: movieData,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const downloadMovieInServer = async (movieDetails, torrent) => {
  try {
    const { data } = await axios.post(
      movie + "/downloadMovie",
      { movieDetails, torrent },
      {
        withCredentials: true,
      },
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
