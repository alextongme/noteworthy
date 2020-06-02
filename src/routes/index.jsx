import React from "react";
import { Switch, Route } from 'react-router-dom';

import Home from '../views/components/Home/Home'
import { GuestRoute, PrivateRoute } from '../state/util/route';

import SignupContainer from '../views/components/Session/SignupContainer';
import LoginContainer from '../views/components/Session/LoginContainer';
// import MainContainer from '../views/components/Main/MainContainer';
import Main from '../views/components/Main/Main'

const App = () => {
    return (
    
            <Switch>
                <GuestRoute exact path="/" component={Home} />
                <GuestRoute exact path="/login" component={LoginContainer} />
                <GuestRoute exact path="/signup" component={SignupContainer} />
                <PrivateRoute path="/main" component={Main} />
            </Switch>
        
    );
}

export default App;