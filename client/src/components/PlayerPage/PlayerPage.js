import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Accordion, AccordionDetails, AccordionSummary, Container, Divider, Grid, TextField } from "@material-ui/core";
import { Comment, ExpandMore, Info, AccountCircle, Timer, StarRate, LocalMovies } from "@material-ui/icons";
import { fetchMovieDetailsYTS } from "../../service/yts";

import "./PlayerPage.scss";

export const PlayerPage = (props) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);

  const minToHour = (min) => {
    min = Number(min);
    var hour = Math.floor(min / 60);
    var minute = Math.floor(min - (hour * 3600) / 60);
    var displayHour = hour > 0 ? hour + "H" : "";
    var displayMinute = minute > 0 ? minute : "";
    return displayHour + displayMinute;
  };
  const fetchDetails = async (movie_id) => {
    const response = await fetchMovieDetailsYTS(movie_id);
    const movie = response.data;
    console.log(response.data);
    const { title, rating, runtime, medium_cover_image, cast, genres, description_full } = movie.movie;
    setMovieDetails({ title, rating, runtime: minToHour(runtime), medium_cover_image, cast, genres, description_full }); //runtime retour parfois 0
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);
  console.log(movieDetails);
  return (
    <Container className="playerPage__body">
      <Grid container>
        <Grid className="playerPage__player"></Grid>
        <Grid container className="playerPage__header" alignItems="center">
          <LocalMovies />
          <h3>{movieDetails.title}</h3>
          <Grid item xs />
          <StarRate />
          <h3>{movieDetails.rating}</h3>
          <Timer style={{ marginLeft: "25px" }} />
          <h3>{movieDetails.runtime}</h3>
        </Grid>

        <Grid className="playerPage__information">
          <Divider style={{ backgroundColor: "#6c6c6c" }} />
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore style={{ color: "white" }} />}>
              <Info style={{ margin: "4px 5px 0 0" }} />
              <h3> Informations :</h3>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={3}>
                  <img src={movieDetails.medium_cover_image} alt="" />
                </Grid>
                <Grid item xs={9} direction="row">
                  <Grid item xs={12}>
                    <h5>Title :</h5>
                    <p>{movieDetails.title}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <h5>Genre :</h5>
                    <p>
                      {movieDetails.genres?.map((genre) => {
                        return " " + genre + ", ";
                      })}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <h5>Cast :</h5>
                    <p>
                      {movieDetails.cast?.map((cast) => {
                        return " " + cast.name + ", ";
                      })}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <h5>Synopsis :</h5>
                    <p>{movieDetails.description_full}</p>
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
              <Comment style={{ margin: "4px 5px 0 0" }} />
              <h3> Comments :</h3>
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
