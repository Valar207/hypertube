import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { Comment, ExpandMore, Info, AccountCircle, Timer, StarRate, LocalMovies } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { fetchMovieDetailsYTS } from "../../service/yts";
import { fetchMovieDetails, postMovieDetails } from "../../service/movie";
import { AppContext } from "../../App";

import "./PlayerPage.scss";

const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: "#1de9b6",
    "&:hover": {
      backgroundColor: "#68f3d0",
    },
  },
}))(Button);

export const PlayerPage = (props) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const context = useContext(AppContext);
  const { username } = context.userInfos;

  const minToHour = (min) => {
    min = Number(min);
    var hour = Math.floor(min / 60);
    var minute = Math.floor(min - (hour * 3600) / 60);
    var displayHour = hour > 0 ? hour + "H" : "";
    var displayMinute = minute > 0 ? minute : "";
    return displayHour + displayMinute;
  };

  const handleCommentChange = (event) => {
    event.preventDefault();
    setCommentInput(event.target.value);
  };

  const fetchDetails = async (movie_id) => {
    const response = await fetchMovieDetailsYTS(movie_id);
    if (response === "error") return;
    const movie = response.data;
    const { title, rating, runtime, medium_cover_image, cast, genres, description_full } = movie.movie;
    setMovieDetails({ title, rating, runtime: minToHour(runtime), medium_cover_image, cast, genres, description_full }); //runtime retour parfois 0
  };

  const fetchComments = async (movie_id) => {
    const response = await fetchMovieDetails(movie_id);
    const comments = response.comments;
    setComments(comments);
  };

  const handleSendComment = async (event) => {
    event.preventDefault();
    if (commentInput === "") return;
    const newComments = [...comments, { user_login: username, content: commentInput }];
    const response = await postMovieDetails({
      id,
      comments: newComments,
    });
    if (response.status === "success") {
      setCommentInput("");
      setComments(newComments);
    }
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  useEffect(() => {
    fetchComments(id);
  }, []);

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
                <Grid item xs={9} style={{ alignSelf: "center" }}>
                  <TextField
                    fullWidth
                    name=""
                    onChange={handleCommentChange}
                    value={commentInput}
                    label="Write a comments"
                    variant="outlined"
                    rows="3"
                  />
                </Grid>
                <Grid item xs={1} style={{ alignSelf: "center" }}>
                  <GreenButton variant="contained" color="primary" onClick={handleSendComment}>
                    Envoyer
                  </GreenButton>
                </Grid>
              </Grid>
              <Grid>
                {comments.map((commentData) => {
                  return (
                    <ul>
                      <li>
                        <h1>{commentData.user_login}</h1>
                        <p>{commentData.content}</p>
                      </li>
                    </ul>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerPage;
