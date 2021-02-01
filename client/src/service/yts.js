import axios from "axios";

const url = "https://yts.unblockedproxy.biz/api/v2";
const list = url + "/list_movies.json";

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
    }));

    return modifiedData;
  } catch (error) {}
};
