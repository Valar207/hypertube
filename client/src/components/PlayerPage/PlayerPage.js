import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Accordion, AccordionDetails, AccordionSummary, Container, Divider, Grid, TextField } from "@material-ui/core";
import { Comment, ExpandMore, Info, AccountCircle } from "@material-ui/icons";
import { fetchMovieDetailsYTS } from "../../service/yts";

import "./PlayerPage.scss";

export const PlayerPage = (props) => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({
    title: "",
    rating: 0,
    runtime: 0,
    medium_cover_image: "",
    cast: [],
    genres: [],
    description_full: "",
  });

  const fetchDetails = async (movie_id) => {
    const response = await fetchMovieDetailsYTS(movie_id);
    const movie = response.data;
    const { title, rating, runtime, medium_cover_image, cast, genres, description_full } = movie;
    setMovieDetails({ title, rating, runtime, medium_cover_image, cast, genres, description_full }); //runtime retour parfois 0
    console.log(movie);
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  return (
    <Container className="playerPage__body">
      <Grid container>
        <Grid className="playerPage__player"></Grid>
        <Grid container className="playerPage__header">
          <h5>titre</h5>
          <Grid item xs />
          <h5>note</h5>
          <h5>duree</h5>
        </Grid>
        <Grid className="playerPage__information">
          <Divider style={{ backgroundColor: "#6c6c6c" }} />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore style={{ color: "white" }} />}>
              <Info style={{ margin: "0 10px 0 0" }} />
              <h5> Informations :</h5>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  <img src="/img/joker.jpg" alt="" />
                </Grid>
                <Grid item xs={9}>
                  <Grid item xs={12}>
                    Distribution :
                  </Grid>
                  <Grid item xs={12}>
                    Genre :
                  </Grid>
                  <Grid item xs={12}>
                    Actor :
                  </Grid>
                  <Grid item xs={12}>
                    synopsis :
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Divider style={{ backgroundColor: "#6c6c6c" }} />
        </Grid>
        <Grid className="playerPage__comments">
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore style={{ color: "white" }} />}>
              <Comment style={{ margin: "0 10px 0 0" }} />
              <h5> Comments :</h5>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={2}>
                  <AccountCircle style={{ width: "75px", height: "75px" }} />
                </Grid>
                <Grid item xs={10} style={{ alignSelf: "center" }}>
                  <TextField
                    fullWidth
                    name=""
                    // onChange={ }
                    // value={ }
                    label="Write a comments"
                    variant="outlined"
                    rows="3"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerPage;
