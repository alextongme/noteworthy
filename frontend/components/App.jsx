import React from "react";
import { Switch, Route } from 'react-router-dom';
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import noteAppContainer from './note_app/note_app_container'
import Home from './home/home.jsx'
import { AuthRoute } from '../util/route_util';

const App = () => {
    return (
    <div>
        <Route exact path="/" component={Home} />
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
        <Route exact path="/app" component={noteAppContainer} />
    </div>
    );
}

export default App;