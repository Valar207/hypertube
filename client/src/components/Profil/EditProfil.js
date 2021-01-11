import React, { useState } from 'react'
import {
    TextField,
    Container,
    Tabs,
    Tab,
    Grid,
    Button,
    Box,
    IconButton,
    InputAdornment,
} from "@material-ui/core";
import './EditProfil.scss'
import '../../assets/Style.scss'
import Axios from 'axios';
import countries from './CountrySelect.json'
import Autocomplete from '@material-ui/lab/Autocomplete';



function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}


export const EditProfil = () => {

    const [user, setUser] = useState({
        imgProfile: "",
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        language: ""
    })

    const uploadPhoto = (e) => {
        setUser({
            ...user,
            imgProfile: URL.createObjectURL(e.target.files[0]),
        });
    };
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeLanguage = (e, value) => {
        if (value === null) {
            setUser({
                ...user,
                language: ""
            })
        }
        else {
            setUser({
                ...user,
                language: value.name
            })
        }
    }
    const handleSubmit = () => {
        Axios.post("/", user)
    }

    console.log(user);
    return (
        <Container className="editProfil__body">
            <form onSubmit={handleSubmit}>
                <h3>Edit profil</h3>
                <div className="editProfil__profil-img">
                    <img
                        className="imgProfile"
                        src={user.imgProfile === "" ? "/img/img-default.jpg" : user.imgProfile}
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
                    <p style={{ color: "red", fontSize: "14px", margin: "-10px" }}>
                        {/* {errors?.imgProfile ? errors?.imgProfile : ""} */}
                    </p>
                </div>
                <Grid container spacing={5} className="custom__form" style={{ marginTop: "10px" }}>
                    <Grid item xs={6}>
                        {/*firstname */}
                        <TextField
                            fullWidth
                            name="firstname"
                            onChange={handleChange}
                            value={user.firstname || ""}
                            label={"First name"}
                            // helperText={errors?.firstname ? errors?.firstname : ""}
                            variant="outlined"
                        // className={errors?.firstname ? "errors" : ""}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        {/*LastName */}
                        <TextField
                            fullWidth
                            name="lastname"
                            onChange={handleChange}
                            value={user.lastname || ""}
                            label={"Last name"}
                            // helperText={errors?.lastname ? errors?.lastname : ""}
                            variant="outlined"
                        // className={errors?.lastname ? "errors" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/*username */}
                        <TextField
                            fullWidth
                            name="username"
                            onChange={handleChange}
                            value={user.username || ""}
                            label={"User name"}
                            // helperText={errors?.username ? errors?.username : ""}
                            variant="outlined"
                        // className={errors?.username ? "errors" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/*Email */}
                        <TextField
                            fullWidth
                            name="email"
                            onChange={handleChange}
                            value={user.email || ""}
                            label={"Email"}
                            // helperText={errors?.email ? errors?.email : ""}
                            variant="outlined"
                        // className={errors?.email ? "errors" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/*language */}
                        <Autocomplete
                            options={countries}
                            autoHighlight
                            onChange={handleChangeLanguage}
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => (
                                <React.Fragment>
                                    {option.name} ({option.code})
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="language"
                                    label="Language"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Button className="custom__btn font-size-20" type="submit" style={{ marginTop: "40px" }}>
                    Edit Profil
          </Button>
            </form>
        </Container>
    );
}
export default EditProfil