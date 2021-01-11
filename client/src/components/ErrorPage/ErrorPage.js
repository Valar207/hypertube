import React from 'react'
import { Container, Button } from '@material-ui/core'
import './ErrorPage.scss'
import { Link } from "react-router-dom";


export const ErrorPage = () => {

    return (
        <Container className="ErrorPage__body">
            <div id="background">
                <img src="img/errorpage.jpg" alt="" />
            </div>
            <h1> Sorry, page not found</h1>
            <img src="/img/travolta.gif" />
            <Link to="/" className="ErrorPage-btn color-btn">Back to home</Link>
        </Container>

    );
}

export default ErrorPage