import React, { useEffect, useState } from "react";
import { Grid, GridList, GridListTileBar, GridListTile } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import "./HomePage.scss";
import HorizontalScroll from "react-scroll-horizontal";
import { Link } from "react-router-dom";
import {
  fetchMovies,
  fetchGenre,
  fetchMovieByGenre,
  fetchPersons,
  fetchTopratedMovie,
} from '../../service/tmdb'

export const HomePage = () => {
  const [movieByGenre, setMovieByGenre] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setMovieByGenre(await fetchMovieByGenre())
    }
    fetchAPI();
  }, []);

  const movieList = movieByGenre.slice(0, 10).map((item, index) => {
    return (
      <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
        <Link to={`/playerpage/${item.title}`}>
          <img src={item.poster} alt="" className="items-img" />
          <GridListTileBar className="items-title" title={item.title} subtitle={"Rate : " + item.rating} />
        </Link>
      </GridListTile>
    );
  });

  return (
    <div className="homePage__body">
      <div className="homePage__section">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h2>
              Horror
              <Link to={`/ListMovie/`} className="homePage__section-link">
                see more <ChevronRight />
              </Link>
            </h2>
          </Grid>
          <div className="homePage__section-items">
            <HorizontalScroll reverseScroll={true} style={{ position: "inherit" }}>
              <Grid item xs={12}>
                <GridList id="items" >
                  {movieList}
                </GridList>
              </Grid>
              <div></div>
            </HorizontalScroll>
          </div>
        </Grid>
      </div>
    </div>
  );
};
export default HomePage;
