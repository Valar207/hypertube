import React from "react";
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Header.scss";
import { ExitToApp, Movie } from "@material-ui/icons";

export const Header = () => {
  const logged = "true";
  return (
    <div className="header__body">
      {logged === "false" ? (
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Link to="/">
              <IconButton className="header__logo">
                <img src="/img/hypertube-logo.svg" />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static" color="primary">
          <Toolbar>
            <Link to="/">
              <IconButton className="header__logo">
                <img src="/img/hypertube-logo.svg" alt="" />
              </IconButton>
            </Link>
            <Grid item xs />
            <Link to="/listmovie">
              <IconButton className="header__icon">
                <Movie />
              </IconButton>
            </Link>
            <IconButton className="header__icon">
              <ExitToApp />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Header;
