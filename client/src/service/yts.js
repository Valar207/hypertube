import axios from "axios";

const url = "https://yts.unblockedproxy.biz/api/v2";
const list = url + "/list_movies.json";
const details = url + "/movie_details.json";

export const fetchMovieDetailsYTS = async (movie_id) => {
  try {
    const { data } = await axios.get(details, {
      params: {
        movie_id,
        with_images: true,
        with_cast: true,
      },
      withCredentials: false,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieSearchYTS = async (movie, pageNumber) => {
  try {
    const { data } = await axios.get(list, {
      params: {
        query_term: movie,
        page: pageNumber,
      },
      withCredentials: false,
    });
    const modifiedData = data.data.movies.map((m) => ({
      id: m["id"],
      backPoster: m["large_cover_image"],
      popularity: m["rating"],
      title: m["title"],
      poster: m["large_cover_image"],
      overview: m["summary"],
      rating: m["rating"],
      year: m["year"],
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchMoviesYTS = async (genre, pageNumber, sort) => {
  try {
    const { data } = await axios.get(list, {
      params: {
        page: pageNumber,
        genre: genre ? genre : null,
        sort_by: sort ? sort : null,
      },
      withCredentials: false,
    });
    const modifiedData = data.data.movies.map((m) => ({
      id: m["id"],
      backPoster: m["medium_cover_image"],
      popularity: m["rating"],
      title: m["title"],
      poster: m["medium_cover_image"],
      overview: m["summary"],
      rating: m["rating"],
      year: m["year"],
    }));

    return modifiedData;
  } catch (error) {}
};
