import { useEffect, useState } from "react";
import axios from "axios";

export default function useMoviesSearch(query, pageNumber) {
  const [searchLoading, setSearchLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  //   const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    setSearchLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: {
        query_term: movie,
        page: pageNumber,
        sort_by: sort ? sort : null,
      },
      withCredentials: false,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res);
        setMovies((prevMovies) => {
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
        });
        //   setHasMore(res.data.docs.length > 0)
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { searchLoading, error, movies };
}
