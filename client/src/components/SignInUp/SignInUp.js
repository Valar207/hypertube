import React, { useState } from "react";
import {
  TextField,
  Container,
  Tabs,
  Tab,
  Grid,
  Link,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./SignInUp.scss";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <Box p={3}>{children}</Box>}</div>;
}

export const SignInUp = (props) => {
  const [userSignUp, setUserSignUp] = useState({
    imgProfile: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [userSignIn, setUserSignIn] = useState({
    username: "",
    password: "",
  });

  const handleChangeSignUp = (e) => {
    setUserSignUp({
      ...userSignUp,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeSignIn = (e) => {
    setUserSignIn({
      ...userSignIn,
      [e.target.name]: e.target.value,
    });
  };
  const HandleSignIn = (e) => {
    e.preventDefault();
    axios.post("/signin", userSignIn);
  };
  const HandleSignUp = (e) => {
    e.preventDefault();
    axios.post("/signup", userSignUp).then((res) => {
      console.log(res);
    });
  };
  const handleClickShowPassword = (e) => {
    setUserSignUp({
      ...userSignUp,
      [e.currentTarget.name]: !userSignUp[e.currentTarget.name],
    });
  };
  const uploadPhoto = (e) => {
    setUserSignUp({
      ...userSignUp,
      imgProfile: URL.createObjectURL(e.target.files[0]),
    });
  };
  const [tabsValue, setTabsValue] = useState(0);
  const handleChangeSignUpTabs = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <Container className="homepage__body">
      <div id="background">
        <img src="img/homepage.jpg" alt="" />
      </div>
      <Tabs className="homepage__tabs " value={tabsValue} onChange={handleChangeSignUpTabs} centered>
        <Tab label="Sign up" className="font-size-20" />
        <Tab label="Sign in" className="font-size-20" />
      </Tabs>
      <TabPanel value={tabsValue} index={0}>
        <form onSubmit={(e) => HandleSignUp(e)}>
          <div className="homepage__profil-img">
            <img
              className="imgProfile"
              src={userSignUp.imgProfile === "" ? "/img/img-default.jpg" : userSignUp.imgProfile}
              alt=""
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="uploadImgProfile"
              multiple
              type="file"
              onChange={uploadPhoto}
            />
            <label htmlFor="uploadImgProfile">
              <Button component="span">
                <img src="/img/icons/add-circle.svg" className="uploadImgProfile-btn" alt="" />
              </Button>
            </label>
          </div>
          <Grid container spacing={3} className="homepage__form">
            <Grid item xs={6}>
              {" "}
              {/*firstname */}
              <TextField
                fullWidth
                name="firstname"
                onChange={handleChangeSignUp}
                value={userSignUp.firstname}
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              {/*lastName */}
              <TextField
                fullWidth
                name="lastname"
                onChange={handleChangeSignUp}
                value={userSignUp.lastname}
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              {/*UserName */}
              <TextField
                fullWidth
                name="username"
                onChange={handleChangeSignUp}
                value={userSignUp.UserName}
                label="User Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              {/*Email */}
              <TextField
                fullWidth
                name="email"
                onChange={handleChangeSignUp}
                value={userSignUp.email}
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              {/*Password */}
              <TextField
                fullWidth
                name="password"
                onChange={handleChangeSignUp}
                value={userSignUp.password}
                label="Password"
                variant="outlined"
                helperText="Must contain 8 characters, 1 letter, 1 number and 1 special character"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton name="showPassword" onClick={handleClickShowPassword} className="show-pwd">
                        {userSignUp.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={userSignUp.showPassword ? "text" : "password"}
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              {/*ConfirmPassword */}
              <TextField
                fullWidth
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChangeSignUp}
                value={userSignUp.ConfirmPassword}
                label="Confirm Password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        name="showConfirmPassword"
                        onClick={handleClickShowPassword}
                        className="show-pwd"
                      >
                        {userSignUp.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={userSignUp.showConfirmPassword ? "text" : "password"}
              />
            </Grid>
          </Grid>
          <Button className="homepage__btn font-size-20" type="submit">
            Sign Up
          </Button>
        </form>
      </TabPanel>

      <TabPanel value={tabsValue} index={1} className="signin__body">
        <form onSubmit={(e) => HandleSignIn(e)}>
          <Grid container spacing={3} className="homepage__form">
            <Grid item xs={12}>
              {" "}
              {/*UserName */}
              <TextField
                fullWidth
                name="username"
                onChange={handleChangeSignIn}
                value={userSignIn.username}
                label="User Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              {/*Password */}
              <TextField
                fullWidth
                name="password"
                onChange={handleChangeSignIn}
                value={userSignIn.password}
                label="Password"
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item>
              <Link href="#">Forgot password</Link>
            </Grid>
            <Button className="homepage__btn font-size-20" type="submit">
              Sign In
            </Button>
          </Grid>
          <div className="separator"> OR </div>
          <Grid container className="homepage__omniauth">
            <Grid item xs={6}>
              <IconButton>
                <img src="/img/icons/42-logo.svg" alt="42-logo" />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton>
                <img src="/img/icons/facebook-logo.svg" alt="facebook-logo" />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
    </Container>
  );
};

export default SignInUp;
