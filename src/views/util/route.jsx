import {withRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

// custom routes
// auth route to protect routes between logged in/not logged in users
const Guest = ({ component: Component, path, loggedIn, exact }) => {
    return (<Route
        path={path}
        exact={exact}
        render={props =>
            !loggedIn ? <Component {...props} /> : <Redirect to="/main/notes" />
        }
    />);
};

const Private = ({ component: Component, path, loggedIn, exact }) => {
    // debugger
    return (<Route
        path={path}
        exact={exact}
        render={props =>
            loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
    />);
};

// checks if session id is present, meaning user is logged in, and passes to Auth
const mapStateToProps = (state) => {
    return { loggedIn: Boolean(state.session.id) };
};
  
export const GuestRoute = withRouter(
    connect(
        mapStateToProps
    )(Guest)
);

export const PrivateRoute = withRouter(
    connect(
        mapStateToProps
    )(Private)
);