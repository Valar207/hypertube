import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../actions'
import React, { useState } from 'react';
import { Box, Grid, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8080";






const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    borderRadius: 50,
  },
}));

export const Login = () => {

  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const classes = useStyles();

  const SubmitLogin = (e) => {
    e.preventDefault();

    const test = 'hola que tal'
    axios.post('/login', { test })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <h1>Counter = {counter}</h1>
      <button onClick={() => dispatch(increment(1))}>+</button>
      <button onClick={() => dispatch(decrement(1))}>-</button>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => SubmitLogin(e)}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Create an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}