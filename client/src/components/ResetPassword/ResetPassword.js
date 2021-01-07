import React, { useState } from 'react'
import {
    TextField,
    Container,
    Grid,
    Button,
} from "@material-ui/core";
import axios from "axios"
import './ResetPassword.scss'

export const ResetPassword = () => {

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        axios.post("", password)
    }

    return (
        <Container className="ResetPassword__body">
            <div id="background">
                <img src="img/homepage.jpg" alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <h3>
                    Enter you new password
                </h3>

                <Grid container spacing={5} className="ResetPassword__form" style={{ marginTop: "50px" }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="oldPassword"
                            value={password.oldPassword || ""}
                            onChange={handleChange}
                            label="Please enter your old password"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="newPassword"
                            value={password.newPassword || ""}
                            onChange={handleChange}
                            label="Please enter your new password"
                            helperText="Must contain 8 characters, 1 letter, 1 number and 1 special character"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="confirmNewPassword"
                            value={password.confirmNewPassword || ""}
                            onChange={handleChange}
                            label="Please confirm your new password"
                            variant="outlined"
                        />
                    </Grid>

                </Grid>
                <Button className="ResetPassword__btn font-size-20" type="submit">
                    Reset password
                </Button>

            </form>
        </Container >
    );
}
export default ResetPassword