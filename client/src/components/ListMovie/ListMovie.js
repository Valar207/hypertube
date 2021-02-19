import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import clsx from "clsx";
import textToImage from "text-to-image";
import "../../assets/Style.scss";
import { Close, Tune } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import {
  Button,
  Fab,
  Grow,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Slider,
  Drawer,
  List,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { fetchGenreTMDB } from "../../service/tmdb";
import { fetchMoviesYTS, fetchMovieSearchYTS } from "../../service/yts";
import { AppContext } from "../../App";

import { distinctObjectArray } from "../../utils/arrayFunctions";

import "./ListMovie.scss";
import "../../assets/Style.scss";

export const ListMovie = () => {
  const location = useLocation();

  const [genreFromHomePage, setGenreFromHomePage] = useState(location.state?.genre);
  const [search, setSearch] = useState("");

  const { mobileDevice, desktopDevice } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState({
    name: 65,
    years: [1970, new Date().getFullYear()],
    rate: [0, 10],
  });
  const [checked, setChecked] = React.useState(false);
  const [genreList, setGenreList] = useState([]);
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingDisplay, setLoadingDisplay] = useState(true);

  const [movies, setMovies] = useState([]);

  const filterMovie = (movies) => {
    const filterMovie = [];
    movies?.map((m) => {
      if (
        m.rating <= sliderValue.rate[1] &&
        m.rating >= sliderValue.rate[0] &&
        m.year <= sliderValue.years[1] &&
        m.year >= sliderValue.years[0]
      ) {
        filterMovie.push(m);
      }
    });
    return filterMovie;
  };

  const fetchAPI = async () => {
    const newMovies = await fetchMoviesYTS(genreFromHomePage ? genreFromHomePage : genre, pageNumber, sort);
    if (newMovies) {
      const tableau = [...movies, ...newMovies];
      const result = filterMovie(distinctObjectArray(tableau));

      setMovies(result);
      setLoading(false);
    } else {
      setLoadingDisplay(false);
    }
    setGenreList(await fetchGenreTMDB());
  };

  const searchAPI = async () => {
    let newMovies = await fetchMovieSearchYTS(search, pageNumber);

    console.log(newMovies);

    if (newMovies) {
      const tableau = [...movies, ...newMovies];
      const result = filterMovie(distinctObjectArray(tableau));
      setMovies(result);
      setLoading(false);
    } else {
      setLoadingDisplay(false);
    }
    setGenreList(await fetchGenreTMDB());
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
    [loading],
  );

  useEffect(() => {
    const searchEffect = async () => {
      try {
        setLoading(true);
        setGenreList(await fetchGenreTMDB());
        setMovies([]);
        setPageNumber(1);

        if (search) {
          await searchAPI();
        } else {
          await fetchAPI();
        }
      } catch (e) {}
    };
    searchEffect();
  }, [search]);

  useEffect(() => {
    const pageNbEffect = async () => {
      if (pageNumber === 1) {
        setMovies([]);
      }
      if (search) {
        await searchAPI();
      } else {
        await fetchAPI();
      }
    };
    pageNbEffect();
  }, [pageNumber]);

  useEffect(() => {
    let isCancelled = false;

    const SecondEffect = async () => {
      try {
        if (!isCancelled) {
          setLoading(true);
          setMovies([]);
          setPageNumber(1);
          setGenreList(await fetchGenreTMDB());

          if (search) {
            await searchAPI();
          } else {
            await fetchAPI();
          }
        }
      } catch (e) {
        if (!isCancelled) {
          throw e;
        }
      }
    };

    SecondEffect();
    return () => {
      isCancelled = true;
    };
  }, [sliderValue]);

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
    setGenre(genre);
    setMovies(await fetchMoviesYTS(genre, pageNumber, sort));
    setSearch("");
    setGenreFromHomePage("");
  };

  const handleSortMovie = async (e) => {
    setSort(e.currentTarget.value);
    setPageNumber(1);
    setMovies([]);
    if (search) {
      setMovies(filterMovie(await fetchMovieSearchYTS(search, pageNumber, e.currentTarget.value)));
    } else {
      setMovies(
        filterMovie(
          await fetchMoviesYTS(genreFromHomePage ? genreFromHomePage : genre, pageNumber, e.currentTarget.value),
        ),
      );
    }
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

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };
  const handleClickShowClearSearch = () => {
    setSearch("");
  };

  const movieList = movies?.map((item, index) => {
    if (movies.length === index + 1) {
      return (
        <GridListTile
          ref={lastMovieElement}
          key={index}
          style={
            desktopDevice
              ? { height: "300px", width: "200px", margin: "5px" }
              : { height: "280px", width: "190px", margin: "2px" }
          }
        >
          <Link to={`/playerpage/${encodeURIComponent(item.id)}`} className="items-img">
            <img
              src={item.poster}
              alt={item.title}
              onError={(event) => handleImageError(event, item.title)}
              style={{ height: "300px", width: "200px" }}
            />
          </Link>
          <GridListTileBar
            className="items-title"
            title={item.title}
            subtitle={`Rate: ${item.rating}` + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + `Year: ${item.year} `}
          />
        </GridListTile>
      );
    } else {
      return (
        <GridListTile
          key={index}
          style={
            mobileDevice
              ? { height: "240px", width: "155px", margin: "2px" }
              : { height: "300px", width: "200px", margin: "5px" }
          }
        >
          <Link to={`/playerpage/${encodeURIComponent(item.id)}`} className="items-img">
            <img
              src={item.poster}
              alt={item.title}
              onError={(event) => handleImageError(event, item.title)}
              style={{ height: "100%", width: "100%" }}
            />
          </Link>
          <GridListTileBar
            className="items-title"
            title={item.title}
            subtitle={`Rate: ${item.rating}` + "\xa0\xa0\xa0\xa0\xa0" + `Year: ${item.year} `}
          />
        </GridListTile>
      );
    }
  });

  const genreListFunc = genreList.map((item, index) => {
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
      <div className="listMovie__settings">
        <Fab
          color="inherit"
          disableRipple
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx("listMovie__settings-btn icon-btn", open && "listMovie__settings-btn--hide")}
        >
          <Tune
            style={{
              height: 30,
              width: 30,
              margin: "0 5px 0 0",
              color: "#004d40",
            }}
          />
          {desktopDevice && <h6 style={{ color: "#004d40" }}> Filter </h6>}
        </Fab>
      </div>
      <div className={clsx("listMovie__items--before", open && "listMovie__items--after")}>
        {<GridList>{movieList}</GridList>}
        <GridList style={{ justifyContent: "center" }}>
          {loadingDisplay ? <img src="/img/loading.gif" style={{ height: "200px", width: "200px" }} /> : ""}
        </GridList>
      </div>

      <Drawer className="listMovie__drawer" anchor={desktopDevice ? "left" : "bottom"} variant="persistent" open={open}>
        <div className="listMovie__drawer-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <h6> Filter :</h6>
            <IconButton onClick={handleDrawerClose} className="icon-btn" style={{ left: "16px" }}>
              <Close />
            </IconButton>
          </Grid>
        </div>
        <Divider style={{ backgroundColor: "#4c4c4c", marginLeft: "20px" }} />
        <TextField
          className="header__search-bar custom__form"
          name="Search..."
          onChange={handleSearch}
          variant="outlined"
          placeholder="Search..."
          value={search}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                {search ? (
                  <IconButton onClick={handleClickShowClearSearch} className="icon-btn">
                    <Close />
                  </IconButton>
                ) : (
                  ""
                )}
              </InputAdornment>
            ),
          }}
        />
        <Divider style={{ backgroundColor: "#4c4c4c", marginLeft: "20px" }} />

        <List className="listMovie__drawer-body">
          <Grow in={checked}>
            <div className="listMovie__category">
              <h6> Genre </h6>
              <Grid style={{ margin: "15px 0 0 0" }}>{genreListFunc}</Grid>
            </div>
          </Grow>
          <Grow in={checked} style={{ transformOrigin: "0 0 0" }} {...(checked ? { timeout: 1000 } : {})}>
            <div className="listMovie__sort">
              <h6> Sort by </h6>
              <Grid style={{ margin: "15px 0 0 0" }}>
                <Grid>
                  <Button value="year" onClick={handleSortMovie}>
                    Year
                  </Button>
                  <Button value="title" onClick={handleSortMovie}>
                    Title
                  </Button>
                  <Button value="rating" onClick={handleSortMovie}>
                    Rating
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grow>
          <Grow in={checked} style={{ transformOrigin: "0 0 0" }} {...(checked ? { timeout: 1500 } : {})}>
            <div className="listMovie__filter">
              <h6> Filter by </h6>
              <Grid>
                <Grid className="listMovie__filter-grid">
                  Years : {sliderValue.years[0]} - {sliderValue.years[1]}
                  <Slider
                    value={sliderValue.years}
                    onChange={handleChangeSlider("years")}
                    aria-labelledby="range-slider"
                    min={1970}
                    max={new Date().getFullYear()}
                  />
                </Grid>
                <Grid className="listMovie__filter-grid">
                  Ratings : {sliderValue.rate[0]} - {sliderValue.rate[1]}
                  <Slider
                    value={sliderValue.rate}
                    max={10}
                    onChange={handleChangeSlider("rate")}
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </div>
          </Grow>
        </List>
      </Drawer>
    </div>
  );
};

export default ListMovie;
