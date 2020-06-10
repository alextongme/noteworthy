import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderIntro = ({currentUser, logout}) => {
    // show download/login buttons if no current user
    const sessionLinks = () => {
        return (
            <div className="headerIntro__container headerIntro__container--loggedOut">
                {/* <button className="headerIntro__button--download">download</button> */}
                <NavLink className="headerIntro__button--login" to="/login">Log in</NavLink>
            </div>
        );
    }

    const loggedIn = () => {
        return (
            <div className="headerIntro__container headerIntro__container--loggedIn">
                {/* <h2>Hi {currentUser.first_name}!</h2> */}
                <button className="headerIntro__button--logout" onClick={logout}>Log out</button>
                <NavLink className="headerIntro__button--login" to="/main/notes">Go to app</NavLink>
            </div>
        );
    }

    return currentUser ? loggedIn() : sessionLinks();
}

export default HeaderIntro;