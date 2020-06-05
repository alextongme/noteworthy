import React from "react";
import { Switch } from 'react-router-dom';

import HomeContainer from '../views/components/Home/HomeContainer'
import SignupContainer from '../views/components/Session/SignupContainer';
import LoginContainer from '../views/components/Session/LoginContainer';
import MainContainer from '../views/components/Main/MainContainer'

import { GuestRoute, PrivateRoute } from '../state/util/route';

const App = () => {
    return (
            <Switch>
                <GuestRoute exact path="/" component={HomeContainer} />
                <GuestRoute exact path="/login" component={LoginContainer} />
                <GuestRoute exact path="/signup" component={SignupContainer} />
                <PrivateRoute path="/main" component={MainContainer} />
            </Switch>
    );
}

export default App;