import {withRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

// custom routes
// auth route to protect routes between logged in/not logged in users
const Auth = ({ component: Component, path, loggedIn, exact }) => {
    return (<Route
        path={path}
        exact={exact}
        render={props =>
            !loggedIn ? <Component {...props} /> : <Redirect to="/app" />
        }
    />);
};

// checks if session id is present, meaning user is logged in, and passes to Auth
const mapStateToProps = (state) => {
    return { loggedIn: Boolean(state.session.id) };
};
  
export const AuthRoute = withRouter(
    connect(
        mapStateToProps
    )(Auth)
);