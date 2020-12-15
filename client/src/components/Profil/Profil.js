import React from "react";
import { Container, Grid, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import "./Profil.scss";

export const Profil = () => {
  return (
    <Container className="Profil__body">
      <Grid item xs={12}>
        <IconButton href="" className="profil__settings">
          <Settings />
        </IconButton>
      </Grid>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <img className="imgProfile" src="/img/img-default.jpg" alt="" />
        </Grid>
        <Grid container className="profil__grid">
          <Grid item xs={12}>
            VasyMolo
          </Grid>
        </Grid>
        <Grid container className="profil__grid">
          <Grid item xs={12}>
            France
          </Grid>
          {/* <Grid items xs={2}>
                        <IconButton href='' className="profil__settings">
                            <Settings />
                        </IconButton>
                    </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
};
export default Profil;
