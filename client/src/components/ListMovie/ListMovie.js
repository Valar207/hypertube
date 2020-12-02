import React, { useState } from 'react';
import clsx from 'clsx';
import { Close, Tune } from '@material-ui/icons';
import { Button, Grow, Fab, Grid, GridList, GridListTile, GridListTileBar, Slider, ToggleButton, ToggleButtonGroup } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import './ListMovie.scss'
import '../../assets/Style.scss'


export const ListMovie = () => {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false)
    const [sliderValue, setSliderValue] = useState({
        name: 65,
        years: [0, 100],
        rate: ([0, 5]),
    });
    const [checked, setChecked] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
        setChecked(true);

    };
    const handleDrawerClose = () => {
        setOpen(false);
        setChecked(false);
    };
    const handleChangeSlider = name => (e, newValue) => {
        // if (name === 'name')
        //     newValue = String.fromCharCode(sliderValue.name)
        setSliderValue({
            ...sliderValue,
            [name]: newValue
        })
        // console.log(sliderValue);
    }

    return (
        <div className="list-movie__body">
            <CssBaseline />
            <div className="list-movie__settings">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx("list-movie__settings-btn icon-btn", open && "list-movie__settings-btn--hide")}
                >
                    <div className="filter-btn color-btn" >
                        <Tune style={{ height: 30, width: 30, margin: "0 5px 0 0" }} />
                        <h6> Filter </h6>
                    </div>
                </IconButton>

                <Drawer
                    className="list-movie__drawer"
                    variant="persistent"
                    open={open}
                >

                    <div className="list-movie__drawer-header">
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <h6> Filter :</h6>
                            <IconButton onClick={handleDrawerClose} className="icon-btn">
                                <Close />
                            </IconButton>
                        </Grid>
                    </div>
                    <Divider style={{ backgroundColor: "#4c4c4c" }} />
                    <List className="list-movie__drawer-body">
                        <Grow in={checked}>
                            <div className="list-movie__category">
                                <h5> Genre </h5>
                                <Grid className="" >
                                    <Grid  >
                                        <Button>
                                            Horror
                                </Button>
                                        <Button>
                                            Horror
                                </Button>
                                    </Grid>
                                    <Grid   >
                                        <Button>
                                            Horror
                                </Button>
                                        <Button>
                                            Horror
                                </Button>
                                    </Grid>
                                    <Grid  >
                                        <Button >
                                            Horror
                                </Button>
                                        <Button>
                                            Horror
                                </Button>
                                        <Button>
                                            Horror
                                </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grow>
                        <Grow in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1000 } : {})}
                        >
                            <div className="list-movie__sort">
                                <h5> Sort by </h5>
                                <Grid className="" >
                                    <Grid  >
                                        <Button>
                                            Horror
                                </Button>
                                        <Button>
                                            Horror
                                </Button>
                                    </Grid>
                                    <Grid   >
                                        <Button>
                                            Horror
                                </Button>
                                        <Button>
                                            Horror
                                </Button>
                                    </Grid>
                                    <Grid  >
                                        <Button>
                                            Horror
                                </Button>
                                        <Button>
                                            Horror
                                </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grow>
                        <Grow in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1500 } : {})}
                        >
                            <div className="list-movie__filter">
                                <h5> Filter by </h5>
                                <Grid  >
                                    <Grid className="list-movie__filter-grid" >
                                        Alphabetic : {String.fromCharCode(sliderValue.name)}
                                        <Slider
                                            value={sliderValue.name}
                                            min={65}
                                            max={90}
                                            onChange={handleChangeSlider('name')}
                                            // valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                        />
                                    </Grid>
                                    <Grid className="list-movie__filter-grid">
                                        Years : {sliderValue.years[0]} - {sliderValue.years[1]}
                                        <Slider
                                            value={sliderValue.years}
                                            onChange={handleChangeSlider('years')}
                                            // valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                        />
                                    </Grid>
                                    <Grid className="list-movie__filter-grid">
                                        Evaluation : {sliderValue.rate[0]} - {sliderValue.rate[1]}
                                        <Slider
                                            value={sliderValue.rate}
                                            max={5}
                                            onChange={handleChangeSlider('rate')}
                                            valueLabelDisplay="auto"
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grow>

                    </List>
                </Drawer>
            </div>
            <div className={clsx("list-movie__items--before", open && "list-movie__items--after")}>
                <GridList >
                    <GridListTile style={{ height: "400px", width: "270px", margin: "10px" }}>
                        <img src="/img/joker.jpg" alt="" className="items-img" />
                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                    </GridListTile>
                    <GridListTile style={{ height: "400px", width: "270px", margin: "10px" }}>
                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                    </GridListTile>
                    <GridListTile style={{ height: "400px", width: "270px", margin: "10px" }}>
                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                    </GridListTile>
                </GridList>
            </div>
        </div >
    );
}

export default ListMovie