import axios from "axios";

const url = "http://localhost:5000/api/v1";
const movie = url + "/movie";

export const fetchMovieDetails = async (movie_id) => {
  try {
    const { data } = await axios.get(movie + `/getMovie/${movie_id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error(error);
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
