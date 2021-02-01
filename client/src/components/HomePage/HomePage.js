import React, { useEffect, useState } from "react";
import {
  Grid,
  GridList,
  GridListTileBar,
  GridListTile,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
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
import {
  fetchMoviesYTS,
  fetchMovieSearchYTS,
  fetchMoviesByGenreYTS,
} from "../../service/yts";

import textToImage from "text-to-image";

export const HomePage = () => {
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [genre, setGenre] = useState([]);

  const fetchGenre = async () => {
    setGenre(await fetchGenreTMDB());
  };
  const setMovie = async () => {
    const teste = [];
    for await (const g of genre) {
      teste.push(await fetchMoviesYTS(g.name));
    }
    setMovieByGenre(teste);
  };

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

  useEffect(() => {
    fetchGenre();
  }, []);

  useEffect(() => {
    setMovie();
  }, [genre]);

  return (
    <div className="homePage__body">
      {genre?.map((item, index) => (
        <div className="homePage__section">
          <Grid container spacing={1} key={index}>
            <Grid item xs={12}>
              <h2>
                {item.name}
                <Link
                  to={`/ListMovie/${item.name}`}
                  className="homePage__section-link"
                >
                  see more <ChevronRight />
                </Link>
              </h2>
            </Grid>
            <div className="homePage__section-items">
              <HorizontalScroll
                reverseScroll={true}
                style={{ position: "inherit" }}
              >
                <Grid item xs={12}>
                  <GridList id="items" key={index}>
                    {movieByGenre[index]?.slice(0, 15).map((movie, index) => {
                      return (
                        <GridListTile
                          key={index}
                          style={{
                            height: "300px",
                            width: "200px",
                            margin: "10px 5px",
                          }}
                        >
                          <Link to={`/playerpage/${movie.title}`}>
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              onError={(event) =>
                                handleImageError(event, movie.title)
                              }
                              className="items-img"
                            />
                            <GridListTileBar
                              key={index}
                              className="items-title"
                              title={movie.title}
                              subtitle={"Rate : " + movie.rating}
                            />
                          </Link>
                        </GridListTile>
                      );
                    })}
                    <GridListTile
                      key={index}
                      style={{
                        height: "300px",
                        width: "200px",
                        margin: "10px 5px",
                      }}
                    >
                      <Link to={`/listMovie/${item.name}`}>
                        <img
                          src="/img/seemore.jpg"
                          alt=""
                          className="items-img"
                        />
                      </Link>
                    </GridListTile>
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
