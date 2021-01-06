import React, { useState, useContext } from "react";
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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./SignInUp.scss";
import axios from "axios";
import SimpleSnackbar from "./SnackBar";
import { AppContext } from "../../App";


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
    showSignUpPassword: false,
    showConfirmSignUpPassword: false,
  });

  const [userSignIn, setUserSignIn] = useState({
    username: "",
    password: "",
    showSigninPassword: false,
  });

  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    status: "",
  });
  const [errors, setErrors] = useState();

  const {logged, setLogged} = useContext(AppContext);

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
  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await axios.post("user/signin", userSignIn);
    const result = response.data;
    if (result.status === "success")
      setLogged(true);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post("user/signup", userSignUp).then((res) => {
      console.log(res);

      if (res.data.errors) {
        var errors = res.data.errors;
        var mapped = errors.map((item) => ({ [item.param]: item.msg }));
        var newObj = Object.assign({}, ...mapped);
        setErrors(newObj);
      } else {
        setErrors("");
        setAlert({
          open: true,
          message: "An email was sent to you",
          status: "success",
        });
      }
    });
  };
  const handleClickShowSignUpPassword = (e) => {
    setUserSignUp({
      ...userSignUp,
      [e.currentTarget.name]: !userSignUp[e.currentTarget.name],
    });
  };
  const handleClickShowSignInPassword = (e) => {
    setUserSignIn({
      ...userSignIn,
      [e.currentTarget.name]: !userSignIn[e.currentTarget.name],
    });
  };
  const uploadPhoto = (e) => {
    setUserSignUp({
      ...userSignUp,
      imgProfile: URL.createObjectURL(e.target.files[0]),
    });
  };
  const [tabsValue, setTabsValue] = useState(0);
  const handleChangeTabs = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <Container className="homepage__body">
      <div id="background">
        <img src="img/homepage.jpg" alt="" />
      </div>
      <Tabs className="homepage__tabs " value={tabsValue} onChange={handleChangeTabs} centered>
        <Tab label="Sign up" className="font-size-20" />
        <Tab label="Sign in" className="font-size-20" />
      </Tabs>
      <TabPanel value={tabsValue} index={0}>
        <form onSubmit={handleSignUp}>
          <div className="homepage__profil-img">
            <img
              className="imgProfile"
              src={userSignUp.imgProfile === "" ? "/img/img-default.jpg" : userSignUp.imgProfile}
              alt="Image profil"
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
            <p style={{ color: "red", fontSize: "12px", margin: "-20px" }}>
              {errors?.imgProfile ? errors?.imgProfile : ""}
            </p>
          </div>
          <Grid container spacing={5} className="homepage__form">
            <Grid item xs={6}>
              {/*firstname */}
              <TextField
                fullWidth
                name="firstname"
                onChange={handleChangeSignUp}
                value={userSignUp.firstname || ""}
                label={errors?.firstname ? "Errors" : "First name"}
                helperText={errors?.firstname ? errors?.firstname : ""}
                variant="outlined"
                className={errors?.firstname ? "errors" : ""}
              />
            </Grid>
            <Grid item xs={6}>
              {/*LastName */}
              <TextField
                fullWidth
                name="lastname"
                onChange={handleChangeSignUp}
                value={userSignUp.lastname || ""}
                label={errors?.lastname ? "Errors" : "Last name"}
                helperText={errors?.lastname ? errors?.lastname : ""}
                variant="outlined"
                className={errors?.lastname ? "errors" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              {/*username */}
              <TextField
                fullWidth
                name="username"
                onChange={handleChangeSignUp}
                value={userSignUp.username || ""}
                label={errors?.username ? "Errors" : "User name"}
                helperText={errors?.username ? errors?.username : ""}
                variant="outlined"
                className={errors?.username ? "errors" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              {/*Email */}
              <TextField
                fullWidth
                name="email"
                onChange={handleChangeSignUp}
                value={userSignUp.email || ""}
                label={errors?.email ? "Errors" : "Adress email"}
                helperText={errors?.email ? errors?.email : ""}
                variant="outlined"
                className={errors?.email ? "errors" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              {/*Password */}
              <TextField
                fullWidth
                name="password"
                onChange={handleChangeSignUp}
                value={userSignUp.password || ""}
                label={errors?.password ? "Errors" : "Password"}
                variant="outlined"
                helperText="Must contain 8 characters, 1 letter, 1 number and 1 special character"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        name="showSignUpPassword"
                        onClick={handleClickShowSignUpPassword}
                        className="show-pwd"
                      >
                        {userSignUp.showSignUpPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={userSignUp.showSignUpPassword ? "text" : "password"}
                className={errors?.password ? "errors" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              {/*ConfirmPassword */}
              <TextField
                fullWidth
                name="confirmPassword"
                onChange={handleChangeSignUp}
                value={userSignUp.confirmPassword || ""}
                label={errors?.confirmPassword ? "Errors" : "Confirm Password"}
                helperText={errors?.confirmPassword ? errors?.confirmPassword : ""}
                variant="outlined"
                className={errors?.confirmPassword ? "errors" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        name="showConfirmPassword"
                        onClick={handleClickShowSignUpPassword}
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
        <form onSubmit={handleSignIn}>
          <div className="homepage__profil-img">
            <img className="imgProfile" src="/img/img-default.jpg" alt="" />
          </div>

          <Grid container spacing={5} className="homepage__form">
            <Grid item xs={12}>
              {" "}
              {/*username */}
              <TextField
                fullWidth
                name="username"
                onChange={handleChangeSignIn}
                value={userSignIn.username || ""}
                label="User name"
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
                value={userSignIn.password || ""}
                label="Password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        name="showSigninPassword"
                        onClick={handleClickShowSignInPassword}
                        className="show-pwd"
                      >
                        {userSignIn.showSignInPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={userSignIn.showSigninPassword ? "text" : "password"}
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
                <img src="/img/icons/googleplus-logo.svg" alt="googleplus-logo" />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </TabPanel>

      {alert.open && <SimpleSnackbar message={alert.message} />}
    </Container>
  );
};

export default SignInUp;
