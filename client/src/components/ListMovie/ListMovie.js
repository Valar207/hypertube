import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import clsx from "clsx";
import { Close, Tune } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  Button,
  Grow,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Slider,
  Drawer,
  CssBaseline,
  List,
  Divider,
  IconButton,
} from "@material-ui/core";
import {
  fetchMoviesTMDB,
  fetchGenreTMDB,
  fetchMovieByGenreTMDB,
  fetchPersonsTMDB,
  fetchTopratedMovie,
  fetchMovieSearchTMDB,
} from "../../service/tmdb";
import { fetchMoviesYTS, fetchMovieSearchYTS } from "../../service/yts";
import { AppContext } from "../../App";
import axios from "axios";

import "./ListMovie.scss";
import "../../assets/Style.scss";

export const ListMovie = () => {
  const { search, setSearch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState({
    name: 65,
    years: [0, 100],
    rate: [0, 5],
  });
  const [checked, setChecked] = React.useState(false);
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingDisplay, setLoadingDisplay] = useState(true);

  const [movies, setMovies] = useState([]);

  const fetchAPI = async () => {
    const newMovies = await fetchMoviesYTS("", pageNumber);
    if (newMovies) {
      setMovies([...new Set([...movies, ...newMovies])]);
      setLoading(false);
    } else {
      setLoadingDisplay(false);
    }
    setGenre(await fetchGenreTMDB());
  };

  const searchAPI = async () => {
    let newMovies = await fetchMovieSearchYTS(search, pageNumber);
    if (newMovies) {
      setMovies([...new Set([...movies, ...newMovies])]);
      setLoading(false);
    } else {
      setLoadingDisplay(false);
    }
    setGenre(await fetchGenreTMDB());
  };

  //Pour savoir si le dernier élément est à l'écran
  const observer = useRef();
  const lastMovieElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((previousPageNumber) => previousPageNumber + 1);
          setLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);

    if (search) {
      searchAPI();
    } else {
      fetchAPI();
    }
  }, [search, pageNumber]);

  useEffect(() => {
    console.log(movies);
    // console.log(pageNumber);
    // console.log(loading);
  }, [movies]);

  const handleDrawerOpen = () => {
    setOpen(true);
    setChecked(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setChecked(false);
  };
  const handleChangeSlider = (name) => (e, newValue) => {
    setSliderValue({
      ...sliderValue,
      [name]: newValue,
    });
  };

  const handleGenreClick = async (genre) => {
    setPageNumber(1);
    setMovies(await fetchMoviesYTS(genre, pageNumber));
    setSearch("");
  };

  const movieList = movies?.map((item, index) => {
    if (movies.length === index + 1) {
      return (
        <GridListTile ref={lastMovieElement} key={index} style={{ height: "400px", width: "270px", margin: "10px" }}>
          <Link to={`/playerpage/${encodeURIComponent(item.title)}`} className="items-img">
            <img src={item.poster} alt="" style={{ height: "400px", width: "270px", margin: "10px" }} />
          </Link>
          <GridListTileBar className="items-title" title={item.title} subtitle={"Rate : " + item.rating} />
        </GridListTile>
      );
    } else {
      return (
        <GridListTile key={index} style={{ height: "400px", width: "270px", margin: "10px" }}>
          <Link to={`/playerpage/${encodeURIComponent(item.title)}`} className="items-img">
            <img src={item.poster} alt="" style={{ height: "400px", width: "270px", margin: "10px" }} />
          </Link>
          <GridListTileBar className="items-title" title={item.title} subtitle={"Rate : " + item.rating} />
        </GridListTile>
      );
    }
  });

  const genreList = genre.map((item, index) => {
    return (
      <Button
        key={index}
        onClick={() => {
          handleGenreClick(item.name);
        }}
      >
        {item.name}
      </Button>
    );
  });

  return (
    <div className="listMovie__body">
      <CssBaseline />
      <div className="listMovie__settings">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx("listMovie__settings-btn icon-btn", open && "listMovie__settings-btn--hide")}
        >
          <div className="filter-btn color-btn">
            <Tune style={{ height: 30, width: 30, margin: "0 5px 0 0", color: "#004d40" }} />
            <h6> Filter </h6>
          </div>
        </IconButton>

        <Drawer className="listMovie__drawer" variant="persistent" open={open}>
          <div className="listMovie__drawer-header">
            <Grid container direction="row" justify="space-between" alignItems="center">
              <h6> Filter :</h6>
              <IconButton onClick={handleDrawerClose} className="icon-btn">
                <Close />
              </IconButton>
            </Grid>
          </div>
          <Divider style={{ backgroundColor: "#4c4c4c" }} />
          <List className="listMovie__drawer-body">
            <Grow in={checked}>
              <div className="listMovie__category">
                <h5> Genre </h5>
                <Grid className="">{genreList}</Grid>
              </div>
            </Grow>
            <Grow in={checked} style={{ transformOrigin: "0 0 0" }} {...(checked ? { timeout: 1000 } : {})}>
              <div className="listMovie__sort">
                <h5> Sort by </h5>
                <Grid className="">
                  <Grid>
                    <Button>Horror</Button>
                    <Button>Horror</Button>
                  </Grid>
                  <Grid>
                    <Button>Horror</Button>
                    <Button>Horror</Button>
                  </Grid>
                  <Grid>
                    <Button>Horror</Button>
                    <Button>Horror</Button>
                  </Grid>
                </Grid>
              </div>
            </Grow>
            <Grow in={checked} style={{ transformOrigin: "0 0 0" }} {...(checked ? { timeout: 1500 } : {})}>
              <div className="listMovie__filter">
                <h5> Filter by </h5>
                <Grid>
                  <Grid className="listMovie__filter-grid">
                    Alphabetic : {String.fromCharCode(sliderValue.name)}
                    <Slider
                      value={sliderValue.name}
                      min={65}
                      max={90}
                      onChange={handleChangeSlider("name")}
                      // valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </Grid>
                  <Grid className="listMovie__filter-grid">
                    Years : {sliderValue.years[0]} - {sliderValue.years[1]}
                    <Slider
                      value={sliderValue.years}
                      onChange={handleChangeSlider("years")}
                      // valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </Grid>
                  <Grid className="listMovie__filter-grid">
                    Evaluation : {sliderValue.rate[0]} - {sliderValue.rate[1]}
                    <Slider value={sliderValue.rate} max={5} onChange={handleChangeSlider("rate")} valueLabelDisplay="auto" />
                  </Grid>
                </Grid>
              </div>
            </Grow>
          </List>
        </Drawer>
      </div>
      <div className={clsx("listMovie__items--before", open && "listMovie__items--after")}>
        {<GridList>{movieList}</GridList>}
        <GridList>{loadingDisplay ? <h1>Loading...</h1> : ""}</GridList>
      </div>
    </div>
  );
};

export default ListMovie;
