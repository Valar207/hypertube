import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Grid, Popover } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./Header.scss";
import { ExitToApp, Movie, AccountCircle } from "@material-ui/icons";
import { Profil } from "../Profil/Profil";
export const Header = () => {
  const logged = "true";
  const [popover, setPopover] = useState(false);

  const openPopover = (e) => {
    setPopover(e.currentTarget);
  };
  const closePopover = () => {
    setPopover(false);
  };

  return (
    <div className="header__body">
      {logged === "false" ? (
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
            <IconButton className="header__icon">
              <Link to="/listmovie" className="header__icon">
                <Movie />
                <Popover
                  className="header_popover-profil"
                  open={popover}
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
              </Link>
            </IconButton>
            <IconButton onClick={openPopover} className="header__icon">
              <AccountCircle />
            </IconButton>
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
