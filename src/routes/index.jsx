import React from "react";
import { Switch, Route } from 'react-router-dom';

import Home from '../views/components/Home/Home'
import { GuestRoute } from '../state/util/route';

import SignupContainer from '../views/components/Session/SignupContainer';
import LoginContainer from '../views/components/Session/LoginContainer';

import NoteEditor from '../views/components/NoteEditor/NoteEditor'

const App = () => {
    return (
    <Switch>
        <Route exact path="/" component={Home} />
        <GuestRoute exact path="/login" component={LoginContainer} />
        <GuestRoute exact path="/signup" component={SignupContainer} />
        {/* <PrivateRoute /> */}
        <Route exact path="/app" component={NoteEditor} />
    </Switch>
    );
}

export default App;