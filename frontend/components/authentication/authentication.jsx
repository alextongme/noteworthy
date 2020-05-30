import React from 'react';
import { Link } from 'react-router-dom';

const Authentication = ({currentUser, logout}) => {
    // show download/login buttons if no current user
    const sessionLinks = () => {
        return (
            <div className="authentication-navbar">
                {/* <Link to="/download">Download</Link> */}
                <button className="authentication-navbar-download">download</button>
                <Link className="authentication-navbar-login" to="/login">login</Link>
                {/* <Link to="/signup">Sign up!</Link> */}
            </div>
        );
    }

    const loggedIn = () => {
        return (
            <div className="authentication-navbar">
                <h2>Hi {currentUser.username}!</h2>
                <button className="authentication-navbar-logout" onClick={logout}>logout</button>
            </div>
        );
    }

    return currentUser ? loggedIn() : sessionLinks();
}

export default Authentication;