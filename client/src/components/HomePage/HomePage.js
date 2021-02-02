import React, { useEffect, useState } from "react";
import { Box, Grid, GridList, GridListTileBar, GridListTile } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import "./HomePage.scss";
import HorizontalScroll from "react-scroll-horizontal";
import { Link } from "react-router-dom";
import {
  fetchMoviesTMDB,
  fetchGenreTMDB,
  fetchMovieByGenreTMDB,
  fetchPersonsTMDB,
  fetchTopratedMovieTMDB,
} from "../../service/tmdb";
import { fetchMoviesYTS, fetchMovieSearchYTS, fetchMoviesByGenreYTS } from "../../service/yts";

import textToImage from "text-to-image";

export const HomePage = () => {
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGenre = async () => {
    setGenre(await fetchGenreTMDB());
  };
  const setMovie = async () => {
    const movie = [];
    for await (const g of genre) {
      movie.push(await fetchMoviesYTS(g.name));
    }
    setMovieByGenre(movie);
    setLoading(false);
  };

  useEffect(() => {
    fetchGenre();
  }, []);
  useEffect(() => {
    setLoading(true);
    setMovie();
  }, [genre]);

  const handleImageError = async (event, title) => {
    event.preventDefault();
    const image = event.target;
    const options = {
      customHeight: 200,
      textAlign: "center",
      lineHeight: 200,
      fontSize: 25,
    };
    const dataUri = await textToImage.generate(title, options);
    image.src = dataUri;
  };

  return (
    <div className="homePage__body">
      {genre?.map((item, index) => (
        <div className="homePage__section">
          <Grid container spacing={1} key={index}>
            <Grid item xs={12}>
              <h2>
                {item.name}
                <Link to={`/ListMovie/${item.name}`} className="homePage__section-link">
                  see more <ChevronRight />
                </Link>
              </h2>
            </Grid>
            <div className="homePage__section-items">
              <HorizontalScroll reverseScroll={true} style={{ position: "inherit" }}>
                <Grid item xs={12}>
                  <GridList id="items" key={index}>
                    {loading
                      ? Array.from(new Array(15)).map(() => (
                          <GridListTile
                            style={{
                              height: "300px",
                              width: "200px",
                              margin: "10px 5px",
                            }}
                          >
                            <Skeleton
                              animation={"pulse"}
                              variant="rect"
                              width={200}
                              height={240}
                              style={{
                                backgroundColor: "gray",
                                marginBottom: "5px",
                              }}
                            />
                            <Skeleton style={{ backgroundColor: "gray" }} />
                            <Skeleton width="70%" style={{ backgroundColor: "gray" }} />
                          </GridListTile>
                        ))
                      : movieByGenre[index]?.slice(0, 15).map((movie, index) => {
                          return (
                            <GridListTile
                              key={index}
                              style={{
                                height: "300px",
                                width: "200px",
                                margin: "10px 5px",
                              }}
                            >
                              <Link to={`/playerpage/${movie.id}`}>
                                <img
                                  src={movie.poster}
                                  alt=""
                                  className="items-img"
                                  onError={(e) => handleImageError(e, movie.title)}
                                />
                                <GridListTileBar
                                  key={index}
                                  className="items-title"
                                  title={movie.title}
                                  subtitle={
                                    `Rate: ${movie.rating}` + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + `Year: ${movie.year}`
                                  }
                                />
                              </Link>
                            </GridListTile>
                          );
                        })}
                    {!loading && (
                      <GridListTile
                        key={index}
                        style={{
                          height: "300px",
                          width: "200px",
                          margin: "10px 5px",
                        }}
                      >
                        <Link to={`/listMovie/${item.name}`}>
                          <img src="/img/seemore.jpg" alt="" className="items-img" />
                        </Link>
                      </GridListTile>
                    )}
                  </GridList>
                </Grid>
                <div></div>
              </HorizontalScroll>
            </div>
          </Grid>
        </div>
      ))}
    </div>
  );
};
export default HomePage;
