import React, { useState } from 'react';
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
    Typography
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './SignInUp.scss'

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div    >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}
export const SignInUp = (props) => {
    const [user, setUser] = useState({
        ImgProfile: '',
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        showSigninPassword: false,
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const HandleSignIn = () => {

    }
    const HandleSignUp = () => {

    }
    const handleClickShowPassword = (e) => {
        setUser({
            ...user,
            [e.currentTarget.name]: !user[e.currentTarget.name]
        });
    }
    const uploadPhoto = (e) => {
        setUser({
            ...user,
            ImgProfile: URL.createObjectURL(e.target.files[0])
        });
    }
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
            </Tabs >
            <TabPanel value={tabsValue} index={0}>
                <form onSubmit={HandleSignIn}>
                    <div className="homepage__profil-img">
                        <img
                            className="imgProfile"
                            src={user.ImgProfile === ""
                                ? "/img/img-default.jpg"
                                : user.ImgProfile}
                            alt=""
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="uploadImgProfile"
                            multiple
                            type="file"
                            onChange={uploadPhoto}
                        />
                        <label htmlFor="uploadImgProfile" >
                            <Button component="span">
                                <img src="/img/icons/add-circle.svg" className="uploadImgProfile-btn" alt="" />
                            </Button>
                        </label>
                    </div>
                    <Grid container spacing={3} className="homepage__form">
                        <Grid item xs={6}> {/*firstname */}
                            <TextField
                                fullWidth
                                name="FirstName"
                                onChange={handleChange}
                                value={user.FirstName}
                                label="first name"
                                variant="outlined"
                                required />
                        </Grid>
                        <Grid item xs={6}> {/*LastName */}
                            <TextField
                                fullWidth
                                name="LastName"
                                onChange={handleChange}
                                value={user.LastName}
                                label="Last name"
                                variant="outlined"
                                required />
                        </Grid>
                        <Grid item xs={12}> {/*UserName */}
                            <TextField
                                fullWidth
                                name="UserName"
                                onChange={handleChange}
                                value={user.UserName}
                                label="User name"
                                variant="outlined"
                                required />
                        </Grid>
                        <Grid item xs={12}> {/*Email */}
                            <TextField
                                fullWidth
                                name="Email"
                                onChange={handleChange}
                                value={user.Email}
                                label="Adress email"
                                variant="outlined"
                                required />
                        </Grid>
                        <Grid item xs={12}> {/*Password */}
                            <TextField
                                fullWidth
                                name="Password"
                                onChange={handleChange}
                                value={user.Password}
                                label="Password"
                                variant="outlined"
                                helperText="Must contain 8 characters, 1 letter, 1 number and 1 special character"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment >
                                            <IconButton name="showPassword" onClick={handleClickShowPassword} className="show-pwd" >
                                                {user.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                type={user.showPassword ? "text" : "password"}
                                required />

                        </Grid>
                        <Grid item xs={12}> {/*ConfirmPassword */}
                            <TextField
                                fullWidth
                                name="ConfirmPassword"
                                id="ConfirmPassword"
                                onChange={handleChange}
                                value={user.ConfirmPassword}
                                label="Confirm Password"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment >
                                            <IconButton name="showConfirmPassword" onClick={handleClickShowPassword} className="show-pwd">
                                                {user.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                type={user.showConfirmPassword ? "text" : "password"}
                                required />
                        </Grid>
                    </Grid>
                    <Button className="homepage__btn font-size-20" type="submit" >
                        Sign Up
                    </Button>
                </form>
            </TabPanel>

            <TabPanel value={tabsValue} index={1} className="signin__body">
                <form onSubmit={HandleSignUp}>
                    <div className="homepage__profil-img">
                        <img
                            className="imgProfile"
                            src={user.ImgProfile === ""
                                ? "/img/img-default.jpg"
                                : user.ImgProfile}
                            alt=""
                        />
                    </div>

                    <Grid container spacing={3} className="homepage__form">
                        <Grid item xs={12}> {/*UserName */}
                            <TextField
                                fullWidth
                                name="UserName"
                                onChange={handleChange}
                                value={user.UserName}
                                label="User name"
                                variant="outlined"
                                required />
                        </Grid>
                        <Grid item xs={12}> {/*Password */}
                            <TextField
                                fullWidth
                                name="Password"
                                onChange={handleChange}
                                value={user.PassWord}
                                label="Password"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment >
                                            <IconButton name="showSigninPassword" onClick={handleClickShowPassword} className="show-pwd">
                                                {user.showSigninPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                type={user.showSigninPassword ? "text" : "password"}
                                required />
                        </Grid>
                        <Grid item >
                            <Link href="#">
                                Forgot password
                            </Link>
                        </Grid>
                        <Button className="homepage__btn font-size-20" type="submit" >
                            Sign In
                        </Button>

                    </Grid>
                    <div className="separator" > OR </div>
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
        </Container >
    );
}

export default SignInUp