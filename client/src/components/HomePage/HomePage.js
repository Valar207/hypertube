import React, { UseState } from 'react'
import { Grid, GridList, GridListTileBar, GridListTile, Link } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import './HomePage.scss'
import HorizontalScroll from 'react-scroll-horizontal'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

export const HomePage = () => {

    const onWheel = name => e => {
        const container = document.getElementById(`${name}`);
        const containerScrollPosition = document.getElementById(`${name}`).scrollLeft;
        container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY,
            behaviour: "smooth"
        });
    };

    // const child = { width: `30em`, height: `100%` }
    // const parent = { width: `60em`, height: `200%` }

    return (
        <div className="HomePage__body">
            <div className="HomePage__section">
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <h2>Horror
                            <Link href="#" className="HomePage__section-link">
                                see more <ChevronRight />
                            </Link>
                        </h2>
                    </Grid>

                    <div className="HomePage__section-items">
                        <HorizontalScroll reverseScroll={true} animValues={60}>
                            <Grid item xs={12}>
                                <GridList id="items" onWheel={onWheel('items')} className="HomePage__section-item" >
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                </GridList>
                            </Grid>
                        </HorizontalScroll>
                    </div>
                </Grid>
            </div>
            <div className="HomePage__section">
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <h2>Horror
                            <Link href="#" className="HomePage__section-link">
                                see more <ChevronRight />
                            </Link>
                        </h2>
                    </Grid>

                    <div className="HomePage__section-items">
                        <HorizontalScroll reverseScroll={true} animValues={60}>
                            <Grid item xs={12}>
                                <GridList id="items" onWheel={onWheel('items')} className="HomePage__section-item" >
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                </GridList>
                            </Grid>
                        </HorizontalScroll>
                    </div>
                </Grid>
            </div>
            <div className="HomePage__section">
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <h2>Horror
                            <Link href="#" className="HomePage__section-link">
                                see more <ChevronRight />
                            </Link>
                        </h2>
                    </Grid>

                    <div className="HomePage__section-items">
                        <HorizontalScroll reverseScroll={true} animValues={60}>
                            <Grid item xs={12}>
                                <GridList id="items" onWheel={onWheel('items')} className="HomePage__section-item" >
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/joker.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/parasite.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                                    </GridListTile>
                                    <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                                        <img src="/img/gladiator.jpg" alt="" className="items-img" />
                                        <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                                    </GridListTile>
                                </GridList>
                            </Grid>
                        </HorizontalScroll>
                    </div>
                </Grid>
            </div>
        </div >
    );
}
export default HomePage
