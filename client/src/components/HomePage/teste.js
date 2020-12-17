import React from "react";
import HorizontalScroll from "react-scroll-horizontal";
import { Grid, GridList, GridListTileBar, GridListTile, Link } from "@material-ui/core";

export const Teste = () => {
  return (
    <div className="HomePage__section-items">
      <HorizontalScroll reverseScroll={true} animValues={60}>
        <Grid item xs={12}>
          <GridList id="items" className="HomePage__section-item">
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
  );
};
export default Teste;
