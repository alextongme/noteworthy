import React from 'react';
import { Link } from 'react-router-dom';

const HeaderIntro = ({currentUser, logout}) => {
    // show download/login buttons if no current user
    const sessionLinks = () => {
        return (
            <div className="headerIntro__container headerIntro__container--loggedOut">
                {/* <button className="headerIntro__button--download">download</button> */}
                <Link className="headerIntro__button--login" to="/login">Log in</Link>
            </div>
        );
    }

    const loggedIn = () => {
        return (
            <div className="headerIntro__container headerIntro__container--loggedIn">
                <h2>Hi {currentUser.username}!</h2>
                <Link className="headerIntro__button--login" to="/main/notes">go to app</Link>
                <button className="headerIntro__button--logout" onClick={logout}>logout</button>
            </div>
        );
    }

    return currentUser ? loggedIn() : sessionLinks();
}

export default HeaderIntro;