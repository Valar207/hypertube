import React from 'react'
import { AppBar, Toolbar, IconButton, Grid } from '@material-ui/core';
import './Header.scss'
import { ExitToApp, Movie } from '@material-ui/icons'

export const Header = () => {
    const logged = "true"
    return (
        <div className="header__body">
            { logged === "false" ? (
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton href="/" className="header__logo">
                            <img src="/img/hypertube-logo.svg" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            ) : (
                    <AppBar position="static" color="primary">
                        <Toolbar >
                            <IconButton href="/" className="header__logo">
                                <img src="/img/hypertube-logo.svg" alt="" />
                            </IconButton>
                            <Grid item xs />
                            <IconButton href="/listmovie" className="header__icon">
                                <Movie />
                            </IconButton>
                            <IconButton className="header__icon">
                                <ExitToApp />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                )
            }

        </div >

    );
}

export default Header