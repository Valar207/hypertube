import React, { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Grid, Popover, TextField, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../assets/Style.scss";
import "./Header.scss";
import { ExitToApp, Movie, AccountCircle, Close } from "@material-ui/icons";
import { Profil } from "../Profil/Profil";
import { AppContext } from "../../App";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { fetchMovieSearch } from "../../service/tmdb";

export const Header = () => {
  const { logged, setLogged, search, setSearch } = useContext(AppContext);
  const [popover, setPopover] = useState(false);
  const history = useHistory();

  const openPopover = (e) => {
    setPopover(e.currentTarget);
  };
  const closePopover = () => {
    setPopover(false);
  };
  const handleLogout = async () => {
    const response = await axios.get("/auth/logout");
    const result = response.data;
    if (result.status === "success") setLogged(false);
    history.push("/");
  };
  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };
  const handleClickShowClearSearch = () => {
    setSearch("")
  }

  useEffect(() => {
    if (search) {
      history.push("/listmovie");
    }
  }, [search]);

  return (
    <div className="header__body">
      {logged === false ? (
        <AppBar position="fixed" color="transparent">
          <Toolbar>
            <Link to="/" className="header__logo">
              <img src="/img/hypertube-logo.svg" alt="" />
            </Link>
          </Toolbar>
        </AppBar>
      ) : (
          <AppBar position="fixed" color="primary">
            <Toolbar>

              <Link to="/HomePage" className="header__logo">
                <img src="/img/hypertube-logo.svg" alt="" />
              </Link>
              <Grid item xs />
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
                      {search ?
                        <IconButton
                          onClick={handleClickShowClearSearch}
                          className="icon-btn"
                        >
                          <Close />
                        </IconButton> : ""}
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton className="header__icon">
                <Link to="/listmovie" className="header__icon">
                  <Movie />
                </Link>
              </IconButton>
              <IconButton onClick={openPopover} className="header__icon">
                <AccountCircle />
              </IconButton>
              <Popover
                className="header_popover-profil"
                open={Boolean(popover)}
                anchorEl={popover}
                onClose={closePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Profil />
              </Popover>
              <IconButton onClick={handleLogout} className="header__icon">
                <ExitToApp />
              </IconButton>
            </Toolbar>
          </AppBar>
        )
      }
    </div >
  );
};

export default Header;
