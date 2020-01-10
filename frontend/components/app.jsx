import React from "react";
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter,
    BrowserRouter
} from 'react-router-dom';

// import Modal from './modal/modal';
import SessionBarContainer from './session_bar/session_bar_container';
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import { AuthRoute } from '../util/route_util';
import LandingContainer from './landing/landing_container';

const App = () => (
    <div className="app-wrapper">
        <header>
            <SessionBarContainer />
        </header>
        <div>
            <LandingContainer />
        </div>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        
    </div>
);

export default App;

