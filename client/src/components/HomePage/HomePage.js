import React from "react";
import { Grid, GridList, GridListTileBar, GridListTile } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import "./HomePage.scss";
import HorizontalScroll from "react-scroll-horizontal";
import { Link } from "react-router-dom";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

export const HomePage = () => {
  const gender = "horror";

  // const child = { width: `30em`, height: `100%` }
  // const parent = { width: `60em`, height: `200%` }

  return (
    <div className="homePage__body">
      <div className="homePage__section">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h2>
              Horror
              <Link to={`/ListMovie/${gender}`} className="homePage__section-link">
                see more <ChevronRight />
              </Link>
            </h2>
          </Grid>

          {/* <Teste /> */}
          <div className="homePage__section-items">
            <HorizontalScroll reverseScroll={true} style={{ position: "inherit" }}>
              <Grid item xs={12}>
                <GridList id="items" >
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link to="">
                      <img src="/img/joker.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/parasite.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/gladiator.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link to="">
                      <img src="/img/joker.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/parasite.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/gladiator.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link to="">
                      <img src="/img/joker.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/parasite.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/gladiator.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link to="">
                      <img src="/img/joker.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Le Joker" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/parasite.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Parasite" subtitle="1h30" />
                    </Link>
                  </GridListTile>
                  <GridListTile style={{ height: "300px", width: "200px", margin: "10px 5px" }}>
                    <Link>
                      <img src="/img/gladiator.jpg" alt="" className="items-img" />
                      <GridListTileBar className="items-title" title="Gladiator" subtitle="1h30" />
                    </Link>
                  </GridListTile>

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
