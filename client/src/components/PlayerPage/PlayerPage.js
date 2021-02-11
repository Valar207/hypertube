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
import { fetchMovieDetails, postMovieDetails, downloadMovieInServer } from "../../service/movie";
import { AppContext } from "../../App";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";

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
  const [videoReady, setVideoReady] = useState(false);

  const context = useContext(AppContext);
  const { username, imgProfile } = context.userInfos;
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

    const { title, rating, runtime, medium_cover_image, cast, genres, description_full, torrents, id } = movie.movie;
    setMovieDetails({
      title,
      rating,
      runtime: minToHour(runtime),
      medium_cover_image,
      cast,
      genres,
      description_full,
      torrents,
      id,
    }); //runtime retour parfois 0

    //download movie in server
  };

  const fetchComments = async (movie_id) => {
    const response = await fetchMovieDetails(movie_id);
    const comments = response?.comments;
    if (comments) setComments(comments);
  };

  const handleSendComment = async (event) => {
    event.preventDefault();
    if (commentInput === "") return;
    const newComments = [...comments, { user_login: username, content: commentInput, user_photo: imgProfile }];
    const response = await postMovieDetails({
      id,
      comments: newComments,
    });
    if (response.status === "success") {
      setCommentInput("");
      setComments(newComments);
    }
    console.log(comments);
  };

  const handleDownloadMovie = async (torrent) => {
    const response = await downloadMovieInServer(movieDetails, torrent);
    if (response?.status === "success") setVideoReady(true);
  };

  useEffect(() => {
    if (movieDetails.length !== 0) {
      const torrents = movieDetails.torrents;
      const torrent = torrents.filter((t) => t.quality === "720p");
      handleDownloadMovie(torrent[0]);
    }
  }, [movieDetails]);

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  useEffect(() => {
    fetchComments(id);
    // axios.get("http://localhost:5000/api/v1/movie/streamMovie/25946");
  }, []);

  return (
    <Container className="playerPage__body">
      <Grid container>
        <Grid className="playerPage__player">
          {videoReady ? (
            <VideoPlayer
              src={`http://localhost:5000/api/v1/movie/streamMovie/${id}`}
              sub={`http://localhost:5000/api/v1/movie/streamSubtitles/${id}`}
            />
          ) : null}
        </Grid>
        <Grid container className="playerPage__header" alignItems="center">
          <LocalMovies />
          <h5>{movieDetails.title}</h5>
          <Grid item xs />
          <p style={{ margin: "0 8px 8px 0" }}>Video quality :</p>
          {movieDetails.torrents?.map((torrent) => (
            <>
              <Button className="quality-btn" onClick={() => handleDownloadMovie(torrent)}>
                {torrent.quality}
              </Button>
              {/* <p>{torrent.size}</p> */}
            </>
          ))}
          <StarRate style={{ marginLeft: "25px" }} />
          <h5>{movieDetails.rating}</h5>
          <Timer style={{ marginLeft: "25px" }} />
          <h5>{movieDetails.runtime}</h5>
        </Grid>

        <Grid className="playerPage__information">
          <Divider style={{ backgroundColor: "#6c6c6c" }} />
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore style={{ color: "white" }} />}>
              <Info />
              <h5> Informations :</h5>
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
              <Comment />
              <h5> Comments :</h5>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid className="send__comment" container xs={12} spacing={2}>
                  <Grid item>
                    <img src={imgProfile} style={{ width: "75px", height: "75px", borderRadius: "50px" }} />
                  </Grid>
                  <Grid item xs={8} style={{ alignSelf: "center" }}>
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
                <Grid className="comments__space" container xs={12} direction="column-reverse">
                  {comments.map((commentData) => {
                    return (
                      <Grid className="comments" container spacing={3} wrap="nowrap">
                        <Grid item>
                          <img className="imgProfile" src={commentData.user_photo} />
                        </Grid>
                        <Grid item>
                          <h5>{commentData.user_login}</h5>
                          <p>{commentData.content}</p>
                        </Grid>
                      </Grid>
                    );
                  })}
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
