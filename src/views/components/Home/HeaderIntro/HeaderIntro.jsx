import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../../state/actions/session';

export default function HeaderIntro() {
    const currentUser = useSelector((state) => state.entities.users[state.session.id] )
    const dispatch = useDispatch();

    const sessionLinks = (
        <div className="headerIntro__container headerIntro__container--loggedOut">
            <NavLink className="headerIntro__button--login" to="/login">Log in</NavLink>
        </div>
    );

    const loggedIn = (
        <div className="headerIntro__container headerIntro__container--loggedIn">
            <button className="headerIntro__button--logout" onClick={() => dispatch(logout())}>Log out</button>
            <NavLink className="headerIntro__button--login" to="/main/notes">Go to app</NavLink>
        </div>
    );

    return currentUser ? loggedIn : sessionLinks;
}